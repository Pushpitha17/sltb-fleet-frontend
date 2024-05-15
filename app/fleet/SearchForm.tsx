"use client"
// import { Select, Option } from "../UI/MaterialComponents"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  useGetAllPrefixesQuery,
  prefix,
  useGetAllDepotsQuery,
  useGetAllModelsQuery
} from "../../redux/services/FilterOptions"
import { useDispatch, useSelector } from "react-redux"
import { fetchDataThunk, setFilters } from "@/redux/slices/tableSlice"
import { AppDispatch } from "@/redux/store"
import { selectFilters } from "@/redux/slices/tableSlice"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type FilterFormValues = {
  searchText?: string
}

const formSchema = z.object({
  searchText: z.string()
})

function SearchForm() {
  const dispatch = useDispatch<AppDispatch>()
  const filterValues = useSelector(selectFilters)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchText: ""
    }
  })

  const values = useWatch({ control: form.control })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="py-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-4">
          <div className="flex gap-x-4 md:gap-x-24 gap-y-4 md:px-6 text-white flex-wrap">
            <FormField
              control={form.control}
              name="searchText"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Search</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Registration..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit" variant="outline">Search</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SearchForm

// Function to edit the prefix
export function renderPrefix(prefix: string) {
  const values = ["22", "23", "29", "30", "60"]

  if (values.includes(prefix)) {
    // Edit the prefix here
    return prefix + " ශ්‍රී " // Change this line to set the new prefix value
  } else {
    return prefix + " - "
  }
}
