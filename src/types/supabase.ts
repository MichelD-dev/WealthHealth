export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json}
  | Json[]

export interface Database {
  public: {
    Tables: {
      employees: {
        Row: {
          address: boolean
          birthdate: string
          city: string | null
          created_at: string
          department: string
          email: string
          employee_id: string
          firstname: string
          id: number
          lastname: string
          startdate: string
          state: string | null
          street: string | null
          zipcode: string | null
        }
        Insert: {
          address: boolean
          birthdate: string
          city?: string | null
          created_at?: string
          department: string
          email?: string
          employee_id?: string
          firstname?: string
          id?: number
          lastname?: string
          startdate: string
          state?: string | null
          street?: string | null
          zipcode?: string | null
        }
        Update: {
          address?: boolean
          birthdate?: string
          city?: string | null
          created_at?: string
          department?: string
          email?: string
          employee_id?: string
          firstname?: string
          id?: number
          lastname?: string
          startdate?: string
          state?: string | null
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
