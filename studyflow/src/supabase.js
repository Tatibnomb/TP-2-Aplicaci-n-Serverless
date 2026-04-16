import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vldewhwtwrmxgaxrrpqe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsZGV3aHd0d3JteGdheHJycHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTM0NTEsImV4cCI6MjA5MTkyOTQ1MX0.8M4TCYHb3JrTZYny47bWeYA3Kw9kz_VHrQ5H3XWVjB0'

export const supabase = createClient(supabaseUrl, supabaseKey)