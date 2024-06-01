import Image from "next/image"
import { sanityClient } from "@/lib/sanity/client"
import { urlForImage } from "@/lib/sanity/image"
import { PortableText, PortableTextComponents } from "next-sanity"
import Link from "next/link"

const components: PortableTextComponents = {
  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    em: ({ children }) => (
      <em className="text-gray-600 font-semibold">{children}</em>
    ),

    // Ex. 2: rendering a custom `link` annotation
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined
      return (
        <a href={value?.href} target={target}>
          {children}
        </a>
      )
    }
  }
}
export default async function Home() {
  const post = (
    await sanityClient.fetch(`*[_id== "c37e4abf-91f5-4ba4-8534-a1d0ce69fa4e"]{
      title,
      mainImage,
      author->,
      body
    }`)
  )[0]

  return (
    <main className=" bg-[url('/img/CTB_background.jpg')] max-w-svw min-h-screen">
      <div className="container py-12">
        <div className="flex justify-center ">
          <img
            src="/img/Banner.png"
            alt="banner"
            width={875}
            height={350}
            className="md:px-4 w-full md:px-0 md:w-[875px]"
          />
        </div>
        <div className="bg-[#141414]  p-3 md:p-6 rounded-lg mt-10 flex flex-col items-center ">
          <div className="max-w-[900px] flex flex-col items-center">
            <h2 className="text-red-800 font-semibold md:text-2xl md:text-center block text-base">
              {post.title}
            </h2>
            <div className="my-6 flex justify-center">
              <Image
                src={urlForImage(post.mainImage)}
                alt="Image"
                height={500}
                width={800}
                className="rounded-md"
              ></Image>
            </div>
            <div>
              <Link href="/fleet" target="_blank">
                <button className=" my-6 bg-orange-700 text-white  font-semibold px-6 py-2 rounded-md">
                  Browse Fleet {">"}
                </button>
              </Link>
            </div>
            <div className="my-6 text-white prose prose-a:text-orange-700 prose-p:md:text-justify prose-strong:text-white ">
              <PortableText value={post.body} components={components} />
            </div>
            <div className="w-full">
              <p className="text-white">
                Posted By :{" "}
                <a
                  target="_blank"
                  href={post.author?.profile}
                  className="text-orange-700"
                >
                  {post.author?.name}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
