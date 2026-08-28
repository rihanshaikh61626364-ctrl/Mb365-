const { createClient } = require('@supabase/supabase-js');
const url = 'https://fgsiesdyaxpntduqtjht.supabase.co';
// Need the service role key to bypass rate limits or just disable email confirmation via api if possible.
// Or we can just insert the user via SQL if we have execute sql access. But we don't have db password.
