// INTENTIONAL DEFECTS, do not fix:
//   - weak title ("Agencies")
//   - no H1
//   - skipped heading level (H2 followed by H4)
//   - no canonical
//   - no structured data
// Also by contract: no lists, no question headings, no external links.
export default {
  path: '/crm-for-agencies/',
  title: 'Agencies',
  description:
    'How a small agency team can share one client pipeline and hand work between colleagues with Orbinly CRM.',
  canonical: false,
  robots: null,
  sitemap: true,
  chrome: 'full',
  jsonLd: null,
  body: `
<h2>For agency teams</h2>
<p>A small agency runs on shared clients. One person wins the work, another plans it, a third delivers it, and the client expects all three to know what was agreed. Orbinly CRM gives an agency of a few people a single place where that knowledge lives, so it does not sit in one colleague's inbox.</p>
<p>The product is the same one described on the <a href="/crm/">CRM software</a> page. This page covers the two parts that matter most once more than one person talks to the same client.</p>

<h4>Shared pipeline</h4>
<p>Every piece of possible and agreed work appears in one pipeline that the whole team can see. Each item has an owner, a stage and a next step. During a weekly meeting the team can read down the columns together instead of asking each person for an update in turn.</p>
<p>Because stages can be renamed, the pipeline can follow the way your agency already describes its work, such as brief received, proposal sent, in production and delivered. New enquiries are added by whoever takes the call, and nothing waits for a single person to update a private list.</p>
<p>The shared view also helps with planning. When several proposals are close to agreement at once, the team can see the likely workload before it arrives and decide who has room to take it on.</p>

<h4>Client handoffs</h4>
<p>Work changes hands in an agency all the time: from the person who sold the project to the person who runs it, or from someone going on holiday to the colleague covering for them. Each contact and project carries a dated history of notes, so the person taking over can read what was promised and when.</p>
<p>A handoff then becomes a short conversation about priorities, not a long one about facts. The client notices the difference, because they do not have to explain themselves twice.</p>
<p>Agencies that currently manage clients in a shared spreadsheet may find the <a href="/compare/crm-vs-spreadsheets/">CRM vs spreadsheets</a> comparison useful, and short answers to common questions are on the <a href="/faq/">FAQ</a> page.</p>
`,
};
