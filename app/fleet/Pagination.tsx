import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectTableState,
  selectCurrentData,
  setTableData
} from "@/redux/slices/tableSlice"
import { getUnfilteredData } from "@/utils/fetchData"
import Image from "next/image"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

function Pagination() {
  const [pageLoading, setPageLoading] = useState(false)

  const dispatch = useDispatch()
  const page = useSelector(selectTableState).page
  const data = useSelector(selectCurrentData)

  const handleLoadMore = async () => {
    const supabase = createSupabaseBrowserClient()
    setPageLoading(true)
    const newData = await getUnfilteredData(supabase, page * 100)
    dispatch(setTableData([...data, ...newData]))
    setPageLoading(false)
  }

  return (
    <tfoot>
      <tr className="h-20">
        <td colSpan={6} className="text-center">
          <div className="w-full">
            <button
              className="bg-gray-300 text-black w-40 py-1 px-4 rounded hover:bg-gray-400 transition-colors duration-300"
              onClick={handleLoadMore}
            >
              {pageLoading ? (
                <div className="flex justify-center">
                  <Image
                    src="/Spinner.svg"
                    alt="Vercel Logo"
                    className="dark:invert"
                    width={24}
                    height={24}
                    priority
                  />
                </div>
              ) : (
                <>Load More Data</>
              )}
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}

export default Pagination
