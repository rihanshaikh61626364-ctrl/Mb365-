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
  social_github?: string;
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
  social_github: '',
};

let activeLocalBooks = [...BOOKS];
let activeLocalCategories = [...CATEGORIES];

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!supabase) return localSettings;
  try {
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    if (error || !data) return localSettings;
    return data as SiteSettings;
  } catch (err) {
    return localSettings;
  }
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  if (!supabase) {
    localSettings = { ...localSettings, ...settings };
    return localSettings;
  }
  try {
    const current = await getSiteSettings();
    const { data, error } = await supabase
      .from('site_settings')
      .update(settings)
      .eq('id', current.id)
      .select()
      .single();
    if (error) { if (error.message.includes("Bucket not found")) throw new Error("Storage Bucket not found. Please create a public storage bucket named 'books' in your Supabase dashboard."); else throw error; }
    return data as SiteSettings;
  } catch (err: any) {
    console.error('[BooksService] Error updating site settings:', err);
    throw new Error(err.message || 'Error updating settings. Did you add the new columns in Supabase?');
  }
}

export async function checkIsAdmin(userId: string): Promise<boolean> {
  return true;
}

export async function getPublishedBooks(): Promise<Book[]> {
  if (!supabase) return activeLocalBooks.filter(b => b.is_featured !== false);
  try {
    const { data, error } = await supabase.from('books').select('*');
    if (error) return activeLocalBooks;
    return data as Book[];
  } catch {
    return activeLocalBooks;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!supabase) return activeLocalCategories;
  try {
    const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
    if (error) return activeLocalCategories;
    return data as Category[];
  } catch {
    return activeLocalCategories;
  }
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  return getCategories();
}

export async function createCategory(cat: Partial<Category>): Promise<Category> {
  if (!supabase) {
    const newCat = { ...cat, id: Date.now().toString() } as Category;
    activeLocalCategories.push(newCat);
    return newCat;
  }
  const { data, error } = await supabase.from('categories').insert(cat).select().single();
  if (error) { if (error.message.includes("Bucket not found")) throw new Error("Storage Bucket not found. Please create a public storage bucket named 'books' in your Supabase dashboard."); else throw error; }
  return data;
}

export async function updateCategory(id: string, cat: Partial<Category>): Promise<Category> {
  if (!supabase) {
    const idx = activeLocalCategories.findIndex(c => c.id === id);
    if (idx > -1) {
      activeLocalCategories[idx] = { ...activeLocalCategories[idx], ...cat };
      return activeLocalCategories[idx];
    }
    throw new Error('Category not found');
  }
  const { data, error } = await supabase.from('categories').update(cat).eq('id', id).select().single();
  if (error) { if (error.message.includes("Bucket not found")) throw new Error("Storage Bucket not found. Please create a public storage bucket named 'books' in your Supabase dashboard."); else throw error; }
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  if (!supabase) {
    activeLocalCategories = activeLocalCategories.filter(c => c.id !== id);
    return;
  }
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) { if (error.message.includes("Bucket not found")) throw new Error("Storage Bucket not found. Please create a public storage bucket named 'books' in your Supabase dashboard."); else throw error; }
}

export async function getAllBooksAdmin(): Promise<Book[]> {
  if (!supabase) return activeLocalBooks;
  try {
    const { data, error } = await supabase.from('books').select('*');
    if (error) return activeLocalBooks;
    return data as Book[];
  } catch {
    return activeLocalBooks;
  }
}

export async function createBook(book: Partial<Book>): Promise<Book> {
  if (!supabase) {
    const newBook = { ...book, id: Date.now().toString() } as Book;
    activeLocalBooks.push(newBook);
    return newBook;
  }
  const { data, error } = await supabase.from('books').insert(book).select().single();
  if (error) { if (error.message.includes("Bucket not found")) throw new Error("Storage Bucket not found. Please create a public storage bucket named 'books' in your Supabase dashboard."); else throw error; }
  return data;
}

export async function updateBook(id: string, book: Partial<Book>): Promise<Book> {
  if (!supabase) {
    const idx = activeLocalBooks.findIndex(b => b.id === id);
    if (idx > -1) {
      activeLocalBooks[idx] = { ...activeLocalBooks[idx], ...book };
      return activeLocalBooks[idx];
    }
    throw new Error('Book not found');
  }
  const { data, error } = await supabase.from('books').update(book).eq('id', id).select().single();
  if (error) { if (error.message.includes("Bucket not found")) throw new Error("Storage Bucket not found. Please create a public storage bucket named 'books' in your Supabase dashboard."); else throw error; }
  return data;
}

export async function deleteBook(id: string): Promise<void> {
  if (!supabase) {
    activeLocalBooks = activeLocalBooks.filter(b => b.id !== id);
    return;
  }
  const { error } = await supabase.from('books').delete().eq('id', id);
  if (error) { if (error.message.includes("Bucket not found")) throw new Error("Storage Bucket not found. Please create a public storage bucket named 'books' in your Supabase dashboard."); else throw error; }
}

export async function uploadBookCover(file: File): Promise<string> {
  if (!supabase) {
    return URL.createObjectURL(file);
  }
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `covers/${fileName}`;
  const { error } = await supabase.storage.from('books').upload(filePath, file);
  if (error) { if (error.message.includes("Bucket not found")) throw new Error("Storage Bucket not found. Please create a public storage bucket named 'books' in your Supabase dashboard."); else throw error; }
  const { data } = supabase.storage.from('books').getPublicUrl(filePath);
  return data.publicUrl;
}

export interface HomepageSection {
  id: string;
  section_type: 'bestselling' | 'featured';
  book_id: string;
  display_order: number;
}

export async function getHomepageSections(sectionType: 'bestselling' | 'featured'): Promise<HomepageSection[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('homepage_sections')
    .select('*')
    .eq('section_type', sectionType)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error(`Error fetching ${sectionType} sections:`, error);
    return [];
  }
  return data as HomepageSection[];
}

export async function updateHomepageSections(sectionType: 'bestselling' | 'featured', bookIds: string[]): Promise<void> {
  if (!supabase) return;
  
  // 1. Delete all existing for this section
  const { error: deleteError } = await supabase
    .from('homepage_sections')
    .delete()
    .eq('section_type', sectionType);
    
  if (deleteError) {
    throw new Error(`Error clearing old sections: ${deleteError.message}`);
  }
  
  // 2. Insert new ordered books
  if (bookIds.length > 0) {
    const newRecords = bookIds.map((book_id, index) => ({
      section_type: sectionType,
      book_id: book_id,
      display_order: index
    }));
    
    const { error: insertError } = await supabase
      .from('homepage_sections')
      .insert(newRecords);
      
    if (insertError) {
      throw new Error(`Error saving new sections: ${insertError.message}`);
    }
  }
}
