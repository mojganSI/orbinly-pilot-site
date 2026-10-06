// The Pilot Site validation contract, written out independently of src/ so that an accidental
// edit to a page fails the tests. Changing a value here means changing the expected results of
// the pilot itself; do it deliberately.

export const NOTICE = 'Orbinly CRM is a fictional product used for software testing.';

// Per route:
//   title, h1            frozen strings; they decide prompt mapping
//   description          whether a meta description is present
//   canonical            'self' or 'none'
//   noindex / sitemap    indexability and sitemap membership
//   schema               top-level JSON-LD @type values, in order ([] = no JSON-LD at all)
//   authorship           author / datePublished / dateModified anywhere in the JSON-LD
//   questionHeadings     any heading ending with "?" or opening with a question word
//   lists                any <li> on the page
//   internalLinks        'some' or 'none' (every <a> to a path on this site)
//   externalLinks        exact number of <a> elements pointing off-site
//   levels               exact heading level sequence, where it is itself the test case
//   skippedLevel         a heading more than one level below the one before it
//   words                [min, max] visible words in <main>; loose bounds, not a quality check
export const PAGES = {
  '/': {
    title: 'Orbinly — Simple CRM for Small Service Businesses',
    h1: ['A simple CRM for small service businesses'],
    description: true,
    canonical: 'self',
    noindex: false,
    sitemap: true,
    schema: ['Organization', 'WebSite'],
    authorship: false,
    questionHeadings: false,
    lists: true,
    internalLinks: 'some',
    externalLinks: 0,
    skippedLevel: false,
    words: [350, 700],
  },
  '/crm/': {
    title: 'CRM Software for Small Businesses | Orbinly',
    h1: ['CRM software built for small teams'],
    description: true,
    canonical: 'self',
    noindex: false,
    sitemap: true,
    schema: ['SoftwareApplication', 'WebPage'],
    authorship: true,
    questionHeadings: true,
    lists: true,
    internalLinks: 'some',
    externalLinks: 2,
    skippedLevel: false,
    words: [700, 1200],
  },
  '/crm-for-freelancers/': {
    title: 'Simple CRM for Freelancers | Orbinly',
    h1: ['CRM for freelancers'],
    description: false, // intentional defect
    canonical: 'self',
    noindex: false,
    sitemap: true,
    schema: ['WebPage', 'BreadcrumbList'],
    authorship: false,
    questionHeadings: true,
    lists: true,
    internalLinks: 'some',
    externalLinks: 0,
    skippedLevel: false,
    words: [450, 800],
  },
  '/crm-for-agencies/': {
    title: 'Agencies', // intentional defect: weak title
    h1: [], // intentional defect
    description: true,
    canonical: 'none', // intentional defect
    noindex: false,
    sitemap: true,
    schema: [], // intentional defect
    authorship: false,
    questionHeadings: false,
    lists: false,
    internalLinks: 'some',
    externalLinks: 0,
    levels: [2, 4, 4], // intentional defect: H2 followed by H4
    skippedLevel: true,
    words: [250, 500],
  },
  '/compare/crm-vs-spreadsheets/': {
    title: 'CRM vs Spreadsheets: Which Is Better for Client Work? | Orbinly',
    h1: ['CRM vs spreadsheets', 'The short answer'], // intentional defect: two H1s
    description: true,
    canonical: 'self',
    noindex: false,
    sitemap: true,
    schema: ['Article'],
    authorship: true,
    questionHeadings: true,
    lists: true,
    internalLinks: 'some',
    externalLinks: 2,
    levels: [1, 2, 2, 1, 2],
    skippedLevel: false,
    words: [600, 1100],
  },
  '/faq/': {
    title: 'Orbinly FAQ: CRM Questions from Freelancers and Agencies',
    h1: ['Frequently asked questions'],
    description: true,
    canonical: 'self',
    noindex: false,
    sitemap: true,
    schema: ['FAQPage'],
    authorship: false,
    questionHeadings: true,
    lists: false,
    internalLinks: 'some',
    externalLinks: 0,
    levels: [1, 2, 2, 2, 2, 2, 2, 2, 2],
    skippedLevel: false,
    words: [400, 900],
  },
  '/about/': {
    title: 'About', // intentional weakness
    h1: ['About Orbinly'],
    description: false, // intentional weakness
    canonical: 'self',
    noindex: false,
    sitemap: true,
    schema: [], // intentional weakness
    authorship: false,
    questionHeadings: false,
    lists: false,
    internalLinks: 'none', // intentional weakness
    externalLinks: 0,
    levels: [1],
    skippedLevel: false,
    words: [40, 130], // intentional weakness: thin content
  },
  '/legal/privacy/': {
    title: 'Privacy Policy | Orbinly',
    h1: ['Privacy policy'],
    description: true,
    canonical: 'self',
    noindex: true, // noindex control
    sitemap: false,
    schema: [],
    authorship: false,
    questionHeadings: false,
    lists: false,
    internalLinks: 'some',
    externalLinks: 0,
    levels: [1, 2, 2, 2],
    skippedLevel: false,
    words: [200, 450],
  },
};

export const ROUTES = Object.keys(PAGES);

// Expected crawl-only prompt mapping: the pages whose title or H1 contain every significant
// word of the prompt, most specific page first. [] means the prompt must stay unmapped.
export const PROMPT_MAPPINGS = {
  'crm for freelancers': ['/crm-for-freelancers/', '/faq/'],
  'simple crm for freelancers': ['/crm-for-freelancers/'],
  'crm for small agencies': [],
  'crm vs spreadsheets': ['/compare/crm-vs-spreadsheets/'],
  'what is a crm': [],
  'best crm for small service businesses': ['/'],
  'affordable crm software': [],
  'how to choose a crm for a small business': [],
  'crm software': ['/crm/'],
  'crm for agencies': ['/faq/'],
};
