// Site-wide constants. The brand and the notice are contract values (see tests/contract.mjs).

export const BRAND = 'Orbinly';
export const PRODUCT = 'Orbinly CRM';

export const NOTICE = 'Orbinly CRM is a fictional product used for software testing.';

// Fixed dates keep every build byte-identical.
export const PUBLISHED = '2026-10-01';
export const PUBLISHED_LABEL = 'October 1, 2026';

// Rendered as plain <a> elements, never as <ul>/<li>: the tool under test counts every
// <li> on a page, and four pages must report no lists.
export const NAV = [
  ['/', 'Home'],
  ['/crm/', 'CRM software'],
  ['/crm-for-freelancers/', 'For freelancers'],
  ['/crm-for-agencies/', 'For agencies'],
  ['/compare/crm-vs-spreadsheets/', 'CRM vs spreadsheets'],
  ['/faq/', 'FAQ'],
];

export const FOOTER_NAV = [
  ['/about/', 'About'],
  ['/legal/privacy/', 'Privacy'],
];
