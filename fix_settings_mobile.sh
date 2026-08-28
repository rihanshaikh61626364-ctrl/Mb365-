sed -i 's/products_banner_url?: string;/products_banner_url?: string;\n  products_banner_mobile_url?: string;/g' src/services/books.ts
sed -i 's/products_banner_url: '\'''\'',/products_banner_url: '\'''\'',\n  products_banner_mobile_url: '\'''\'',/g' src/services/books.ts
