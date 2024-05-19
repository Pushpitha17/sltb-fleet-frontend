"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { useDispatch } from "react-redux"
import { clearFilters, setFilters } from "@/redux/slices/tableSlice"
import { AppDispatch } from "@/redux/store"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"

type prefix = {
  id: string
  prefix: string
}

type depot = {
  id: string
  name: string
}

type model = {
  id: string
  name: string
}

const formSchema = z.object({
  prefix: z.string(),
  depot: z.string(),
  model: z.string()
})

function TableFilterForm({
  prefixes,
  depots,
  models
}: {
  prefixes: prefix[]
  depots: depot[]
  models: model[]
}) {
  const dispatch = useDispatch<AppDispatch>()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prefix: "0",
      model: "0",
      depot: "0"
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(setFilters(values))
  }

  function clearForm() {
    form.reset()
    dispatch(clearFilters())
  }

  return (
    <div className="">
      <Accordion
        type="single"
        collapsible
        className="w-full`"
        defaultValue=""
      >
        <AccordionItem value="filters" className="border-none">
          <AccordionTrigger className="text-white pr-6">
            <div className="flex justify-between w-full align-items">
              <div className="flex space-x-4 align-items md:px-6 text-white text-lg font-bold">
                <h2>Filters</h2>
                <Filter />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <div className="md:px-6">
                <form className="md:space-y-8">
                  <div className="flex gap-x-4 md:gap-x-24 gap-y-4 text-white flex-wrap">
                    <FormField
                      control={form.control}
                      name="prefix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Registration
                          </FormLabel>
                          <FormControl>
                            <div className="text-white  ">
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={"0"}
                                value={field.value}
                              >
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue className="text-white " />
                                </SelectTrigger>
                                <SelectContent className="font-semibold">
                                  <SelectItem value={"0"}>All</SelectItem>
                                  {prefixes?.map((prefix, i) => (
                                    <SelectItem
                                      value={prefix.id.toString()}
                                      key={i}
                                    >
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
                            <div className="text-white">
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={"0"}
                                value={field.value}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue className="text-white" />
                                </SelectTrigger>
                                <SelectContent className="font-semibold">
                                  <SelectItem value={"0"}>
                                    All Depots
                                  </SelectItem>
                                  {depots?.map((depot, i) => (
                                    <SelectItem
                                      value={depot.id.toString()}
                                      key={i}
                                    >
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
                                <SelectTrigger className="w-80vw md:w-[320px] ">
                                  <SelectValue className="text-white " />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value={"0"}>
                                    All Models
                                  </SelectItem>
                                  {models?.map((model, i) => (
                                    <SelectItem
                                      value={model.id.toString()}
                                      key={i}
                                    >
                                      {model.name}
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
                <div className="flex align-items space-x-4 pt-8">
                  <Button
                    variant="outline"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Apply filters
                  </Button>
                  <Button
                    className="text-white border border-slate-500	 bg-transparent"
                    onClick={clearForm}
                  >
                    {" "}
                    <X /> Clear filters
                  </Button>
                </div>
              </div>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
