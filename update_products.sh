sed -i '/<div className="flex-grow overflow-x-auto scrollbar-none w-full sm:w-auto">/,/<\/div>/d' src/pages/ProductsPage.tsx
sed -i '/<div className="w-full text-center mb-12">/,/<\/div>/a\
        <ProductsCategoryGrid\n          selectedCategory={selectedCategorySlug}\n          setSelectedCategory={handleCategorySelect}\n          categories={categories}\n        />' src/pages/ProductsPage.tsx
