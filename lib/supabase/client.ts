import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'
import type { TypedSupabaseClient } from '@/lib/TypedSupabaseClient'
import { useMemo } from 'react'

let client: TypedSupabaseClient | undefined

function createSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

function useSupabaseBrowser() {
  return useMemo(createSupabaseBrowserClient, [])
}

export default useSupabaseBrowser
export { createSupabaseBrowserClient }