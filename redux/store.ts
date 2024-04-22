import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { filterOptionsApi } from "./services/FilterOptions"
import tableReducer from "./slices/tableSlice";


export const store = configureStore({
  reducer: {
    table: tableReducer,
    [filterOptionsApi.reducerPath]: filterOptionsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filterOptionsApi.middleware)
})

// Infer the type of makeStore
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']