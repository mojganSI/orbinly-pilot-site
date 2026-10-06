import { BRAND } from '../site.mjs';

// Healthy reference page. Contract: no question headings and no external links, so no heading
// here may end with "?" or open with a question word (what, who, how, ...).
export default {
  path: '/',
  title: 'Orbinly — Simple CRM for Small Service Businesses',
  description:
    'Orbinly CRM is a simple CRM for small service businesses: contacts, a clear pipeline and follow-up reminders in one tidy workspace.',
  canonical: true,
  robots: null,
  sitemap: true,
  chrome: 'full',
  jsonLd: (url) => [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': url('/') + '#organization',
      name: BRAND,
      url: url('/'),
      description:
        'Orbinly CRM is a fictional lightweight CRM for freelancers, small agencies and service businesses, used for software testing.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': url('/') + '#website',
      name: BRAND,
      url: url('/'),
      inLanguage: 'en',
      publisher: { '@id': url('/') + '#organization' },
    },
  ],
  body: `
<h1>A simple CRM for small service businesses</h1>
<p>Orbinly CRM keeps your contacts, open jobs and follow-ups in one tidy workspace, so a small team can see who needs attention today without digging through inboxes and notebooks. It is designed for businesses that sell their time and skill: consultants, studios, trades and local services.</p>
<p>There is no long setup project and no manual to study. You add the people you work with, note where each piece of work stands, and let the daily list tell you what to do next.</p>

<h2>Orbinly: what it does</h2>
<p>A customer relationship manager is only useful when it is quick to keep up to date. Orbinly CRM concentrates on the few things a service business touches every day and leaves out the rest. The full overview is on the <a href="/crm/">CRM software</a> page.</p>
<h3>Contacts in one place</h3>
<p>Each person and company has a single record with contact details, notes and a running history of the calls, emails and meetings you have logged.</p>
<h3>A pipeline you can read at a glance</h3>
<p>Every enquiry moves through clear stages, from first conversation to agreed work, so you always know what is open and what has gone quiet.</p>
<h3>Follow-up reminders</h3>
<p>Set a next step on any contact or job and it appears on your daily list on the day it is due.</p>
<ul>
<li>Contact and company records with notes</li>
<li>A visual pipeline with stages you can rename</li>
<li>Tasks and reminders tied to each job</li>
<li>Plain summaries of open and completed work</li>
</ul>

<h2>The people it is for</h2>
<p>Orbinly CRM is shaped around small teams rather than large sales departments. Three kinds of business fit it best.</p>
<h3>Freelancers</h3>
<p>Solo workers who juggle leads, active clients and repeat work can keep everything in one list instead of five. Read more on the <a href="/crm-for-freelancers/">CRM for freelancers</a> page.</p>
<h3>Small agencies</h3>
<p>Teams of a few people who share clients need one pipeline that everybody trusts and nobody has to rebuild on Monday morning. There is a short page <a href="/crm-for-agencies/">for agency teams</a>.</p>
<h3>Local service businesses</h3>
<p>Businesses that quote, schedule and deliver jobs can follow each request from the first phone call to the finished work, with the customer's history beside it.</p>

<h2>The way it works</h2>
<p>Getting organised takes three steps, and each one can be done in a spare half hour.</p>
<h3>Add your contacts</h3>
<p>Type them in or paste them from the list you already keep. If that list is a spreadsheet, our comparison of <a href="/compare/crm-vs-spreadsheets/">CRM vs spreadsheets</a> explains what changes when you move.</p>
<h3>Track each job</h3>
<p>Create a job for every enquiry and move it from stage to stage as it progresses. A stalled job is easy to spot because it stays where you left it.</p>
<h3>Follow up on time</h3>
<p>Give each job a next step and a date. The daily list shows what is due, so nothing depends on memory.</p>
<p>Short answers to common questions about terms and setup are collected on the <a href="/faq/">frequently asked questions</a> page.</p>
`,
};
