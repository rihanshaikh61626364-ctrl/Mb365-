sed -i 's/localSettings = { ...localSettings, ...settings };/throw err;/g' src/services/books.ts
sed -i 's/return localSettings;//g' src/services/books.ts
