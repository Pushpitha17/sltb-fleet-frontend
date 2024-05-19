import { TypedSupabaseClient } from "@/lib/TypedSupabaseClient"
import { TableFilters } from "@/redux/slices/tableSlice"

export async function getSearch(
  client: TypedSupabaseClient,
  filterValues: TableFilters,
  searchText: string
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

  console.log({ filterValues, match, searchText })

  const matchedItems = []

  if (searchText == "") {
    const matches = await client
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

    return matches.data
  }

  const regNoMatches = await client
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
    .textSearch("R_No", searchText)

  if (regNoMatches?.data) {
    matchedItems.push(...regNoMatches.data)
  }
  console.log({ regNoMatches })

  if (!match.depotId) {
    const depotMatches = await client
      .from("Depot")
      .select(` id`)
      .textSearch("name", `${searchText}:*`)

    console.log({ depotMatches })
    if (depotMatches?.data) {
      for (const depot of depotMatches.data) {
        const depotItems = await client
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
          .match({ ...match, depotId: depot.id })
        if (depotItems?.data) {
          matchedItems.push(...depotItems.data)
        }
      }
    }
  }

  return matchedItems
}
