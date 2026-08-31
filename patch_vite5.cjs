const fs = require('fs');
let content = fs.readFileSync('vite.config.ts', 'utf8');

content = content.replace(
  "<!-- Books length: ' + books.length + ' Categories length: ' + categories.length + ' -->",
  "<!-- Books length: ' + books.length + ' URL: ' + supabaseUrl + ' KEY: ' + supabaseKey.substring(0, 10) + ' -->"
);

fs.writeFileSync('vite.config.ts', content);
