export type Json =
  | string
  | number
  | boolean
  | null
  | Date
  | {[key: string]: Json}
  | Json[]

export interface Database {
  public: {
    Tables: {
      employees: {
        Row: {
          address: boolean
          birthdate: Date
          city: string | null
          created_at: string
          department:
            | 'Sales'
            | 'Marketing'
            | 'Engineering'
            | 'Human Ressources'
            | 'Legal'
          email: string
          employee_id: string
          firstname: string
          id: number
          lastname: string
          startdate: Date
          state: 'Alabama' | 'Ohio' | 'Montana'
          street: string | null
          zipcode: string | null
        }
        Insert: {
          address: boolean
          birthdate: Date
          city?: string | null
          created_at?: string
          department:
            | 'Sales'
            | 'Marketing'
            | 'Engineering'
            | 'Human Ressources'
            | 'Legal'
          email?: string
          employee_id?: string
          firstname?: string
          id?: number
          lastname?: string
          startdate: Date
          state?: 'Alabama' | 'Ohio' | 'Montana'
          street?: string | null
          zipcode?: string | null
        }
        Update: {
          address?: boolean
          birthdate?: Date
          city?: string | null
          created_at?: string
          department?:
            | 'Sales'
            | 'Marketing'
            | 'Engineering'
            | 'Human Ressources'
            | 'Legal'
          email?: string
          employee_id?: string
          firstname?: string
          id?: number
          lastname?: string
          startdate?: Date
          state?: 'Alabama' | 'Ohio' | 'Montana'
          street?: string | null
          zipcode?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
