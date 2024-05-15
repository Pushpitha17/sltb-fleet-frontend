import TableFilterForm from "./TableFilterForm"
import { Typography } from "../../UI/MaterialComponents"
import Table from "./Table"
import { createClient } from "@/lib/supabase/server"
import { getAllPrefixes, getAllDepots, getAllModels , getUnfilteredData} from "@/utils/fetchData"
import SearchForm from "./SearchForm"

export default async function Fleet() {
  // const data = await getData()
  const supabase = createClient()
  const [prefixes, depots, models, initialData] = await Promise.all([
    getAllPrefixes(supabase),
    getAllDepots(supabase),
    getAllModels(supabase),
    getUnfilteredData(supabase, 0)
  ])

  // await new Promise((resolve) => setTimeout(resolve, 3000))

  // const data = []

  return (
    <>
      <div className="py-8 mx-auto w-full">
        <SearchForm />
        <TableFilterForm prefixes={prefixes} depots={depots} models={models} />
        <Table initialData={initialData} />
      </div>
    </>
  )
}
