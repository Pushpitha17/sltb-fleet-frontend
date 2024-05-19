import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from "@/types/supabase"


export type TypedSupabaseClient = SupabaseClient<Database>