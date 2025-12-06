export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ItemStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD'
export type ItemCondition = 'New' | '9/10' | '8/10' | '7/10' | '6/10' | '5/10 or Below'
export type OrderStatus = 'PENDING_PAYMENT' | 'PAID_WAITING_CONFIRMATION' | 'COMPLETED' | 'CANCELLED'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          university: string
          is_verified_student: boolean
          payment_qr_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string | null
          university: string
          is_verified_student?: boolean
          payment_qr_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          university?: string
          is_verified_student?: boolean
          payment_qr_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      items: {
        Row: {
          id: string
          seller_id: string
          title: string
          description: string
          price: number
          images: string[]
          condition: ItemCondition
          category: string
          university_location: string
          status: ItemStatus
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          title: string
          description: string
          price: number
          images: string[]
          condition: ItemCondition
          category: string
          university_location: string
          status?: ItemStatus
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          seller_id?: string
          title?: string
          description?: string
          price?: number
          images?: string[]
          condition?: ItemCondition
          category?: string
          university_location?: string
          status?: ItemStatus
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          item_id: string
          asker_id: string | null
          content: string
          reply: string | null
          is_public: boolean
          created_at: string
          replied_at: string | null
        }
        Insert: {
          id?: string
          item_id: string
          asker_id?: string | null
          content: string
          reply?: string | null
          is_public?: boolean
          created_at?: string
          replied_at?: string | null
        }
        Update: {
          id?: string
          item_id?: string
          asker_id?: string | null
          content?: string
          reply?: string | null
          is_public?: boolean
          created_at?: string
          replied_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          buyer_id: string
          seller_id: string
          item_id: string
          status: OrderStatus
          payment_proof_url: string | null
          created_at: string
          confirmed_at: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          buyer_id: string
          seller_id: string
          item_id: string
          status?: OrderStatus
          payment_proof_url?: string | null
          created_at?: string
          confirmed_at?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          buyer_id?: string
          seller_id?: string
          item_id?: string
          status?: OrderStatus
          payment_proof_url?: string | null
          created_at?: string
          confirmed_at?: string | null
          completed_at?: string | null
        }
      }
    }
  }
}

