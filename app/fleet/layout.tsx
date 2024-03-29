import Image from 'next/image'


export default function FleetPageLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="container py-12 mx-auto">
      <div className="flex justify-center">
        <Image src="/img/Banner.png" alt="banner" width={500} height={200}/>
      </div>
      <div className="">
        {children}
      </div>
    </div>
  )
}