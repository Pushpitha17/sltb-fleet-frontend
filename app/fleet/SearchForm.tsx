"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { useDispatch, useSelector } from "react-redux"
import { setSearch, setTableShouldRender } from "@/redux/slices/tableSlice"
import { AppDispatch } from "@/redux/store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const formSchema = z.object({
  searchText: z.string()
})

function SearchForm() {
  const dispatch = useDispatch<AppDispatch>()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchText: ""
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(setSearch(values.searchText))
    dispatch(setTableShouldRender(true))
  }

  async function resetForm() {
    form.reset()
    onSubmit({ searchText: "" })
    dispatch(setTableShouldRender(false))
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
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Reg No. / Depot"
                        {...field}
                        className="w-full md:w-[320px]"
                      />
                      <X
                        className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground"
                        onClick={resetForm}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit" variant="outline">
              Search
            </Button>
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
