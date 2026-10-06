// The eight routes, in sitemap order. Adding, removing or renaming a route changes the
// validation contract.

import home from './home.mjs';
import crm from './crm.mjs';
import freelancers from './crm-for-freelancers.mjs';
import agencies from './crm-for-agencies.mjs';
import compare from './crm-vs-spreadsheets.mjs';
import faq from './faq.mjs';
import about from './about.mjs';
import privacy from './privacy.mjs';

export default [home, crm, freelancers, agencies, compare, faq, about, privacy];
