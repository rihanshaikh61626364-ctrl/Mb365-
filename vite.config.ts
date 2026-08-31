import tailwindcss from '@tailwindcss/vite';
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
        let supabaseUrl = env.VITE_SUPABASE_URL || 'https://fgsiesdyaxpntduqtjht.supabase.co'; if (supabaseUrl.endsWith('/rest/v1/')) supabaseUrl = supabaseUrl.replace('/rest/v1/', ''); else if (supabaseUrl.endsWith('/rest/v1')) supabaseUrl = supabaseUrl.replace('/rest/v1', '');
        const supabaseKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__BWUMGsnLAQ2ELVyTBxhjA_NU3lMmo-';

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

        const books = booksRes.data || []; console.log('BOOKS IN VITE:', books, booksRes.error);
        const categories = categoriesRes.data || [];
        const baseUrl = 'https://mybooks365.com';
        
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        const staticPages = [
          { path: '/', priority: '1.0', changefreq: 'daily' },
          { path: '/products', priority: '0.9', changefreq: 'daily' },
          { path: '/about', priority: '0.7', changefreq: 'monthly' },
        ];

        for (const page of staticPages) {
          xml += '\n  <url>\n    <loc>' + baseUrl + page.path + '</loc>\n    <changefreq>' + page.changefreq + '</changefreq>\n    <priority>' + page.priority + '</priority>\n  </url>';
        }

        for (const cat of categories) {
          if (cat.slug) {
            xml += '\n  <url>\n    <loc>' + baseUrl + '/products?category=' + encodeURIComponent(cat.slug) + '</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>';
          }
        }

        for (const book of books) {
          const urlSlug = book.slug || book.id;
          if (urlSlug) {
            const lastMod = book.updated_at ? book.updated_at.split('T')[0] : new Date().toISOString().split('T')[0];
            xml += '\n  <url>\n    <loc>' + baseUrl + '/book/' + encodeURIComponent(urlSlug) + '</loc>\n    <lastmod>' + lastMod + '</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>';
          }
        }

        xml += '\n</urlset>';

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
    plugins: [react(), tailwindcss(), sitemapPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@google/genai')) {
                return 'google-genai';
              }
              if (id.includes('@supabase/supabase-js')) {
                return 'supabase';
              }
              if (id.includes('lucide-react')) {
                return 'lucide';
              }
              if (id.includes('motion') || id.includes('framer-motion')) {
                return 'motion';
              }
              if (id.includes('react-router-dom') || id.includes('@remix-run')) {
                return 'react-router';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'react-core';
              }
              return 'vendor';
            }
          }
        }
      }
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
