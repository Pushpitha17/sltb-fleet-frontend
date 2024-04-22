import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState, store } from "../store"
import { createClient } from "@/lib/supabase/client"
import _, { isEqual } from "lodash"

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

type TableFilters = {
  prefix: string
  model: string
  depot: string
}

type TableState = {
  tableData: TableRow[]
  loading: boolean
  error: string | null
  tableFilters: TableFilters
}

const initialState: TableState = {
  tableData: [],
  loading: false,
  error: null,
  tableFilters: {
    prefix: "1",
    model: "0",
    depot: "0"
  }
}

const fetchDataThunk = createAsyncThunk("table/fetchData", async () => {
  const state = store.getState().table.tableFilters
  console.log("Thunk Fires")
  console.log({ fetchDataFilters: state })
  const supabase = createClient()

  let match: {
    depotId?: number
    modelId?: number
    prefixId?: number
  } = {
    depotId: parseInt(state.depot),
    modelId: parseInt(state.model),
    prefixId: parseInt(state.prefix)
  }

  if (match.depotId == 0) delete match.depotId
  if (match.modelId == 0) delete match.modelId
  if (match.prefixId == 0) delete match.prefixId

  const { data, error } = await supabase
    .from("Bus")
    .select(
      `
      id,
      R_No,
      R_from,
      article_url,
      img_url,
      Model (name),
      Depot (name),
      Type (name),
      RegPrefix (prefix)
      `
    )
    .match(match)

  if (error) {
    console.log(error)
    return []
  }
  return data
})

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.tableFilters = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        state.loading = false
        state.tableData = action.payload
      })
      .addCase(fetchDataThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export { fetchDataThunk }

export default tableSlice.reducer

export const { setFilters } = tableSlice.actions

export const selectTableState = (state: RootState) => state.table
export const selectCurrentData = (state: RootState) => state.table.tableData
