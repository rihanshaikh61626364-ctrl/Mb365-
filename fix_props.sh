sed -i 's/bestsellingBooks={bestsellingBooks}/categories={categories}\n                bestsellingBooks={bestsellingBooks}/' src/PublicStore.tsx
sed -i '/featuredBooks={featuredBooks}/{
  N
  /\n.*featuredBooks={featuredBooks}/d
}' src/PublicStore.tsx
