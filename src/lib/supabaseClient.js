import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clrlbzsobqdoemozlish.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmxienNvYnFkb2Vtb3psaXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MzY5MTgsImV4cCI6MjA1MDMxMjkxOH0.OzSUiFoHU565IHVYgQPj8F5ACdgsmTldmsP9D7x1mek';

export const supabase = createClient(supabaseUrl, supabaseKey);