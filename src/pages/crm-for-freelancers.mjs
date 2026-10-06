// INTENTIONAL DEFECT: no meta description. It must stay the only crawl defect on this page.
// Contract: one question heading, one bulleted list, no external links, no author/date markup.
export default {
  path: '/crm-for-freelancers/',
  title: 'Simple CRM for Freelancers | Orbinly',
  description: null,
  canonical: true,
  robots: null,
  sitemap: true,
  chrome: 'full',
  jsonLd: (url) => [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: url('/crm-for-freelancers/'),
      name: 'CRM for freelancers',
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: url('/') },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'CRM for freelancers',
          item: url('/crm-for-freelancers/'),
        },
      ],
    },
  ],
  body: `
<p class="crumbs"><a href="/">Home</a> / CRM for freelancers</p>
<h1>CRM for freelancers</h1>
<p>When you work alone, you are the sales team, the account manager and the person doing the work. Orbinly CRM gives a freelancer one calm place to keep leads, active clients and follow-ups, without the weight of software built for a sales floor.</p>
<p>It is meant to be opened for two minutes at the start of the day and two minutes at the end. Everything in between is your actual work.</p>

<h2>How do freelancers use a CRM?</h2>
<p>A freelancer's client list is usually small, but the details around it are not. There is the designer who said to get back in touch in spring, the past client who sends a project every few months, the introduction a friend made last week and the proposal that has been waiting ten days for an answer. Each of those is a thread, and a CRM is the place where threads are kept from slipping.</p>
<p>In practice, most solo workers use a CRM for three jobs. The first is remembering people: who they are, how you met and what you last discussed. The second is tracking possible work from first message to a clear yes or no. The third is timing, which means being reminded to follow up on the right day rather than whenever the thought happens to return.</p>
<p>None of this needs to be elaborate. A freelancer with fifteen contacts and four open conversations gets value from the first week, simply because the list exists outside their head. The general idea is explained in more depth on the <a href="/crm/">CRM software</a> page.</p>

<h2>Features for solo work</h2>
<p>Orbinly CRM trims the usual feature set down to what one person will keep using.</p>
<h3>One list of clients and leads</h3>
<p>Every contact has a single record with details, labels and notes. Mark someone as a lead, an active client or a past client, and filter the list by that label when you plan your week. Past clients stay visible, which matters because repeat work is often the easiest work to win.</p>
<h3>A lightweight pipeline</h3>
<p>Possible projects sit in a short row of stages such as enquiry, proposal sent and agreed. Moving a card takes a second, and the row shows at a glance how much work might arrive next month. That view is useful when you are deciding whether to take on something new.</p>
<h3>Reminders that keep follow-ups moving</h3>
<p>Give any contact or project a next step and a date. On that date it appears on your daily list. Following up a week after sending a proposal stops being something you hope to remember and becomes something the list hands to you.</p>
<p>If your current system is a spreadsheet with a row for each client, it may already cover part of this. The <a href="/compare/crm-vs-spreadsheets/">CRM vs spreadsheets</a> comparison describes the point at which a dedicated tool starts to help.</p>

<h2>Getting started</h2>
<p>A first setup fits comfortably into one sitting. A sensible order is:</p>
<ul>
<li>Add the clients you are working with this month.</li>
<li>Add anyone you are waiting to hear from, and give each a follow-up date.</li>
<li>Create a project for every open proposal and place it in the right stage.</li>
<li>Rename the stages so they match the words you already use.</li>
<li>Check the daily list each morning for a week before changing anything else.</li>
</ul>
<p>After a week you will know which details you look at and which you skipped. Keep the first kind, drop the second, and the system stays light enough to maintain during busy periods. Short answers to common setup questions are on the <a href="/faq/">FAQ</a> page.</p>
`,
};
