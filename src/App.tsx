import { Routes, Route, Navigate } from 'react-router-dom';
import Workshop from './pages/Workshop';

export default function App() {
  return <Routes><Route path="/" element={<Workshop />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}
