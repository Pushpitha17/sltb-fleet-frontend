"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  return (
    <div className="flex gap-2">
      <Button onClick={() => console.log("Edit")}>
        <Pencil />
      </Button>
      <Button onClick={() => console.log("Delete")}>
        <Trash />
      </Button>
    </div>
  )
}
