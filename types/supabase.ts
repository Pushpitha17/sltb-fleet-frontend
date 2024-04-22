export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Bus: {
        Row: {
          articl_url: string | null
          createdAt: string | null
          depotId: number | null
          id: number
          img_url: string | null
          modelId: number | null
          prefixId: number | null
          R_from: string | null
          R_No: number | null
          typeId: number | null
          updateddAt: string | null
        }
        Insert: {
          articl_url?: string | null
          createdAt?: string | null
          depotId?: number | null
          id: number
          img_url?: string | null
          modelId?: number | null
          prefixId?: number | null
          R_from?: string | null
          R_No?: number | null
          typeId?: number | null
          updateddAt?: string | null
        }
        Update: {
          articl_url?: string | null
          createdAt?: string | null
          depotId?: number | null
          id?: number
          img_url?: string | null
          modelId?: number | null
          prefixId?: number | null
          R_from?: string | null
          R_No?: number | null
          typeId?: number | null
          updateddAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Bus_depotId_fkey"
            columns: ["depotId"]
            isOneToOne: false
            referencedRelation: "Depot"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Bus_modelId_fkey"
            columns: ["modelId"]
            isOneToOne: false
            referencedRelation: "Model"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Bus_prefixId_fkey"
            columns: ["prefixId"]
            isOneToOne: false
            referencedRelation: "RegPrefix"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Bus_typeId_fkey"
            columns: ["typeId"]
            isOneToOne: false
            referencedRelation: "Type"
            referencedColumns: ["id"]
          },
        ]
      }
      Depot: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Model: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      RegPrefix: {
        Row: {
          id: number
          prefix: string
        }
        Insert: {
          id: number
          prefix: string
        }
        Update: {
          id?: number
          prefix?: string
        }
        Relationships: []
      }
      Type: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
