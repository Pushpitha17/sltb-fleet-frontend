import { redirect } from 'next/navigation'
import TableControls from "./TableControls"
import DataTable from "./DataTable"

import supabaseServerClient from "@/lib/supabase/server"

export default async function PrivatePage({
  searchParams,
}: { searchParams: { [key : string]: string | string[] | undefined } }) {
  
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '10'

  const supabase = supabaseServerClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <>
      <div className="h-12"></div>
      <TableControls />
      <DataTable />
    </>
  )
}