// Contract tests for the Pilot Site. They check objective, contract-critical facts only and
// never judge copy quality.
//
//   npm test                                    builds dist/ and validates the files
//   PILOT_ORIGIN=http://localhost:4173 npm test   validates a running server instead
//
// In served mode the expected canonical/sitemap host still comes from SITE_URL or
// site.config.json, so build and test with the same base URL.

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { before, describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { build, normalizeBaseUrl, resolveConfig } from '../build.mjs';
import { NOTICE, PAGES, PROMPT_MAPPINGS, ROUTES } from './contract.mjs';
import {
  anchors,
  canonicals,
  elements,
  headings,
  jsonLd,
  mainWordCount,
  meta,
  openTags,
  schemaNodes,
  textOf,
  titles,
} from './html.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ORIGIN = process.env.PILOT_ORIGIN ? process.env.PILOT_ORIGIN.replace(/\/$/, '') : null;

let baseUrl;
const html = {};
let sitemap;
let robots;

async function load(path) {
  if (ORIGIN) {
    const response = await fetch(ORIGIN + path, { redirect: 'manual' });
    return { status: response.status, body: await response.text() };
  }
  const file = join(DIST, path.endsWith('/') ? path + 'index.html' : path);
  const body = await readFile(file, 'utf8').catch(() => null);
  return { status: body === null ? 404 : 200, body: body ?? '' };
}

async function filesUnder(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await filesUnder(path)));
    else found.push(path);
  }
  return found.sort();
}

async function digest(dir) {
  const hash = createHash('sha256');
  for (const file of await filesUnder(dir)) {
    hash.update(relative(dir, file)).update(await readFile(file));
  }
  return hash.digest('hex');
}

const isInternal = (href) => href.startsWith('/') || href.startsWith(baseUrl);
const isExternal = (href) => /^https?:\/\//.test(href) && !href.startsWith(baseUrl);

// The pilot's inferred-mapping rule: a prompt maps to a page when the prompt has at least two
// significant words and every one of them appears in the page's title or an H1. A word is
// significant when it has three or more characters and is not a function word; forms must
// match exactly (no stemming).
const STOPWORDS = new Set(
  (
    'the and for with from that this what which who how why when where are was were can does ' +
    'best top your our you not but about into than then them they their its has have had'
  ).split(' '),
);
const QUESTION_OPENERS = new Set(
  'what why how when where which who whose can does do is are should will'.split(' '),
);
const words = (text) => text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
const significant = (text) =>
  new Set(words(text).filter((word) => word.length >= 3 && !STOPWORDS.has(word)));
const isQuestion = (text) => text.trim().endsWith('?') || QUESTION_OPENERS.has(words(text)[0]);

function mappedPages(prompt) {
  const wanted = significant(prompt);
  if (wanted.size < 2) return [];
  return ROUTES.map((route) => {
    const h1s = headings(html[route]).filter((h) => h.level === 1);
    const tokens = significant([titles(html[route])[0], ...h1s.map((h) => h.text)].join(' '));
    return { route, tokens };
  })
    .filter(({ tokens }) => [...wanted].every((word) => tokens.has(word)))
    .sort((a, b) => a.tokens.size - b.tokens.size || (a.route < b.route ? -1 : 1))
    .map(({ route }) => route);
}

before(async () => {
  const config = await resolveConfig();
  baseUrl = config.baseUrl;
  if (!ORIGIN) await build(config);
  for (const route of ROUTES) html[route] = (await load(route)).body;
  sitemap = (await load('/sitemap.xml')).body;
  robots = (await load('/robots.txt')).body;
});

describe('routes', () => {
  test('all eight routes exist and return content', async () => {
    assert.equal(ROUTES.length, 8);
    for (const route of ROUTES) {
      const { status, body } = await load(route);
      assert.equal(status, 200, route);
      assert.match(body, /^<!doctype html>/i, route);
    }
  });

  test('the build contains exactly eight HTML pages', { skip: Boolean(ORIGIN) }, async () => {
    const pages = (await filesUnder(DIST))
      .filter((file) => file.endsWith('.html'))
      .map((file) => '/' + relative(DIST, file).replace(/index\.html$/, ''));
    assert.deepEqual(pages.sort(), [...ROUTES].sort());
  });

  test('internal links use trailing slashes and point at real routes', () => {
    for (const route of ROUTES) {
      for (const href of anchors(html[route]).filter(isInternal)) {
        assert.ok(ROUTES.includes(href), `${route} links to unknown route ${href}`);
      }
    }
  });

  test('the home page links to every other page', () => {
    const fromHome = new Set(anchors(html['/']));
    for (const route of ROUTES.filter((r) => r !== '/')) {
      assert.ok(fromHome.has(route), `/ does not link to ${route}`);
    }
  });
});

