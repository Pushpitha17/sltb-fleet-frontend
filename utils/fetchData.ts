import { TableFilters } from "@/redux/slices/tableSlice"
import { SupabaseClient } from "@supabase/supabase-js"

export const getAllPrefixes = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.from("RegPrefix").select("id, prefix")
  if (error) {
    return []
  }
  return data
}

export const getAllDepots = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from("Depot")
    .select("id, name")
    .order("name", { ascending: true })
  if (error) {
    return []
  }
  return data
}
export const getAllModels = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.from("Model").select("id, name")
  if (error) {
    return []
  }
  return data
}

export const getUnfilteredData = async (
  supabase: SupabaseClient,
  offset: number
) => {
  const { data, error } = await supabase
    .from("Bus")
    .select(
      `
    id,
    R_No,
    R_from,
    article_url,
    img_url,
    Model (name),
    Depot (name),
    Type (name),
    RegPrefix (prefix)
    `
    )
    .order("prefixId", { ascending: true })
    .order("R_No", { ascending: true })
    .limit(100)
    .range(offset, offset + 100)
  if (error) {
    console.log(error)
    return []
  }
  return data
}

export const getFilteredData = async (
  supabase: SupabaseClient,
  filterValues: TableFilters
) => {
  let match: {
    depotId?: number
    modelId?: number
    prefixId?: number
  } = {
    depotId: parseInt(filterValues.depot),
    modelId: parseInt(filterValues.model),
    prefixId: parseInt(filterValues.prefix)
  }

  if (match.depotId == 0) delete match.depotId
  if (match.modelId == 0) delete match.modelId
  if (match.prefixId == 0) delete match.prefixId

  const { data, error } = await supabase
    .from("Bus")
    .select(
      `
      id,
      R_No,
      R_from,
      article_url,
      img_url,
      Model (name),
      Depot (name),
      Type (name),
      RegPrefix (prefix)
      `
    )
    .match(match)

  if (error) {
    console.log(error)
    return []
  }
  return data
}
