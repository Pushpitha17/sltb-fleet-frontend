"use client"
import { renderPrefix } from "./TableFilterForm"
import { Card, Typography } from "../../UI/MaterialComponents"
import { useSelector } from "react-redux"
import { TableRow, selectCurrentData } from "@/redux/slices/tableSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { setTableData } from "@/redux/slices/tableSlice"

const TABLE_HEAD = ["R.No", "Depot", "Make and Model", "Type", "R.from", "More"]

function Table({ initialData }: { initialData: TableRow[] }) {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(setTableData(initialData))
  },[])

  const data = useSelector(selectCurrentData)

  return (
    <>
      <div className="py-4">
        <Typography className="text-white">
          Found {data.length} Records.
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
                          <Typography variant="small" className="font-normal">
                            Show Image
                          </Typography>
                        </a>
                      )}
                      {r.article_url && (
                        <a href={r.article_url} target="_blank">
                          <Typography variant="small" className="font-normal">
                            Read Article
                          </Typography>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6} className="text-center">
                    <div className="w-full">
                      <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300">
                        Load More Data
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Table
