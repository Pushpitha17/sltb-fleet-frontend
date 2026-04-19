import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectTableState,
  selectCurrentData,
  setTableData,
  setPage
} from "@/redux/slices/tableSlice"
import { getUnfilteredData } from "@/utils/fetchData"
import Image from "next/image"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

function Pagination() {
  const [pageLoading, setPageLoading] = useState(false)
  const sentinelRef = useRef<HTMLTableRowElement>(null)

  const dispatch = useDispatch()
  const page = useSelector(selectTableState).page
  const data = useSelector(selectCurrentData)

  const handleLoadMore = async () => {
    if (pageLoading) return
    const supabase = createSupabaseBrowserClient()
    setPageLoading(true)
    const newData = await getUnfilteredData(supabase, page * 100)
    dispatch(setTableData([...data, ...newData]))
    dispatch(setPage(page + 1))
    setPageLoading(false)
  }

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const scrollContainer = sentinel.closest(".overflow-auto")
    if (!scrollContainer) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !pageLoading) {
          handleLoadMore()
        }
      },
      {
        root: scrollContainer,
        rootMargin: "0px 0px 5000px 0px",
        threshold: 0,
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [page, pageLoading, data])

  return (
    <tfoot>
      {pageLoading && (
        <tr>
          <td colSpan={6} className="py-4">
            <div className="flex justify-center items-center gap-2">
              <Image
                src="/Spinner-white.svg"
                alt="loading more"
                width={28}
                height={28}
                priority
              />
              <span className="text-gray-400 text-sm">Loading more...</span>
            </div>
          </td>
        </tr>
      )}
      <tr ref={sentinelRef} />
    </tfoot>
  )
}

export default Pagination