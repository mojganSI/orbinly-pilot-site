// Minimal local static server for dist/. For local checks only; production hosting is any
// static host. Mirrors common host behaviour: directory index files, 404.html with status 404
// for unknown paths, and a 301 from a directory path without a trailing slash to the same path
// with one.
//
//   node scripts/serve.mjs            serves dist/ on http://localhost:4173
//   PORT=8080 node scripts/serve.mjs

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT || 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

async function isFile(path) {
  return (await stat(path).catch(() => null))?.isFile() ?? false;
}

createServer(async (request, response) => {
  const { pathname } = new URL(request.url, 'http://localhost');
  const target = normalize(join(DIST, decodeURIComponent(pathname)));
  if (target !== DIST && !target.startsWith(DIST + sep)) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  if (!pathname.endsWith('/') && (await isFile(join(target, 'index.html')))) {
    response.writeHead(301, { Location: pathname + '/' }).end();
    return;
  }
  const file = pathname.endsWith('/') ? join(target, 'index.html') : target;
  if (!(await isFile(file))) {
    const notFound = await readFile(join(DIST, '404.html')).catch(() => 'Not found');
    response.writeHead(404, { 'Content-Type': TYPES['.html'] }).end(notFound);
    return;
  }
  response
    .writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' })
    .end(await readFile(file));
}).listen(PORT, () => console.log(`Serving dist/ on http://localhost:${PORT}`));
