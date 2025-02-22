
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project values
const supabaseUrl = 'https://YOUR_PROJECT_URL.supabase.co';
const supabaseAnonKey = 'YOUR_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
