import { Menu, CircleUserRound } from "lucide-react"

export default function layout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-gray-300  bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Menu height={48} />
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-5 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center justify-between h-12 w-full">
            <p className="font-bold">Sltb Fleet App</p>
            <div>
              <CircleUserRound height={48} width={36} strokeWidth={1}/>
            </div>
          </div>
        </header>
        <main className="container p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </div>
    </div>
  )
}
