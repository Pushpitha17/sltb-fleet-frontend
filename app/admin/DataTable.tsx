import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

function DataTable() {
  const rows = [
    {
      id: 101,
      prefix: "22",
      R_No: "1067",
      depot: "CMB",
      model: "Ashok Leyland",
      type: "B+",
      R_from: "EMB",
      article_url: "https://www.google.com",
      img_url: "https://www.google.com"
    },
    {
      id: 101,
      prefix: "22",
      R_No: "1067",
      depot: "CMB",
      model: "Ashok Leyland",
      type: "B+",
      R_from: "EMB",
      article_url: "https://www.google.com",
      img_url: "https://www.google.com"
    },
    {
      id: 101,
      prefix: "22",
      R_No: "1067",
      depot: "CMB",
      model: "Ashok Leyland",
      type: "B+",
      R_from: "EMB",
      article_url: "https://www.google.com",
      img_url: "https://www.google.com"
    }
  ]

  return (
    <Table className="border-4">
      <TableCaption>Sltb Fleet Data Management</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Reg Prefix</TableHead>
          <TableHead>Reg No.</TableHead>
          <TableHead className="text-center">Depot</TableHead>
          <TableHead className="text-center">Model</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Received</TableHead>
          <TableHead className="text-center">Image</TableHead>
          <TableHead className="text-center">Article</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell>{row.prefix}</TableCell>
            <TableCell>{row.R_No}</TableCell>
            <TableCell className="text-right">{row.depot}</TableCell>
            <TableCell className="text-right">{row.model}</TableCell>
            <TableCell className="text-right">{row.type}</TableCell>
            <TableCell className="text-right">{row.R_from}</TableCell>
            <TableCell className="text-right">{row.article_url}</TableCell>
            <TableCell className="text-right">{row.img_url}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
  )
}

export default DataTable
