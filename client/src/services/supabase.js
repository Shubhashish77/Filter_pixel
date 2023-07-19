
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.REACT_APP_SUPABASEURL;
const supabaseKey = process.env.React_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;