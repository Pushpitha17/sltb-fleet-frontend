import {
  createApi,
  fetchBaseQuery,
  fakeBaseQuery
} from "@reduxjs/toolkit/query/react"
import { supabaseBaseQuery } from "@/lib/supabase/supabase-base-query"
import { Tables, Database } from "@/types/supabase"
import { createClient } from "@/lib/supabase/client"
import { PostgrestError } from "@supabase/supabase-js"

export type prefix = {
  id: string
  prefix: string
}

export type depot = {
  id: string
  name: string
}

export type model = {
  id: string
  name: string
}

type supabaseErrorType = { error: PostgrestError | null }

export const filterOptionsApi = createApi({
  reducerPath: "filterOptions",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getAllPrefixes: builder.query<Tables<"RegPrefix">[], void>({
      queryFn: async () => {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("RegPrefix")
          .select("id, prefix")

        if (error) {
          return { error: { status: 500, statusText: 'Internal Server Error', data: error } }
          // return { error }
        }
        return { data }
      }
    }),
    getAllDepots: builder.query<Tables<"Depot">[], void>({
      queryFn: async () => {
        const supabase = createClient()
        const { data, error } = await supabase.from("Depot").select("id, name")

        if (error) {
          return { error: { status: 500, statusText: 'Internal Server Error', data: error } }
        }
        return { data }
      }
    }),
    getAllModels: builder.query<Tables<"Model">[], void>({
      queryFn: async () => {
        const supabase = createClient()
        const { data, error } = await supabase.from("Model").select("id, name")

        if (error) {
          return { error: { status: 500, statusText: 'Internal Server Error', data: error } }
        }
        return { data }
      }
    })
    // getAllPrefixes: builder.query<prefix[], void>({
    //   query: () => "/prefixes",
    // }),
  })
})

export const {
  useGetAllPrefixesQuery,
  useGetAllDepotsQuery,
  useGetAllModelsQuery
} = filterOptionsApi
