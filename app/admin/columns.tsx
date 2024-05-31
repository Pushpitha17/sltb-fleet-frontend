"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TableSchemaType } from "./data/schema"
import { DataTableRowActions } from "./data-table-row-actions"
import { TableHead } from "@/components/ui/table"

export const columns: ColumnDef<TableSchemaType>[] = [
  {
    accessorKey: "id",
    header: () => (
      <TableHead title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "prefix",
    header: ({ column }) => (
      <TableHead title="Prefix" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "R_No",
    header: ({ column }) => (
      <TableHead title="depot" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "depot",
    header: ({ column }) => (
      <TableHead title="depot" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <TableHead title="depot" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <TableHead title="depot" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <TableHead title="depot" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "R_from",
    header: ({ column }) => (
      <TableHead title="depot" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "article_url",
    header: ({ column }) => (
      <TableHead title="depot" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "img_url",
    header: ({ column }) => (
      <TableHead title="depot" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableHiding: true,
  },

 
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]