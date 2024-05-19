"use client"
import { renderPrefix } from "./TableFilterForm"
import { Card, Typography } from "../../UI/MaterialComponents"
import {
  selectCurrentData,
  selectTableState,
  setPagination,
  setPage
} from "@/redux/slices/tableSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { setTableData, setLoading } from "@/redux/slices/tableSlice"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { getUnfilteredData } from "@/utils/fetchData"
import { getSearch } from "@/lib/queries/text-search"
import Pagination from "./Pagination"
import Image from "next/image"

const TABLE_HEAD = ["R.No", "Depot", "Make and Model", "Type", "R.from", "More"]

function Table({ count }: { count: number | null }) {
  const dispatch = useDispatch<AppDispatch>()

  const data = useSelector(selectCurrentData)
  const loading = useSelector(selectTableState).loading
  const pagination = useSelector(selectTableState).pagination
  const search = useSelector(selectTableState).search
  const filters = useSelector(selectTableState).tableFilters

  useEffect(() => {
    ;(async () => {
      const supabase = createSupabaseBrowserClient()
      dispatch(setLoading(true))

      if (
        search === "" &&
        filters.prefix === "0" &&
        filters.model === "0" &&
        filters.depot === "0"
      ) {
        const data = await getUnfilteredData(supabase, 0)
        dispatch(setTableData(data))
        dispatch(setLoading(false))
        dispatch(setPagination(true))
        dispatch(setPage(1))
      } else {
        dispatch(setPagination(false))
        const data = await getSearch(supabase, filters, search)
        dispatch(setTableData(data))
        dispatch(setLoading(false))
      }
    })()
  }, [search, filters])

  // console.log("Re render table", data)

  return (
    <>
      <div className="py-4 mt-4 md:mt-6">
        <Typography className="text-white font-semibold pl-3">
          {!loading ? (
            pagination ? (
              `Showing  ${data.length} from ${count} Records.`
            ) : (
              `Found ${data.length} Records.`
            )
          ) : (
            <></>
          )}
        </Typography>
      </div>
      <div className="py-3">
        <Card className="bg-[#0c0a09] md:p-6 rounded h-[calc(100vh-150px)] md:h-[596px]">
          <div className="overflow-auto">
            <table className="table-auto text-left text-gray-50  w-max md:w-full relative">
              <thead className="sticky top-0 bg-[#0c0a09] drop-shadow border-b ">
                <tr className="">
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="p-4">
                      <Typography
                        variant="small"
                        className="leading-none font-semibold	 text-md"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-xs md:text-base">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="h-96">
                      <div className="grid place-items-center">
                        <Image
                          src="/Spinner-white.svg"
                          alt="Vercel Logo"
                          className="dark:invert"
                          width={72}
                          height={72}
                          priority
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {data.map((r: any) => (
                      <tr
                        key={r.id}
                        className="border-b-[1px] border-gray-700  text-gray-400"
                      >
                        <td className="p-4">
                          <Typography variant="small" className="font-normal">
                            {renderPrefix(r.RegPrefix?.prefix)} {r.R_No}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" className="font-normal">
                            {r.Depot?.name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" className="font-normal">
                            {r.Model?.name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" className="font-normal">
                            {r.Type.name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" className="font-normal">
                            {r.R_from}
                          </Typography>
                        </td>
                        <td className="p-4">
                          {r.img_url && (
                            <a href={r.img_url} target="_blank">
                              <Typography
                                variant="small"
                                className="font-normal"
                              >
                                Show Image
                              </Typography>
                            </a>
                          )}
                          {r.article_url && (
                            <a href={r.article_url} target="_blank">
                              <Typography
                                variant="small"
                                className="font-normal"
                              >
                                Read Article
                              </Typography>
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>

              {!loading && pagination ? <Pagination /> : null}
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Table
