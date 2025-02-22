
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project values
const supabaseUrl = 'https://ftzvjgsxsehwkbzlxwwi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0enZqZ3N4c2Vod2tiemx4d3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMzM3NDEsImV4cCI6MjA1NTgwOTc0MX0.mv3kb2G5lmQeQRtcnic3LSjwwwCDg230LO5Q9Xfy96o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
