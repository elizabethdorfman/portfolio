import { createServer } from 'vite';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
const origin = 'https://elizabethdorfman.com';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render, posts } = await server.ssrLoadModule('/src/prerender.tsx');
  const template = await readFile('dist/index.html', 'utf8');
  const assets = await readdir('dist/assets');
  const skill = assets.find(name => name.startsWith('write-like-a-human-') && name.endsWith('.md'));
  const pages = [{ path: '/blog', title: 'Elizabeth Dorfman Tech Blog', summary: 'Writing by Elizabeth Dorfman about software, AI, and making technology easier to use.' }, ...posts.map(post => ({ ...post, path: `/blog/${post.slug}` }))];
  for (const page of pages) {
    const url = origin + page.path;
    const image = origin + '/write-like-a-human-preview.png';
    let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace(/<meta\s+(?:name|property)="(?:title|description|og:[^"]+|twitter:[^"]+)"[^>]*>/g, '');
    const metadata = { description: page.summary, 'og:site_name': 'Elizabeth Dorfman Tech Blog', 'og:title': page.title, 'og:description': page.summary, 'og:type': page.slug ? 'article' : 'website', 'og:url': url, 'og:image': image, 'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': 'Write like a human. Real before-and-after examples and a free AI writing skill by Elizabeth Dorfman.', 'twitter:card': 'summary_large_image', 'twitter:title': page.title, 'twitter:description': page.summary, 'twitter:image': image };
    let head = `<link rel="canonical" href="${url}" />\n` + Object.entries(metadata).map(([key, value]) => `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)}" />`).join('\n');
    if (page.slug) {
      const data = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: page.title, description: page.summary, image: [image], datePublished: page.date, author: { '@type': 'Person', name: 'Elizabeth Dorfman', url: origin }, mainEntityOfPage: url, publisher: { '@type': 'Person', name: 'Elizabeth Dorfman' } };
      head += `\n<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`;
    }
    const body = render(page.path).replaceAll('/src/data/write-like-a-human.md', `/assets/${skill}`);
    html = html.replace('</head>', `${head}\n</head>`).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    const directory = `dist${page.path}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, html);
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', ...pages.map(page => page.path)].map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
} finally { await server.close(); }
