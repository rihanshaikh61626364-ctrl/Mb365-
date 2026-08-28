sed -i 's/book.categoryId/book.category_id/g' src/pages/ProductsPage.tsx

# Remove sort state and logic
sed -i '/const sortBy = searchParams.get('\''sort'\'') || '\''featured'\'';/d' src/pages/ProductsPage.tsx
sed -i '/const handleSortSelect = (/,/};/d' src/pages/ProductsPage.tsx
sed -i '/searchParams.delete('\''sort'\'');/d' src/pages/ProductsPage.tsx

# Remove sort switch case from useMemo
sed -i '/switch (sortBy) {/,/}/d' src/pages/ProductsPage.tsx

# Remove sort dependency from useMemo
sed -i 's/, sortBy]//g' src/pages/ProductsPage.tsx

# Remove sorting dropdown UI
sed -i '/<select/,/<\/select>/d' src/pages/ProductsPage.tsx
sed -i '/<Filter className=/d' src/pages/ProductsPage.tsx

