"use client"
import React from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"


function DataTable() {
  const handleChange = () => {}

  return (
    <>
      <div className="flex gap-6">
        <Input type="text" placeholder="Search" style={{ width: "300px" }} />
        <Select onValueChange={handleChange} defaultValue={"0"} value={"0"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue className="text-white " />
          </SelectTrigger>
          <SelectContent className="font-semibold">
            <SelectItem value={"0"}>Select Registration</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleChange} defaultValue={"0"} value={"0"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue className="text-white " />
          </SelectTrigger>
          <SelectContent className="font-semibold">
            <SelectItem value={"0"}>Select Depot</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="py-4">
        
      </div>
    </>
  )
}

export default DataTable
