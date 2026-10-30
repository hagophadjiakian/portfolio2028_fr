// Build step: render every page to static HTML (build/<page>.html) so the
// content is visible without JavaScript (search engines, AI tools, link
// previews). The browser then hydrates the page as a normal React app.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'build');
const ssrDir = path.join(root, 'build-ssr');

const { render, ROUTE_META, PROFILE, pageTitle } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

// Preload the two fonts used above the fold on every page (body text and the
// italic subtitles), so text doesn't re-flow when they arrive. Their file
// names contain a content hash, so look them up in the build output.
const PRELOAD_FONTS = [/^inter-latin-wght-normal-.*\.woff2$/, /^lora-latin-400-italic-.*\.woff2$/];
const assetFiles = fs.readdirSync(path.join(outDir, 'assets'));
const preloadTags = PRELOAD_FONTS.map((pattern) => {
  const file = assetFiles.find((f) => pattern.test(f));
  if (!file) throw new Error(`prerender: font to preload not found: ${pattern}`);
  return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;
}).join('\n    ');

let template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
if (!/<link rel="stylesheet"/.test(template)) throw new Error('prerender: stylesheet link not found in template');
template = template.replace(/(\s*)<link rel="stylesheet"/, `$1${preloadTags}$1<link rel="stylesheet"`);

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const setTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`prerender: tag not found in template: ${pattern}`);
  return html.replace(pattern, replacement);
};

function pageHtml(route, { title, description, noindex = false }) {
  const url = `${PROFILE.siteUrl}${route === '/' ? '/' : route}`;
  const fullTitle = pageTitle(title);
  let html = template;
  html = setTag(html, /<title>.*?<\/title>/s, `<title>${escapeAttr(fullTitle)}</title>`);
  html = setTag(html, /<meta\s+name="description"[^>]*\/>/s, `<meta name="description" content="${escapeAttr(description)}" />`);
  html = setTag(html, /<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${url}" />`);
  html = setTag(html, /<meta property="og:title"[^>]*\/>/, `<meta property="og:title" content="${escapeAttr(fullTitle)}" />`);
  html = setTag(html, /<meta\s+property="og:description"[^>]*\/>/s, `<meta property="og:description" content="${escapeAttr(description)}" />`);
  html = setTag(html, /<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${url}" />`);
  if (noindex) {
    html = html.replace(/\s*<link rel="canonical"[^>]*\/>/, '');
    html = html.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>');
  }
  const appHtml = render(route);
  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

const written = [];
for (const [route, meta] of Object.entries(ROUTE_META)) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  fs.writeFileSync(path.join(outDir, file), pageHtml(route, meta));
  written.push(file);
}

// Custom 404 page (served by Vercel for unknown URLs)
fs.writeFileSync(
  path.join(outDir, '404.html'),
  pageHtml('/404', { title: 'Page not found', description: "This page doesn't exist or has moved.", noindex: true })
);
written.push('404.html');

// sitemap.xml generated from the same route list
const today = new Date().toISOString().slice(0, 10);
const urls = Object.keys(ROUTE_META)
  .map((route) => `  <url><loc>${PROFILE.siteUrl}${route === '/' ? '/' : route}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');
fs.writeFileSync(
  path.join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
written.push('sitemap.xml');

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${written.length} files: ${written.join(', ')}`);
