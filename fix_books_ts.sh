sed -i 's/social_youtube?: string;/social_youtube?: string;\n  social_github?: string;/g' src/services/books.ts
sed -i 's/social_youtube: '\'''\'',/social_youtube: '\'''\'',\n  social_github: '\'''\'',/g' src/services/books.ts
