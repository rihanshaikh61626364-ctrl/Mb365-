cat << 'INNER' > src/services/books.ts.tmp
import { supabase } from '../lib/supabase';
import { BOOKS, CATEGORIES, Book, Category } from '../booksData';

export interface SiteSettings {
  id: string;
  site_name: string;
  tagline: string;
  description: string;
  logo_url?: string;
  contact_email: string;
  social_instagram?: string;
  social_linkedin?: string;
  social_x?: string;
  social_youtube?: string;
  updated_at?: string;
}

// Global local settings fallback state
let localSettings: SiteSettings = {
  id: 'local-settings-id',
  site_name: 'MyBooks365',
  tagline: 'Read. Learn. Grow.',
  description: 'Practical eBooks for people who want to learn, build and grow.',
  contact_email: 'supportmybooks365@gmail.com',
  social_instagram: '',
  social_linkedin: '',
  social_x: '',
  social_youtube: '',
};

let activeLocalBooks = [...BOOKS];
let activeLocalCategories = [...CATEGORIES];
INNER
tail -n +25 src/services/books.ts >> src/services/books.ts.tmp
mv src/services/books.ts.tmp src/services/books.ts
