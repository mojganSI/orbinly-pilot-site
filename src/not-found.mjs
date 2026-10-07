// Served by static hosts for unknown URLs, with HTTP 404. Not one of the eight contract
// routes: it is written to /404.html, kept out of the sitemap and marked noindex, with no
// canonical and no structured data.
export default {
  path: '/404.html',
  title: 'Page not found | Orbinly',
  description: null,
  canonical: false,
  robots: 'noindex',
  sitemap: false,
  chrome: 'full',
  jsonLd: null,
  body: `
<h1>Page not found</h1>
<p>There is no page at this address. It may have been mistyped, or the link that brought you here may be out of date.</p>
<p>Go back to the <a href="/">home page</a>.</p>
`,
};
