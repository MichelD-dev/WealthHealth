import {createClient} from '@supabase/supabase-js'
import {Database} from '@/types/supabase'

/**
Module qui configure et exporte l'objet Supabase Client, qui est utilisé pour communiquer avec la base de données.
@module config/supabaseClient
*/
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_APP_ANON_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
