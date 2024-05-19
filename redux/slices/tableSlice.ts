"use client"
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
export type TableRow = {
  id: number
  R_No?: number
  Depot?: { name: any }[]
  Model?: { name: any }[]
  Type?: { name: any }[]
  R_from?: string
  img_url?: string
  articl_url?: string
  RegPrefix?: { prefix: any }[]
}

export type TableFilters = {
  prefix: string
  model: string
  depot: string
}

type TableState = {
  tableData: TableRow[]
  loading: boolean
  error: string | null
  tableFilters: TableFilters
  search: string
  pagination: boolean
  page: number
}

const initialState: TableState = {
  tableData: [],
  loading: true,
  error: null,
  tableFilters: {
    prefix: "0",
    model: "0",
    depot: "0"
  },
  search: "",
  pagination: false,
  page: 1
}

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.tableFilters = action.payload
    },
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    clearFilters: (state) => {
      state.tableFilters = { prefix: "0", model: "0", depot: "0" }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setPagination: (state, action) => {
      state.pagination = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    }
  }
})

export default tableSlice.reducer

export const {
  setFilters,
  setTableData,
  clearFilters,
  setLoading,
  setPage,
  setPagination,
  setSearch
} = tableSlice.actions

export const selectTableState = (state: RootState) => state.table
export const selectFilters = (state: RootState) => state.table.tableFilters
export const selectCurrentData = (state: RootState) => state.table.tableData
