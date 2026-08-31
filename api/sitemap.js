import { createClient } from '@supabase/supabase-js';

// Robust XML escaping function
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export default async function handler(req, res) {
  try {
    let supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fgsiesdyaxpntduqtjht.supabase.co';
    if (supabaseUrl.endsWith('/rest/v1/')) supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
    else if (supabaseUrl.endsWith('/rest/v1')) supabaseUrl = supabaseUrl.replace('/rest/v1', '');
    
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__BWUMGsnLAQ2ELVyTBxhjA_NU3lMmo-';

    if (!supabaseUrl || !supabaseKey) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Supabase credentials missing' }));
      return;
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
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

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
        // Use standard URI encoding for URLs, then XML escape just in case
        const catUrl = `${baseUrl}/products?category=${encodeURIComponent(cat.slug)}`;
        xml += `\n  <url>\n    <loc>${escapeXml(catUrl)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
      }
    }

    for (const book of books) {
      const urlSlug = book.slug || book.id;
      if (urlSlug) {
        const bookUrl = `${baseUrl}/book/${encodeURIComponent(urlSlug)}`;
        const lastMod = book.updated_at ? book.updated_at.split('T')[0] : new Date().toISOString().split('T')[0];
        xml += `\n  <url>\n    <loc>${escapeXml(bookUrl)}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
      }
    }

    xml += '\n</urlset>';

    // Use robust Node.js response methods that work universally across all Vercel environments
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.end(xml);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Error generating sitemap');
  }
}
