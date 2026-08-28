sed -i '61,76c\
  const loadDatabaseData = async () => {\
    try {\
      const [fetchedBooks, fetchedCategories, fetchedSettings, bsSections, ftSections] = await Promise.all([\
        getPublishedBooks(),\
        getCategories(),\
        getSiteSettings(),\
        getHomepageSections("bestselling"),\
        getHomepageSections("featured")\
      ]);\
      setBooks(fetchedBooks);\
      setCategories(fetchedCategories);\
      setSiteSettings(fetchedSettings);\
      \
      const bsBooks = bsSections\
        .map(sec => fetchedBooks.find(b => b.id === sec.book_id))\
        .filter(Boolean) as Book[];\
      const ftBooks = ftSections\
        .map(sec => fetchedBooks.find(b => b.id === sec.book_id))\
        .filter(Boolean) as Book[];\
        \
      setBestsellingBooks(bsBooks);\
      setFeaturedBooks(ftBooks);\
    } catch (err) {\
      console.warn("[App] Error refreshing data from services layer:", err);\
    } finally {\
      setIsLoading(false);\
    }\
  };' src/PublicStore.tsx
