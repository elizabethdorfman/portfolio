import { renderToString } from 'react-dom/server';
import { StaticRouter, Routes, Route } from 'react-router-dom';
import Blog from './pages/Blog';
import { posts } from './data/blog';
export { posts };
export function render(path: string) {
  return renderToString(<StaticRouter location={path}><Routes><Route path="/blog" element={<Blog />} /><Route path="/blog/:slug" element={<Blog />} /></Routes></StaticRouter>);
}
