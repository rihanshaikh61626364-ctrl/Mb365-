const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fgsiesdyaxpntduqtjht.supabase.co';
const supabaseKey = 'sb_publishable__BWUMGsnLAQ2ELVyTBxhjA_NU3lMmo-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const [booksRes, categoriesRes] = await Promise.all([
    supabase.from('books').select('slug, id, updated_at').eq('status', 'published'),
    supabase.from('categories').select('slug').eq('status', 'active')
  ]);
  console.log("Books length:", booksRes.data?.length);
  console.log("Books Error:", booksRes.error);
  console.log("Categories length:", categoriesRes.data?.length);
  console.log("Categories error:", categoriesRes.error);
}
run();
