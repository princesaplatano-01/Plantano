"use client"

import { Header } from "@/components/header"

// Use images stored in public/SC26 for the masonry gallery
const SC26_IMAGES = [
  "/SC26/IMG_3201.jpg",
  "/SC26/gif collar.gif",
  "/SC26/IMG_3202.jpg",
  "/SC26/IMG_3232.jpg",
]

export default function S26Page() {
  const allImages = SC26_IMAGES

  return (
    <>
      <Header />
      <main className="min-h-screen pt-12 py-12 px-4 md:px-8 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/Front/PP-LOGO-LTTRNG-A-02.png" alt="S26" width={192} height={50} className="object-contain" />
          </div>

          <h1 className="text-xl md:text-2xl font-semibold mb-6 italic text-[#dbdbdb] text-center">S26 Collection</h1>

          <section className="columns-1 gap-4">
            {allImages.map((src, i) => (
              <div key={i} style={{ breakInside: 'avoid' }} className="mb-4">
                <div className="mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative">
                  <img src={src} alt={`S26 ${i + 1}`} className="w-full h-auto rounded" loading="lazy" />

                  {/* coliflow overlay removed */}

                  {src === "/SC26/gif collar.gif" && (
                    <img
                      src="/SC26/PP-LOGO-STKR-01 copy.png"
                      alt="pp logo"
                      className="absolute bottom-0 left-0 w-36 md:w-48 pointer-events-none z-10"
                      style={{ transform: 'translateY(50%) translateX(-100px) rotate(-30deg)' }}
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  )
}
