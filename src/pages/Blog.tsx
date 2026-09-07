import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { posts } from '../data/blog';
import './blog.css';
import writingSkill from '../data/write-like-a-human.md?raw';
import writingSkillUrl from '../data/write-like-a-human.md?url';

function LinkArrow() {
  return <svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'inline-block', verticalAlign: '-0.1em' }}><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

export default function Blog() {
  const { slug } = useParams();
  const post = posts.find(item => item.slug === slug);
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content');
    document.title = slug ? `${post?.title ?? 'Post not found'} · Elizabeth Dorfman Tech Blog` : 'Elizabeth Dorfman Tech Blog';
    description?.setAttribute('content', post?.summary ?? 'Writing about software, AI, and making technology easier to use.');
    const saved: Array<() => void> = [];
    const updateTag = (selector: string, attributes: Record<string, string>) => {
      let tag = document.head.querySelector(selector);
      const previous = tag?.outerHTML;
      if (!tag) { tag = document.createElement(selector.startsWith('link') ? 'link' : 'meta'); document.head.append(tag); }
      const element = tag;
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
      saved.push(() => { if (previous) element.outerHTML = previous; else element.remove(); });
    };
    const url = `https://elizabethdorfman.com/blog${post ? `/${post.slug}` : ''}`;
    updateTag('link[rel="canonical"]', { rel: 'canonical', href: url });
    for (const [key, value] of Object.entries({ 'og:title': post?.title ?? 'Elizabeth Dorfman Tech Blog', 'og:description': post?.summary ?? 'Writing about software, AI, and making technology easier to use.', 'og:url': url, 'og:type': post ? 'article' : 'website', 'og:image': 'https://elizabethdorfman.com/write-like-a-human-preview.png', 'twitter:title': post?.title ?? 'Elizabeth Dorfman Tech Blog', 'twitter:description': post?.summary ?? 'Writing about software, AI, and making technology easier to use.', 'twitter:image': 'https://elizabethdorfman.com/write-like-a-human-preview.png' })) {
      const attribute = key.startsWith('og:') ? 'property' : 'name';
      updateTag(`meta[${attribute}="${key}"]`, { [attribute]: key, content: value });
    }
    window.scrollTo(0, 0);
    return () => {
      saved.reverse().forEach(restore => restore());
      document.title = previousTitle;
      if (previousDescription !== null && previousDescription !== undefined) description?.setAttribute('content', previousDescription);
    };
  }, [slug, post]);

  return <div className="blog-page">
    <a className="blog-skip" href="#blog-content">Skip to content</a>
    <header className="blog-header">
      <Link className="blog-identity" to="/"><img src="/elizabeth-watercolor-180.png" width="48" height="48" alt="" /><span>Elizabeth Dorfman</span></Link>
      <nav aria-label="Main navigation"><Link to="/blog" aria-current={slug ? undefined : 'page'}>Blog</Link></nav>
    </header>
    <main id="blog-content" className="blog-content">
      {!slug ? <>
        <div className="blog-intro"><h1>Notes from<br /><em>my work.</em></h1><p>Thoughts on software, AI, and making technology easier to use.</p></div>
        <div className="blog-posts">{posts.map(item => <article key={item.slug} className="blog-card">
          <time dateTime={item.date}>{item.displayDate}</time>
          <h2><Link to={`/blog/${item.slug}`}>{item.title}{' '}<LinkArrow /></Link></h2>
          <p>{item.summary}</p><Link className="blog-read" to={`/blog/${item.slug}`}>Read the post <span aria-hidden="true">→</span></Link>
        </article>)}</div>
      </> : post ? <article className="blog-article">
        <Link className="blog-back" to="/blog">← Back to the blog</Link>
        <header><time dateTime={post.date}>{post.displayDate}</time><h1>{post.title}</h1><p className="blog-deck">{post.summary}</p><p className="blog-byline">Written by Elizabeth Dorfman (and her new writing skill)</p></header>
        <div className="blog-prose">{post.blocks.map((block, i) => block.before ? <figure className="blog-comparison" key={i}><div className="blog-comparison-pair"><div><span className="blog-comparison-label">Before</span><blockquote>{block.before}</blockquote></div><div><span className="blog-comparison-label">After</span><blockquote>{block.after}</blockquote></div></div></figure> : <p key={i}>{block.text}</p>)}</div>
        <section className="blog-skill" aria-label="The complete Write like a human skill"><div className="blog-skill-header"><h2>Make it yours.</h2><a href={writingSkillUrl} download="SKILL.md">Download SKILL.md ↓</a></div><pre className="blog-prompt"><code>{writingSkill}</code></pre></section>
        <Link className="blog-back blog-end" to="/blog">← Back to the blog</Link>
      </article> : <div className="blog-intro"><h1>This post<br />isn’t here.</h1><p>The address may be incorrect.</p><Link className="blog-back" to="/blog">Read the blog →</Link></div>}
    </main>
    <footer className="blog-footer"><span>Elizabeth Dorfman</span><a href="mailto:elizabethdorfman31@gmail.com">Get in touch <LinkArrow /></a></footer>
  </div>;
}
