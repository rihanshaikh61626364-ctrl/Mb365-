import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    let supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fgsiesdyaxpntduqtjht.supabase.co'; if (supabaseUrl.endsWith('/rest/v1/')) supabaseUrl = supabaseUrl.replace('/rest/v1/', ''); else if (supabaseUrl.endsWith('/rest/v1')) supabaseUrl = supabaseUrl.replace('/rest/v1', '');
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__BWUMGsnLAQ2ELVyTBxhjA_NU3lMmo-';

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase credentials missing' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const [booksRes, categoriesRes] = await Promise.all([
      supabase.from('books').select('slug, id, updated_at').eq('status', 'published'),
      supabase.from('categories').select('slug').eq('status', 'active')
    ]);

    if (booksRes.error) throw booksRes.error;
    if (categoriesRes.error) throw categoriesRes.error;

    const books = booksRes.data || [];
    const categories = categoriesRes.data || [];

    const baseUrl = 'https://mybooks365.com';
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static pages
    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/products', priority: '0.9', changefreq: 'daily' },
      { path: '/about', priority: '0.7', changefreq: 'monthly' },
    ];

    for (const page of staticPages) {
      xml += `\n  <url>\n    <loc>${baseUrl}${page.path}</loc>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`;
    }

    for (const cat of categories) {
      if (cat.slug) {
        xml += `\n  <url>\n    <loc>${baseUrl}/products?category=${encodeURIComponent(cat.slug)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
      }
    }

    for (const book of books) {
      const urlSlug = book.slug || book.id;
      if (urlSlug) {
        const lastMod = book.updated_at ? book.updated_at.split('T')[0] : new Date().toISOString().split('T')[0];
        xml += `\n  <url>\n    <loc>${baseUrl}/book/${encodeURIComponent(urlSlug)}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
      }
    }

    xml += `\n</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end('Error generating sitemap');
  }
}
