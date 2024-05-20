import { TypedSupabaseClient } from "@/lib/TypedSupabaseClient"
import { TableFilters } from "@/redux/slices/tableSlice"

export function getFilteredData(
  client: TypedSupabaseClient,
  filterValues: TableFilters
) {
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

  console.log({filterValues, match})

  return client
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
    .order("R_No", { ascending: true })
}
