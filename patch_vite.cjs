const fs = require('fs');
let content = fs.readFileSync('vite.config.ts', 'utf8');

const replacement = `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { createClient } from '@supabase/supabase-js';

const sitemapPlugin = () => ({
  name: 'sitemap-plugin',
  configureServer(server) {
    server.middlewares.use('/sitemap.xml', async (req, res) => {
      try {
        const env = loadEnv(server.config.mode, process.cwd(), '');
        const supabaseUrl = env.VITE_SUPABASE_URL;
        const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
          res.statusCode = 500;
          res.end('Supabase credentials missing');
          return;
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const [booksRes, categoriesRes] = await Promise.all([
          supabase.from('books').select('slug, id, updated_at').eq('status', 'published'),
          supabase.from('categories').select('slug').eq('status', 'active')
        ]);

        const books = booksRes.data || [];
        const categories = categoriesRes.data || [];
        const baseUrl = 'https://mybooks365.com';
        
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        const staticPages = [
          { path: '/', priority: '1.0', changefreq: 'daily' },
          { path: '/products', priority: '0.9', changefreq: 'daily' },
          { path: '/about', priority: '0.7', changefreq: 'monthly' },
        ];

        for (const page of staticPages) {
          xml += '\\n  <url>\\n    <loc>' + baseUrl + page.path + '</loc>\\n    <changefreq>' + page.changefreq + '</changefreq>\\n    <priority>' + page.priority + '</priority>\\n  </url>';
        }

        for (const cat of categories) {
          if (cat.slug) {
            xml += '\\n  <url>\\n    <loc>' + baseUrl + '/products?category=' + cat.slug + '</loc>\\n    <changefreq>weekly</changefreq>\\n    <priority>0.8</priority>\\n  </url>';
          }
        }

        for (const book of books) {
          const urlSlug = book.slug || book.id;
          if (urlSlug) {
            const lastMod = book.updated_at ? book.updated_at.split('T')[0] : new Date().toISOString().split('T')[0];
            xml += '\\n  <url>\\n    <loc>' + baseUrl + '/book/' + urlSlug + '</loc>\\n    <lastmod>' + lastMod + '</lastmod>\\n    <changefreq>weekly</changefreq>\\n    <priority>0.8</priority>\\n  </url>';
          }
        }

        xml += '\\n</urlset>';

        res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
        res.end(xml);
      } catch (error) {
        console.error('Error generating sitemap:', error);
        res.statusCode = 500;
        res.end('Error generating sitemap');
      }
    });
  }
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), sitemapPlugin()],`;

content = content.replace(/import tailwindcss.*plugins: \[react\(\), tailwindcss\(\)\],/s, replacement);
fs.writeFileSync('vite.config.ts', content);
