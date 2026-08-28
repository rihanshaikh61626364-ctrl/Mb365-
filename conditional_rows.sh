sed -i 's/<section className="w-full bg-white border-b border-slate-100 py-10 px-8">/{trendingLimit.length > 0 && (<section className="w-full bg-white border-b border-slate-100 py-10 px-8">/' src/components/BookGrid.tsx
sed -i '175s/<\/section>/<\/section>)}/' src/components/BookGrid.tsx
sed -i '178s/<section className="w-full bg-[#FAFAF9] py-10 px-8">/{featuredLimit.length > 0 && (<section className="w-full bg-[#FAFAF9] py-10 px-8">/' src/components/BookGrid.tsx
sed -i '281s/<\/section>/<\/section>)}/' src/components/BookGrid.tsx
