sed -i 's/books: Book\[\];/books: Book\[\];\n  bestsellingBooks?: Book\[\];\n  featuredBooks?: Book\[\];/' src/components/BookGrid.tsx

sed -i 's/books,/books,\n  bestsellingBooks = \[\],\n  featuredBooks = \[\],/' src/components/BookGrid.tsx

sed -i 's/const trendingLimit = books.slice(0, 10);/const trendingLimit = bestsellingBooks;/' src/components/BookGrid.tsx
sed -i 's/const featuredLimit = books.filter(b => b.is_featured).slice(0, 10);/const featuredLimit = featuredBooks;/' src/components/BookGrid.tsx
