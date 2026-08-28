import { createClient } from '@supabase/supabase-js';

let supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// Automatically sanitize the URL if the user accidentally pasted the REST endpoint instead of the project URL
if (supabaseUrl.endsWith('/rest/v1/')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
} else if (supabaseUrl.endsWith('/rest/v1')) {
  supabaseUrl = supabaseUrl.replace('/rest/v1', '');
}

// Check if the URL is a valid HTTP or HTTPS URL
const isValidHttpUrl = (url: string) => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

// Lazy client setup to prevent crashing if the keys are missing or invalid
export const supabase = supabaseUrl && supabaseAnonKey && isValidHttpUrl(supabaseUrl)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
