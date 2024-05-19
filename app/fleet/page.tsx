import TableFilterForm from "./TableFilterForm"
import Table from "./Table"
import supabaseServerClient from "@/lib/supabase/server"
import {
  getAllPrefixes,
  getAllDepots,
  getAllModels,
  getRowCount
} from "@/utils/fetchData"
import SearchForm from "./SearchForm"

export default async function Fleet() {
  const supabase = supabaseServerClient()
  const [prefixes, depots, models, count] = await Promise.all([
    getAllPrefixes(supabase),
    getAllDepots(supabase),
    getAllModels(supabase),
    getRowCount(supabase)
  ])

  return (
    <>
      <div className="py-8 mx-auto w-full">
        <div className="py-3 bg-black px-3 rounded-md">
          <SearchForm />
          <TableFilterForm
            prefixes={prefixes}
            depots={depots}
            models={models}
          />
        </div>
        <Table count={count} />
      </div>
    </>
  )
}
