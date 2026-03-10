"use client"

import { Header } from "@/components/header"
import { IMAGES } from "@/lib/products"

export default function S26Page() {
  const allImages = IMAGES.flatMap((it) => (Array.isArray(it) ? it : [it]))

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 py-12 px-4 md:px-8 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/Front/PP-LOGO-LTTRNG-A-02.png" alt="S26" width={192} height={50} className="object-contain" />
          </div>

          <h1 className="text-xl md:text-2xl font-semibold mb-6 italic text-[#dbdbdb]">S26 Collection</h1>

          <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {allImages.map((src, i) => (
              <div key={i} style={{ breakInside: 'avoid' }} className="mb-4">
                <img src={src} alt={`S26 ${i + 1}`} className="w-full h-auto rounded" />
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  )
}
