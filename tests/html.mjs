// Small regex-based readers for this site's own generated HTML. Not a general HTML parser.

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };

export function decode(text) {
  return text.replace(/&(amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity]);
}

export function textOf(fragment) {
  return decode(fragment.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function attributes(source) {
  const found = {};
  for (const [, name, value] of source.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)) {
    found[name.toLowerCase()] = decode(value);
  }
  return found;
}

export function openTags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'gi'))].map((m) => attributes(m[1]));
}

export function elements(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>([\\s\\S]*?)</${name}>`, 'gi'))].map(
    (m) => ({ attrs: attributes(m[1]), inner: m[2] }),
  );
}

export function titles(html) {
  return elements(html, 'title').map((el) => textOf(el.inner));
}

export function meta(html, name) {
  return openTags(html, 'meta')
    .filter((attrs) => (attrs.name || '').toLowerCase() === name)
    .map((attrs) => attrs.content ?? '');
}

export function canonicals(html) {
  return openTags(html, 'link')
    .filter((attrs) => (attrs.rel || '').toLowerCase() === 'canonical')
    .map((attrs) => attrs.href);
}

export function headings(html) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: textOf(m[2]),
  }));
}

export function anchors(html) {
  return openTags(html, 'a').map((attrs) => attrs.href);
}

export function jsonLd(html) {
  return elements(html, 'script')
    .filter((el) => el.attrs.type === 'application/ld+json')
    .map((el) => JSON.parse(el.inner));
}

// Every object nested anywhere inside a JSON-LD value.
export function* schemaNodes(node) {
  if (Array.isArray(node)) {
    for (const item of node) yield* schemaNodes(item);
  } else if (node && typeof node === 'object') {
    yield node;
    for (const value of Object.values(node)) yield* schemaNodes(value);
  }
}

export function mainWordCount(html) {
  const main = elements(html, 'main')[0]?.inner ?? '';
  const text = textOf(main);
  return text ? text.split(' ').length : 0;
}
