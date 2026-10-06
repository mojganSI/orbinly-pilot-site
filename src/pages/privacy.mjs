// Noindex control: served with HTTP 200, meta robots noindex, self canonical, and left out of
// the sitemap. Otherwise a valid page. Contract: no question headings (no heading may open
// with a question word), no lists, no structured data, no external links.
export default {
  path: '/legal/privacy/',
  title: 'Privacy Policy | Orbinly',
  description:
    'The privacy policy for the Orbinly CRM website: a static test site with no forms, no accounts, no cookies and no analytics.',
  canonical: true,
  robots: 'noindex',
  sitemap: false,
  chrome: 'full',
  jsonLd: null,
  body: `
<h1>Privacy policy</h1>
<p>This policy covers the Orbinly CRM website. The site is a small set of static pages published for software testing. It describes a fictional product, offers nothing for sale and is not connected to any application or customer database.</p>

<h2>Information this site collects</h2>
<p>The site does not ask for personal information and has no means of receiving it. There are no contact forms, sign-up forms, newsletter boxes, comment fields, user accounts or payment pages. Nothing you do while reading these pages is sent to us, and we keep no list of visitors.</p>
<p>Because no personal information is collected, none is stored, sold, shared or used for advertising, and there is no profile of you to correct or delete.</p>

<h2>Cookies, scripts and tracking</h2>
<p>These pages set no cookies and use no browser storage. They load no analytics, advertising or social media scripts, and no fonts, images or other files from third-party servers. Each page is a single HTML document that works with JavaScript switched off.</p>
<p>Some pages link to external reference material. Following one of those links takes you to a website run by someone else, and that website's own privacy policy applies from then on.</p>

<h2>Server logs and changes to this policy</h2>
<p>Like almost every website, this one is delivered by a hosting provider. The provider may record standard technical details of each request, such as the time, the page requested, the IP address and the browser type, in order to operate and protect its service. Those records are held by the provider under its own terms, and we do not combine them with any other information.</p>
<p>If the way this site works ever changes, this page will be updated to describe the change before it takes effect. The current version applies from October 1, 2026.</p>
`,
};
