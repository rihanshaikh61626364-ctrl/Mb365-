sed -i 's/getSiteSettings, SiteSettings/getSiteSettings, SiteSettings, getHomepageSections/' src/PublicStore.tsx

sed -i '/const \[books, setBooks\] = useState<Book\[\]>(\[\]);/a \  const \[bestsellingBooks, setBestsellingBooks\] = useState<Book\[\]>(\[\]);\n  const \[featuredBooks, setFeaturedBooks\] = useState<Book\[\]>(\[\]);' src/PublicStore.tsx

