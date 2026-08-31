const fs = require('fs');

// Fix vite.config.ts
let content = fs.readFileSync('vite.config.ts', 'utf8');
content = content.replace(
  "const supabaseUrl = env.VITE_SUPABASE_URL || 'https://fgsiesdyaxpntduqtjht.supabase.co';",
  "let supabaseUrl = env.VITE_SUPABASE_URL || 'https://fgsiesdyaxpntduqtjht.supabase.co'; if (supabaseUrl.endsWith('/rest/v1/')) supabaseUrl = supabaseUrl.replace('/rest/v1/', ''); else if (supabaseUrl.endsWith('/rest/v1')) supabaseUrl = supabaseUrl.replace('/rest/v1', '');"
);
content = content.replace(
  "<!-- Books length: ' + books.length + ' URL: ' + supabaseUrl + ' KEY: ' + supabaseKey.substring(0, 10) + ' -->",
  ""
);
fs.writeFileSync('vite.config.ts', content);

// Fix api/sitemap.js
let apiContent = fs.readFileSync('api/sitemap.js', 'utf8');
apiContent = apiContent.replace(
  "const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fgsiesdyaxpntduqtjht.supabase.co';",
  "let supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fgsiesdyaxpntduqtjht.supabase.co'; if (supabaseUrl.endsWith('/rest/v1/')) supabaseUrl = supabaseUrl.replace('/rest/v1/', ''); else if (supabaseUrl.endsWith('/rest/v1')) supabaseUrl = supabaseUrl.replace('/rest/v1', '');"
);
fs.writeFileSync('api/sitemap.js', apiContent);
