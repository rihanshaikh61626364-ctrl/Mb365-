const fs = require('fs');
let content = fs.readFileSync('vite.config.ts', 'utf8');

content = content.replace(
  "const books = booksRes.data || [];",
  "const books = booksRes.data || []; console.log('BOOKS IN VITE:', books, booksRes.error);"
);

fs.writeFileSync('vite.config.ts', content);
