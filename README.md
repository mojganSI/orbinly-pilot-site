# orbinly-pilot-site

A small static website for **Orbinly CRM**, a fictional product. The site is a controlled
subject for SEO / GEO / AEO validation: every page has a known, deliberate state, so the output
of a crawler or analysis tool can be compared with what is actually there.

Orbinly CRM is a fictional product used for software testing. Nothing is sold, there are no
forms, accounts, cookies, analytics or third-party scripts.

## Do not "fix" the pages

Several pages are imperfect on purpose. Titles, H1s, meta descriptions, canonical tags, robots
meta, structured data and link counts are contract values. Changing one changes the expected
result of the pilot. The contract lives in [tests/contract.mjs](tests/contract.mjs) and is
enforced by `npm test`.

| Route | Role | Intentional state |
|---|---|---|
| `/` | Healthy reference | None. Organization + WebSite markup. |
| `/crm/` | Healthy product pillar | None. SoftwareApplication markup, author/date, two external references. |
| `/crm-for-freelancers/` | One defect | No meta description. |
| `/crm-for-agencies/` | Weak page | Title "Agencies", no H1, H2 followed by H4, no canonical, no structured data. |
| `/compare/crm-vs-spreadsheets/` | Comparison | Exactly two H1 elements. |
| `/faq/` | Healthy Q&A control | None. FAQPage markup with eight questions. |
| `/about/` | Thin page | Title "About", short content, no meta description, no structured data, no links at all. |
| `/legal/privacy/` | Noindex control | `noindex`, self canonical, left out of the sitemap. |

Two rules follow from how list items, links and question headings are counted across a whole
page:

- Navigation is plain `<a>` elements, never `<ul>`/`<li>`. Four pages must have no list items.
- On `/`, `/crm-for-agencies/`, `/about/` and `/legal/privacy/` no heading may end with "?" or
  open with a question word (what, who, how, ...).

## Layout

```
build.mjs            builds dist/ (no dependencies)
site.config.json     base URL and optional Google verification token
src/site.mjs         brand, notice, navigation, fixed dates
src/layout.mjs       HTML shell: head, header, footer
src/style.css        inlined into every page
src/pages/*.mjs      one module per route: metadata, JSON-LD and body
public/              copied verbatim into dist/ (verification files go here)
scripts/serve.mjs    local static server for checks
tests/               contract and its tests
```

## Commands

Requires Node 20 or newer. There is nothing to install.

```
npm run build     # writes dist/
npm test          # builds, then validates dist/ against the contract
npm run serve     # serves dist/ on http://localhost:4173
```

To validate a running server instead of the files:

```
PILOT_ORIGIN=http://localhost:4173 npm test
```

## Base URL

Canonical URLs, `sitemap.xml` and the `Sitemap:` line in `robots.txt` are absolute, and all come
from one value: `baseUrl` in [site.config.json](site.config.json). The `SITE_URL` environment
variable overrides it for a single build:

```
SITE_URL=https://www.example.org npm run build
```

The value must be a bare origin (scheme and host, no path), because internal links are
root-relative. The site therefore has to be served from the root of its host. The committed
value, `https://orbinly.example`, is a placeholder; the build prints a warning while it is in
use.

## Google Search Console verification

Nothing is connected and no token is included. Two site-side options are ready:

- **Meta tag:** set `googleSiteVerification` in `site.config.json` (or the
  `GOOGLE_SITE_VERIFICATION` environment variable) to the token. The tag is added to `/` only.
- **HTML file:** put the `google….html` file Google provides in `public/`. It is copied to the
  site root unchanged.

A DNS record needs no change to the site.

## Hosting

`dist/` is plain static output: eight `index.html` files, `robots.txt` and `sitemap.xml`. Any
static host works with build command `npm run build` and output directory `dist`. No
platform-specific configuration is included. After deploying, check on the live host that paths
keep their trailing slash and that no extra headers or redirects were added.
