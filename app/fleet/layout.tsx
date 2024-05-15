import Image from "next/image"

export default function FleetPageLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="">
      <div className=" bg-[url('/img/CTB_background.jpg')] max-w-svw min-h-screen">
      <div className="container py-12">
        <div className="flex justify-center ">
          <img src="/img/Banner.png" alt="banner" width={875} height={350} className="md:px-4 w-full md:px-0 md:w-[875px]"/>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
    </div>
    
  )
}
