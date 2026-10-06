import { BRAND, NOTICE, NAV, FOOTER_NAV } from './site.mjs';

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonLdScript(node) {
  // "<" is escaped so a string value can never close the script element.
  const json = JSON.stringify(node, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

function links(items) {
  return items.map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`).join('\n');
}

// chrome "full": header navigation plus footer links.
// chrome "bare": no <a> anywhere, for the page that must have zero outgoing internal links.
function header(chrome) {
  if (chrome === 'bare') {
    return `<header>\n<p class="brand">${escapeHtml(BRAND)}</p>\n</header>`;
  }
  return `<header>
<p class="brand"><a href="/">${escapeHtml(BRAND)}</a></p>
<nav aria-label="Primary">
${links(NAV)}
</nav>
</header>`;
}

function footer(chrome) {
  const notice = `<p>${escapeHtml(NOTICE)}</p>`;
  if (chrome === 'bare') return `<footer>\n${notice}\n</footer>`;
  return `<footer>
${notice}
<nav aria-label="Footer">
${links(FOOTER_NAV)}
</nav>
</footer>`;
}

export function renderPage(page, { absoluteUrl, css, googleSiteVerification }) {
  const head = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${escapeHtml(page.title)}</title>`,
  ];
  if (page.description) {
    head.push(`<meta name="description" content="${escapeHtml(page.description)}">`);
  }
  if (page.robots) head.push(`<meta name="robots" content="${escapeHtml(page.robots)}">`);
  if (page.canonical) head.push(`<link rel="canonical" href="${absoluteUrl(page.path)}">`);
  if (page.path === '/' && googleSiteVerification) {
    head.push(
      `<meta name="google-site-verification" content="${escapeHtml(googleSiteVerification)}">`,
    );
  }
  head.push(`<style>\n${css.trim()}\n</style>`);
  for (const node of page.jsonLd ? page.jsonLd(absoluteUrl) : []) head.push(jsonLdScript(node));

  return `<!doctype html>
<html lang="en">
<head>
${head.join('\n')}
</head>
<body>
${header(page.chrome)}
<main>
${page.body.trim()}
</main>
${footer(page.chrome)}
</body>
</html>
`;
}
