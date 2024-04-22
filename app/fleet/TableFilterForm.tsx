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
import { useDispatch } from "react-redux"
import { fetchDataThunk, setFilters } from "@/redux/slices/tableSlice"
import { AppDispatch } from "@/redux/store"

type FilterFormValues = {
  prefix?: number
  depot?: number
  moodel?: number
}

const formSchema = z.object({
  prefix: z.string(),
  depot: z.string(),
  model: z.string()
})

function TableFilterForm() {
  const { data: prefixes, isLoading: isLoadingPrifix } =
    useGetAllPrefixesQuery()
  const { data: depots, isLoading: isLoadingDepots } = useGetAllDepotsQuery()
  const { data: models, isLoading: isLoadingModels } = useGetAllModelsQuery()
  console.log(prefixes, depots)

  const dispatch = useDispatch<AppDispatch>()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prefix: "1",
      model: "0",
      depot: "0"
    }
  })

  console.log(form.watch("prefix"))

  const values = useWatch({ control: form.control })

  useEffect(() => {
    console.log(form.getValues())
    dispatch(setFilters(form.getValues()))
    dispatch(fetchDataThunk())
  }, [values])

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:space-y-8">
          <div className="flex gap-x-4 md:gap-x-24 gap-y-4 md:px-6 text-white flex-wrap">
            <FormField
              control={form.control}
              name="prefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Registration</FormLabel>
                  <FormControl>
                    <div className="text-white  ">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"1"}
                        value={field.value.toString()}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue className="text-white " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"0"} disabled={values.depot == "0" && values.model == "0"}>All</SelectItem>
                          {!isLoadingPrifix &&
                            prefixes?.map((prefix, i) => (
                              <SelectItem value={prefix.id.toString()} key={i}>
                                {renderPrefix(prefix.prefix)}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="depot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Depot</FormLabel>
                  <FormControl>
                    <div className="text-white  ">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"0"}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue className="text-white " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"0"}>All Depots</SelectItem>
                          {!isLoadingDepots &&
                            depots?.map((depot, i) => (
                              <SelectItem value={depot.id.toString()} key={i}>
                                {depot.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Make and Model
                  </FormLabel>
                  <FormControl>
                    <div className="text-white  ">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"0"}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[320px]">
                          <SelectValue className="text-white " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"0"}>All Models</SelectItem>
                          {!isLoadingModels &&
                            models?.map((depot, i) => (
                              <SelectItem value={depot.id.toString()} key={i}>
                                {depot.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TableFilterForm

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
