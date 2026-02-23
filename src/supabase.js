import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ckldmnktufzpbieoacay.supabase.co'
const supabaseKey = 'sb_publishable_udp3VdOyZi6PN6nk650ixg_ei96dHuN'

export const supabase = createClient(supabaseUrl, supabaseKey)