for (const [route, expected] of Object.entries(PAGES)) {
  describe(`page ${route}`, () => {
    test('title is the frozen string', () => {
      assert.deepEqual(titles(html[route]), [expected.title]);
    });

    test('H1 elements are the frozen strings', () => {
      const h1s = headings(html[route]).filter((h) => h.level === 1);
      assert.deepEqual(
        h1s.map((h) => h.text),
        expected.h1,
      );
    });

    test('meta description state', () => {
      const found = meta(html[route], 'description');
      assert.equal(found.length, expected.description ? 1 : 0);
      if (expected.description) assert.ok(found[0].length >= 50, 'description is too short');
    });

    test('canonical state', () => {
      const expectedCanonical = expected.canonical === 'self' ? [baseUrl + route] : [];
      assert.deepEqual(canonicals(html[route]), expectedCanonical);
    });

    test('robots meta state', () => {
      const directives = meta(html[route], 'robots').join(',').toLowerCase();
      assert.equal(directives.includes('noindex'), expected.noindex);
      assert.equal(meta(html[route], 'googlebot').length, 0);
    });

    test('structured data types', () => {
      const nodes = jsonLd(html[route]);
      assert.deepEqual(
        nodes.map((node) => node['@type']),
        expected.schema,
      );
      const authorship = [...schemaNodes(nodes)].some(
        (node) => node.author || node.datePublished || node.dateModified,
      );
      assert.equal(authorship, expected.authorship, 'author/date markup');
    });

    test('heading structure', () => {
      const found = headings(html[route]);
      const levels = found.map((h) => h.level);
      if (expected.levels) assert.deepEqual(levels, expected.levels);
      const skipped = levels.some((level, i) => i > 0 && level > levels[i - 1] + 1);
      assert.equal(skipped, expected.skippedLevel, 'skipped heading level');
      assert.equal(
        found.some((h) => isQuestion(h.text)),
        expected.questionHeadings,
        'question headings',
      );
    });

    test('lists and links', () => {
      const hrefs = anchors(html[route]);
      assert.equal(openTags(html[route], 'li').length > 0, expected.lists, 'list items');
      assert.equal(hrefs.filter(isExternal).length, expected.externalLinks, 'external links');
      const internal = hrefs.filter(isInternal).length;
      if (expected.internalLinks === 'none') assert.equal(hrefs.length, 0, 'no links at all');
      else assert.ok(internal > 0, 'internal links');
    });

    test('content length is within the contract range', () => {
      const count = mainWordCount(html[route]);
      const [min, max] = expected.words;
      assert.ok(count >= min && count <= max, `${count} words, expected ${min}-${max}`);
    });

    test('fictional-product notice is visible in the footer', () => {
      const footer = elements(html[route], 'footer');
      assert.equal(footer.length, 1);
      assert.ok(textOf(footer[0].inner).includes(NOTICE));
    });

    test('static and self-contained', () => {
      const page = html[route];
      const scripts = elements(page, 'script');
      assert.ok(
        scripts.every((s) => s.attrs.type === 'application/ld+json'),
        'no JavaScript',
      );
      for (const tag of ['form', 'input', 'textarea', 'select', 'button', 'iframe', 'img']) {
        assert.equal(openTags(page, tag).length, 0, `no <${tag}>`);
      }
      // Nothing is fetched from anywhere: no stylesheets, icons, fonts or other subresources.
      assert.ok(
        openTags(page, 'link').every((l) => l.rel === 'canonical'),
        'no <link> subresources',
      );
      assert.doesNotMatch(page, /\ssrc\s*=|@import|url\(/i);
      assert.equal(openTags(page, 'html')[0].lang, 'en');
    });
  });
}

describe('contract-specific structure', () => {
  test('/crm/ has a direct answer under "What is a CRM?"', () => {
    const page = html['/crm/'];
    const answer = page.match(/<h2>What is a CRM\?<\/h2>\s*<p>([\s\S]*?)<\/p>/);
    assert.ok(answer, 'answer paragraph follows the question heading');
    const length = textOf(answer[1]).split(' ').length;
    assert.ok(length >= 40 && length <= 60, `${length} words, expected 40-60`);
  });

  test('/crm/ declares SoftwareApplication, author and dateModified', () => {
    const [app, page] = jsonLd(html['/crm/']);
    assert.equal(app.name, 'Orbinly CRM');
    assert.ok(page.author?.name);
    assert.match(page.dateModified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(!app.offers, 'no pricing claim');
  });

  test('/crm-for-freelancers/ has exactly one bulleted list', () => {
    assert.equal(openTags(html['/crm-for-freelancers/'], 'ul').length, 1);
  });

  test('/compare/ has a comparison table, a summary list and a short answer', () => {
    const page = html['/compare/crm-vs-spreadsheets/'];
    assert.equal(openTags(page, 'table').length, 1);
    assert.ok(openTags(page, 'tr').length >= 6, 'table rows');
    assert.ok(openTags(page, 'ul').length >= 1, 'bulleted summary');
    assert.match(page, /<h1>The short answer<\/h1>\s*<p>/);
    const [article] = jsonLd(page);
    assert.ok(article.author?.name);
    assert.match(article.datePublished, /^\d{4}-\d{2}-\d{2}$/);
  });

  test('/faq/ has eight H2 questions matching its FAQPage markup', () => {
    const page = html['/faq/'];
    const visible = [...page.matchAll(/<h2>([\s\S]*?)<\/h2>\s*<p>([\s\S]*?)<\/p>/g)].map((m) => ({
      question: textOf(m[1]),
      answer: textOf(m[2]),
    }));
    assert.equal(visible.length, 8);
    assert.equal(headings(page).filter((h) => h.level === 2).length, 8);
    for (const { question } of visible) assert.ok(question.endsWith('?'), question);

    const [faq] = jsonLd(page);
    assert.equal(faq['@type'], 'FAQPage');
    const marked = faq.mainEntity.map((entity) => {
      assert.equal(entity['@type'], 'Question');
      assert.equal(entity.acceptedAnswer['@type'], 'Answer');
      return { question: entity.name, answer: entity.acceptedAnswer.text };
    });
    assert.deepEqual(marked, visible);
    assert.ok(
      visible.some((pair) => pair.question === 'What is a CRM?'),
      'the unmapped prompt "what is a crm" still appears as a heading',
    );
  });

  test('/about/ has a single paragraph and no links of any kind', () => {
    const page = html['/about/'];
    const main = elements(page, 'main')[0].inner;
    assert.equal(openTags(main, 'p').length, 1);
    assert.equal(openTags(page, 'a').length, 0);
    assert.equal(openTags(page, 'nav').length, 0);
  });
});

describe('prompt mapping', () => {
  for (const [prompt, expected] of Object.entries(PROMPT_MAPPINGS)) {
    test(`"${prompt}" maps to ${expected.length ? expected.join(', ') : 'no page'}`, () => {
      assert.deepEqual(mappedPages(prompt), expected);
    });
  }
});

describe('sitemap and robots', () => {
  test('sitemap lists exactly the seven indexable pages', () => {
    const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
    const expected = ROUTES.filter((route) => PAGES[route].sitemap).map((route) => baseUrl + route);
    assert.equal(expected.length, 7);
    assert.deepEqual(locs, expected);
    assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  });

  test('the privacy page is excluded from the sitemap', () => {
    assert.ok(!sitemap.includes('/legal/privacy/'));
  });

  test('robots.txt allows crawling and references the sitemap', () => {
    assert.match(robots, /^User-agent: \*$/m);
    assert.doesNotMatch(robots, /^Disallow:\s*\S/m);
    const lines = robots.split('\n').filter((line) => line.startsWith('Sitemap:'));
    assert.deepEqual(lines, [`Sitemap: ${baseUrl}/sitemap.xml`]);
  });
});

describe("verification", () => {
  test('no verification token ships by default', { skip: Boolean(ORIGIN) }, () => {
    for (const route of ROUTES) {
      assert.equal(meta(html[route], 'google-site-verification').length, 0, route);
    }
  });
});

describe('build configuration', { skip: Boolean(ORIGIN) }, () => {
  test('base URL drives canonicals, sitemap and robots', async () => {
    const outDir = await mkdtemp(join(tmpdir(), 'pilot-site-'));
    try {
      await build({ baseUrl: 'https://pilot.test/', outDir });
      const home = await readFile(join(outDir, 'index.html'), 'utf8');
      assert.deepEqual(canonicals(home), ['https://pilot.test/']);
      const map = await readFile(join(outDir, 'sitemap.xml'), 'utf8');
      assert.ok(map.includes('<loc>https://pilot.test/crm/</loc>'));
      const robotsTxt = await readFile(join(outDir, 'robots.txt'), 'utf8');
      assert.ok(robotsTxt.includes('Sitemap: https://pilot.test/sitemap.xml'));
    } finally {
      await rm(outDir, { recursive: true, force: true });
    }
  });

  test('base URL must be a bare http(s) origin', () => {
    assert.equal(normalizeBaseUrl('https://pilot.test/'), 'https://pilot.test');
    for (const bad of ['pilot.test', 'ftp://pilot.test', 'https://pilot.test/site']) {
      assert.throws(() => normalizeBaseUrl(bad), bad);
    }
  });

  test('a configured verification token is emitted on the home page only', async () => {
    const outDir = await mkdtemp(join(tmpdir(), 'pilot-site-'));
    try {
      await build({ baseUrl, googleSiteVerification: 'test-token', outDir });
      const home = await readFile(join(outDir, 'index.html'), 'utf8');
      assert.deepEqual(meta(home, 'google-site-verification'), ['test-token']);
      const crm = await readFile(join(outDir, 'crm', 'index.html'), 'utf8');
      assert.equal(meta(crm, 'google-site-verification').length, 0);
    } finally {
      await rm(outDir, { recursive: true, force: true });
    }
  });

  test('the build is deterministic', async () => {
    const outDir = await mkdtemp(join(tmpdir(), 'pilot-site-'));
    try {
      await build({ baseUrl, outDir });
      assert.equal(await digest(outDir), await digest(DIST));
    } finally {
      await rm(outDir, { recursive: true, force: true });
    }
  });
});
