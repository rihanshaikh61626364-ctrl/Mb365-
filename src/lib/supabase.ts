import { createClient } from '@supabase/supabase-js';

// Hardcoded keys added directly as requested
let supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://fgsiesdyaxpntduqtjht.supabase.co';
let supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__BWUMGsnLAQ2ELVyTBxhjA_NU3lMmo-';

// Clean strings (sometimes spaces get copied by mistake)
supabaseUrl = supabaseUrl.trim();
supabaseAnonKey = supabaseAnonKey.trim();

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

export let supabaseConnectionError = '';

if (!supabaseUrl) {
  supabaseConnectionError = 'VITE_SUPABASE_URL is missing.';
} else if (!isValidHttpUrl(supabaseUrl)) {
  supabaseConnectionError = `VITE_SUPABASE_URL is invalid (Check for missing https://): ${supabaseUrl}`;
} else if (!supabaseAnonKey) {
  supabaseConnectionError = 'VITE_SUPABASE_ANON_KEY is missing.';
}

// Lazy client setup to prevent crashing if the keys are missing or invalid
export const supabase = supabaseUrl && supabaseAnonKey && isValidHttpUrl(supabaseUrl)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
