"use client"
import TableFilterForm from "./TableFilterForm"
import { Card, Typography } from "../../UI/MaterialComponents"
import { useSelector } from "react-redux"
import { selectCurrentData } from "@/redux/slices/tableSlice"
import { TableRow } from "@/redux/slices/tableSlice"
import { renderPrefix } from "./TableFilterForm"

const TABLE_HEAD = ["R.No", "Depot", "Make and Model", "Type", "R.from", "More"]

export default function Fleet() {
  // const data = await getData()

  const data = useSelector(selectCurrentData)
  console.log([])

  // const data = []

  return (
    <>
      <div className="py-8 mx-auto w-full">
        <TableFilterForm />
        <div className="py-4">
          {data.length && (
            <Typography className="text-white">
              Found {data.length} Records.
            </Typography>
          )}
        </div>
        <div className="py-3">
          <Card className="bg-[#0c0a09] md:p-6 rounded h-[calc(100vh-150px)] md:h-[596px]">
            <div className="relative overflow-auto">
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
              </table>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
