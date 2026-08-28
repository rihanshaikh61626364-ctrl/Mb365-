cat << 'INNER_EOF' >> src/services/books.ts

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
INNER_EOF
