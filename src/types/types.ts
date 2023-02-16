import {Database} from '@/types/supabase'

export type Employee = Database['public']['Tables']['employees']['Row']
