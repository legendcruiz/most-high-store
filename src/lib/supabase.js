import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  'https://bvkufafzfrvischzcfzt.supabase.co'

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2a3VmYWZ6ZnJ2aXNjaHpjZnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxODg2NjUsImV4cCI6MjA5NDc2NDY2NX0.fhZ3zgDb_npmz2pjvCptPOytE8Sbtbgzjxx-t_qiNWw'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)