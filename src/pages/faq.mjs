import { escapeHtml } from '../layout.mjs';

// Healthy Q&A control. Contract: one H1, exactly eight H2 questions each ending with "?",
// FAQPage markup built from the same eight pairs, no lists, no external links, no author/date.
// Answers are plain text so the visible answer and the markup are identical.
export const QUESTIONS = [
  [
    'What is a CRM?',
    'A CRM, or customer relationship management system, is software that keeps your contacts, the history of your conversations with them and your open work in one place. Instead of details being spread across email, a phone and a notebook, each client has a single record that shows what was said and what should happen next.',
  ],
  [
    'Do freelancers need a CRM?',
    'Not always. A freelancer with a handful of steady clients can manage well with a simple list. A CRM starts to help when you are waiting on several proposals at once, rely on repeat work from past clients or find that follow-ups are being sent late. At that point a reminder list and a client history save more time than they cost to maintain.',
  ],
  [
    'How is a CRM different from a spreadsheet?',
    'A spreadsheet stores a list of facts in rows and columns. A CRM stores the same facts and adds two things a grid lacks: a dated history for every contact and reminders that surface on the day a follow-up is due. A spreadsheet has to be checked, while a CRM tells you what needs attention today.',
  ],
  [
    'Can a small agency share one pipeline?',
    'Yes. In Orbinly CRM every piece of possible and agreed work sits in a single pipeline that the whole team can see. Each item has an owner, a stage and a next step, so a weekly meeting can review the same view together and a colleague can take over a client by reading the notes already recorded.',
  ],
  [
    'How long does it take to set up a CRM?',
    'For a small team the first setup is usually a single sitting. You add the clients you are working with now, create an entry for each open proposal and give each one a next step. It is better to start with current work only and add older contacts later, when you actually need them.',
  ],
  [
    'What should a contact record contain?',
    'Keep it to what you will use. A name, a company, one or two ways to reach the person, a short note on how you met and the date of your last conversation cover most needs. Add a label such as lead, active client or past client so that the list can be filtered when you plan your week.',
  ],
  [
    'Does a CRM replace email?',
    'No. You still write to clients from your usual email account. A CRM sits beside it and holds the summary: who the person is, what was agreed and when to get in touch again. Many people log only the important points of a conversation, which keeps the record short enough to read later.',
  ],
  [
    'Is Orbinly CRM a real product?',
    'No. Orbinly CRM is a fictional product used for software testing. This website exists so that search and content analysis tools can be checked against pages whose structure is known in advance. Nothing is sold here, there are no accounts to create and the site does not collect personal information.',
  ],
];

export default {
  path: '/faq/',
  title: 'Orbinly FAQ: CRM Questions from Freelancers and Agencies',
  description:
    'Short answers to eight common CRM questions: what a CRM is, who needs one, how it differs from a spreadsheet and how long setup takes.',
  canonical: true,
  robots: null,
  sitemap: true,
  chrome: 'full',
  jsonLd: () => [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: QUESTIONS.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
  body: `
<h1>Frequently asked questions</h1>
<p>These are short answers to the questions that come up most often about CRM software and about this site. For longer explanations, see the <a href="/crm/">CRM software</a> overview, the pages on using a <a href="/crm-for-freelancers/">CRM for freelancers</a> and <a href="/crm-for-agencies/">for agency teams</a>, or the <a href="/compare/crm-vs-spreadsheets/">CRM vs spreadsheets</a> comparison.</p>
${QUESTIONS.map(
  ([question, answer]) => `
<h2>${escapeHtml(question)}</h2>
<p>${escapeHtml(answer)}</p>`,
).join('\n')}
`,
};
