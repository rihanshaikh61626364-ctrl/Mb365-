import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicStore from './PublicStore';
import AdminApp from './components/admin/AdminPanel';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/book/:slug" element={<PublicStore />} />
        <Route path="/*" element={<PublicStore />} />
      </Routes>
    </BrowserRouter>
  );
}
