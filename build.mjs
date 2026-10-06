// Builds the static site into dist/. No dependencies; output is byte-identical for a given
// base URL and verification token.
//
//   node build.mjs                      uses site.config.json
//   SITE_URL=https://host node build.mjs  overrides the base URL for this build

import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { renderPage } from './src/layout.mjs';
import pages from './src/pages/index.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const PLACEHOLDER_HOST = 'orbinly.example';

export function normalizeBaseUrl(value) {
  let url;
  try {
    url = new URL(String(value).trim());
  } catch {
    throw new Error(`Base URL is not a valid absolute URL: "${value}"`);
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`Base URL must be http(s): "${value}"`);
  }
  // Internal links are root-relative ("/crm/"), so the site must be served from the host root.
  if (url.pathname !== '/' || url.search || url.hash) {
    throw new Error(`Base URL must be an origin with no path, query or fragment: "${value}"`);
  }
  return url.origin;
}

export async function resolveConfig(env = process.env) {
  const file = JSON.parse(await readFile(join(ROOT, 'site.config.json'), 'utf8'));
  return {
    baseUrl: normalizeBaseUrl(env.SITE_URL || file.baseUrl),
    googleSiteVerification: (
      env.GOOGLE_SITE_VERIFICATION ||
      file.googleSiteVerification ||
      ''
    ).trim(),
  };
}

export function sitemapXml(absoluteUrl) {
  const urls = pages
    .filter((page) => page.sitemap)
    .map((page) => `  <url>\n    <loc>${absoluteUrl(page.path)}</loc>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}

export function robotsTxt(absoluteUrl) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;
}

export async function build({ baseUrl, googleSiteVerification = '', outDir = join(ROOT, 'dist') }) {
  const origin = normalizeBaseUrl(baseUrl);
  const absoluteUrl = (path) => origin + path;
  const css = await readFile(join(ROOT, 'src', 'style.css'), 'utf8');

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  // public/ is copied verbatim (for example a Google verification file). Dotfiles are skipped.
  const publicDir = join(ROOT, 'public');
  for (const name of (await readdir(publicDir).catch(() => [])).sort()) {
    if (!name.startsWith('.')) await cp(join(publicDir, name), join(outDir, name), { recursive: true });
  }

  for (const page of pages) {
    const file = join(outDir, page.path, 'index.html');
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, renderPage(page, { absoluteUrl, css, googleSiteVerification }));
  }
  await writeFile(join(outDir, 'sitemap.xml'), sitemapXml(absoluteUrl));
  await writeFile(join(outDir, 'robots.txt'), robotsTxt(absoluteUrl));

  return { baseUrl: origin, outDir, pages: pages.map((page) => page.path) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const config = await resolveConfig();
  const result = await build(config);
  console.log(`Built ${result.pages.length} pages into ${result.outDir}`);
  console.log(`Base URL: ${result.baseUrl}`);
  if (new URL(result.baseUrl).hostname === PLACEHOLDER_HOST) {
    console.warn(
      'Warning: this is the placeholder base URL. Set SITE_URL or site.config.json before deploying.',
    );
  }
  console.log(
    config.googleSiteVerification
      ? 'Google verification meta tag: emitted on /'
      : 'Google verification meta tag: not configured',
  );
}
