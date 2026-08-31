const fs = require('fs');
let content = fs.readFileSync('vite.config.ts', 'utf8');

content = content.replace(
  "const supabaseUrl = env.VITE_SUPABASE_URL;",
  "const supabaseUrl = env.VITE_SUPABASE_URL || 'https://fgsiesdyaxpntduqtjht.supabase.co';"
).replace(
  "const supabaseKey = env.VITE_SUPABASE_ANON_KEY;",
  "const supabaseKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__BWUMGsnLAQ2ELVyTBxhjA_NU3lMmo-';"
);

fs.writeFileSync('vite.config.ts', content);

let apiContent = fs.readFileSync('api/sitemap.js', 'utf8');
apiContent = apiContent.replace(
  "const supabaseUrl = process.env.VITE_SUPABASE_URL;",
  "const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fgsiesdyaxpntduqtjht.supabase.co';"
).replace(
  "const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;",
  "const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__BWUMGsnLAQ2ELVyTBxhjA_NU3lMmo-';"
);
fs.writeFileSync('api/sitemap.js', apiContent);
