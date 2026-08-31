const fs = require('fs');
let content = fs.readFileSync('vite.config.ts', 'utf8');

content = content.replace(
  "let xml = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">';",
  "let xml = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\\n<!-- Books length: ' + books.length + ' Categories length: ' + categories.length + ' -->\\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">';"
);

fs.writeFileSync('vite.config.ts', content);
