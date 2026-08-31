const fs = require('fs');

function addEncoding(content) {
  content = content.replace(
    "/products?category=' + cat.slug + '",
    "/products?category=' + encodeURIComponent(cat.slug) + '"
  );
  content = content.replace(
    "/book/' + urlSlug + '",
    "/book/' + encodeURIComponent(urlSlug) + '"
  );
  // For ES6 string literals in api/sitemap.js
  content = content.replace(
    "/products?category=${cat.slug}",
    "/products?category=${encodeURIComponent(cat.slug)}"
  );
  content = content.replace(
    "/book/${urlSlug}",
    "/book/${encodeURIComponent(urlSlug)}"
  );
  return content;
}

let content = fs.readFileSync('vite.config.ts', 'utf8');
content = addEncoding(content);
fs.writeFileSync('vite.config.ts', content);

let apiContent = fs.readFileSync('api/sitemap.js', 'utf8');
apiContent = addEncoding(apiContent);
fs.writeFileSync('api/sitemap.js', apiContent);
