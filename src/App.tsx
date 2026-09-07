import { Routes, Route, Navigate } from 'react-router-dom';
import Workshop from './pages/Workshop';
import Blog from './pages/Blog';

export default function App() {
  return <Routes><Route path="/" element={<Workshop />} /><Route path="/blog" element={<Blog />} /><Route path="/blog/:slug" element={<Blog />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}
