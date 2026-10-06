import { BRAND, PRODUCT, PUBLISHED, PUBLISHED_LABEL } from '../site.mjs';

// Healthy product pillar. Contract: question headings, a direct-answer paragraph under
// "What is a CRM?", lists, author/date markup and exactly two external links.
export default {
  path: '/crm/',
  title: 'CRM Software for Small Businesses | Orbinly',
  description:
    'What a CRM is, what Orbinly CRM includes and how CRM software helps a small team keep track of contacts, deals and follow-ups.',
  canonical: true,
  robots: null,
  sitemap: true,
  chrome: 'full',
  jsonLd: (url) => [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: PRODUCT,
      url: url('/crm/'),
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Orbinly CRM is a fictional lightweight CRM for small teams, used for software testing. It covers contact records, a deal pipeline, tasks, notes and simple reports.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: url('/crm/'),
      name: 'CRM software built for small teams',
      inLanguage: 'en',
      author: { '@type': 'Organization', name: BRAND, url: url('/') },
      dateModified: PUBLISHED,
    },
  ],
  body: `
<h1>CRM software built for small teams</h1>
<p class="byline">By the Orbinly team · Updated <time datetime="${PUBLISHED}">${PUBLISHED_LABEL}</time></p>
<p>Most CRM software is designed for sales departments with dozens of people, layers of management and a full-time administrator. Small teams need the opposite: a tool that takes minutes to learn, stays out of the way and still makes sure no client is forgotten. This page explains what a CRM is, what Orbinly CRM includes and how it helps a team of one to ten people.</p>

<h2>What is a CRM?</h2>
<p>A CRM, short for customer relationship management, is software that stores every contact, conversation and open deal in one shared place. It gives a business a single record of who its customers are, what has been said or promised, and what should happen next, so follow-ups do not depend on memory.</p>
<p>The term also describes the practice behind the software: paying deliberate attention to how a business finds, serves and keeps its customers. In everyday use, though, most people say "a CRM" and mean the tool. For a small business the core idea is simple. Instead of details being scattered across inboxes, phones, sticky notes and a spreadsheet, they live in one system that everyone on the team can read.</p>
<p>A CRM usually brings together three kinds of information:</p>
<ul>
<li>People and companies: names, roles, contact details and how they found you.</li>
<li>Activity: the calls, emails, meetings and notes that make up the relationship so far.</li>
<li>Opportunities: pieces of possible or agreed work, each with a stage, an owner and a next step.</li>
</ul>
<p>Software that only keeps the first kind is closer to an address book. A CRM earns its name by connecting all three, so that opening a contact shows the whole story rather than a phone number.</p>

<h2>What Orbinly includes</h2>
<p>Orbinly CRM keeps the feature list short on purpose. Each part below exists because a small service team would otherwise have to track the same thing by hand.</p>
<h3>Contact records</h3>
<p>Every person and company gets one record. It holds contact details, free-form notes and labels you choose yourself, such as "past client" or "referral partner". People are linked to their company, so you can see everyone you know at an organisation on one screen.</p>
<h3>Deal pipeline</h3>
<p>A deal is any piece of work you hope to win or have agreed to deliver. Deals sit in columns that represent stages, for example enquiry, proposal sent, agreed and delivered. You can rename the stages to match the way you already talk about your work.</p>
<h3>Tasks and reminders</h3>
<p>Any contact or deal can carry a next step with a due date. Due items are gathered into a daily list, which becomes the first thing you check in the morning.</p>
<h3>Notes and history</h3>
<p>Log a call or paste the important line from an email and it is added to a timeline on the contact. Months later, the context is still there for you or for a colleague who picks up the relationship.</p>
<h3>Simple reports</h3>
<p>Two plain summaries answer the questions small teams ask most: how much work is open at each stage, and how much was completed in a given period.</p>
<p>In short, the product covers:</p>
<ul>
<li>one shared record for each contact and company;</li>
<li>a pipeline with stages you define;</li>
<li>next steps with due dates and a daily list;</li>
<li>a dated history of notes for every relationship;</li>
<li>summaries of open and completed work.</li>
</ul>

<h2>How does a CRM help a small team?</h2>
<p>The benefit is rarely dramatic on any single day. It builds up through small moments in which the right detail is easy to find and the next action is obvious.</p>
<p>Consider a three-person studio. One partner takes a call from a prospect on Tuesday and promises a proposal by Friday. Without a shared system, that promise lives in one person's head. With a CRM, the call is logged, the deal moves to "proposal due" and a reminder appears on Friday morning for whoever is in the office.</p>
<p>Across a year, that pattern tends to show up in a few practical ways:</p>
<ul>
<li>Fewer dropped follow-ups, because every open deal has a visible next step.</li>
<li>Faster handovers, because a colleague can read the history instead of asking for it.</li>
<li>A realistic view of upcoming work, because the pipeline shows what is likely to land.</li>
<li>Less duplicated effort, because there is one list rather than several private ones.</li>
</ul>
<p>A CRM does not replace judgement or good service. It removes the clerical work of remembering, which is the part people get wrong when they are busy.</p>
<p>Different teams lean on different parts. Solo workers mostly need reminders and a tidy client list, as described on the <a href="/crm-for-freelancers/">CRM for freelancers</a> page. Teams that share clients care more about a common pipeline, covered on the page <a href="/crm-for-agencies/">for agency teams</a>. If you currently track clients in a spreadsheet, the <a href="/compare/crm-vs-spreadsheets/">CRM vs spreadsheets</a> comparison sets out where each approach fits, and the <a href="/faq/">FAQ</a> answers shorter questions.</p>

<h2>Sources</h2>
<p>The general definitions on this page follow these public references:</p>
<ul>
<li><a href="https://en.wikipedia.org/wiki/Customer_relationship_management">Customer relationship management</a>, Wikipedia.</li>
<li><a href="https://en.wikipedia.org/wiki/Contact_manager">Contact manager</a>, Wikipedia.</li>
</ul>
`,
};
