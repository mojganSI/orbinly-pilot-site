// INTENTIONAL WEAKNESSES, do not fix:
//   - weak title ("About")
//   - thin content (one short paragraph)
//   - no meta description
//   - no structured data
//   - zero outgoing internal links: chrome "bare" renders no <a> at all, and the body must
//     not contain one either
export default {
  path: '/about/',
  title: 'About',
  description: null,
  canonical: true,
  robots: null,
  sitemap: true,
  chrome: 'bare',
  jsonLd: null,
  body: `
<h1>About Orbinly</h1>
<p>Orbinly CRM is a small customer relationship manager imagined for freelancers, small agencies and local service businesses. The idea behind it is modest: keep contacts, open work and follow-ups in one tidy place, and leave out everything a small team would never use. The pages on this site describe that product and the thinking behind it in plain language. It was sketched as an answer to a common complaint, which is that most tools of this kind are built for large sales departments and feel heavy in the hands of two or three people.</p>
`,
};
