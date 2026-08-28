# 1. Update src/services/books.ts to include products_banner_url
sed -i 's/contact_email: string;/contact_email: string;\n  products_banner_url?: string;/g' src/services/books.ts

# 2. Update localSettings in src/services/books.ts
sed -i 's/contact_email: '\''supportmybooks365@gmail.com'\'',/contact_email: '\''supportmybooks365@gmail.com'\'',\n  products_banner_url: '\'''\'',/g' src/services/books.ts
