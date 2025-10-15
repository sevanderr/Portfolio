import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Gracefully handle missing environment variables
let supabase = null;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables not configured');
    console.warn('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your hosting platform');
    console.warn('The contact form will not work without these variables');
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized');
  }
} catch (error) {
  console.error('Failed to initialize Supabase:', error);
}

export { supabase };
