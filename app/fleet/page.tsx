import TableFilterForm from "../../Components/TableFilterForm"
import { Card, Typography } from "../../UI/MaterialComponents"

const TABLE_HEAD = ["R.No", "Depot", "Make and Model", "Type", "R.from", "More"]

async function getData() {
  const res = await fetch("http://localhost:8080/bus/prefix/1")
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Fleet() {
  const data = await getData()
  console.log(data[0])

  return (
    <>
      <div className="container py-8 mx-auto">
        <TableFilterForm />
        <Card className="bg-[#0c0a09] p-6 rounded">
          <table className="w-full min-w-max table-auto text-left text-gray-50">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 p-4">
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
            <tbody>
              {data.map((r: any) => (
                <tr
                  key={r.id}
                  className="border-b-[1px] border-gray-700  text-gray-400"
                >
                  <td className="p-4">
                    <Typography variant="small" className="font-normal">
                      {r.Reg}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" className="font-normal">
                      {r.depot}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" className="font-normal">
                      {r.model}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" className="font-normal">
                      {r.type}
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
                    {r.articl_url && (
                      <a href={r.articl_url} target="_blank">
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
        </Card>
      </div>
    </>
  )
}
