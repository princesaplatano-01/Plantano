"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"

const IMAGES = [
  "/NEW IN/P_01.jpg",
  "/NEW IN/P_02.jpg",
  "/NEW IN/P_03.jpg",
  "/NEW IN/P_04.jpg",
  "/NEW IN/P_05.jpg",
  "/NEW IN/P_06.jpg",
  "/NEW IN/P_07.jpg",
  "/NEW IN/P_08.jpg",
  "/NEW IN/P_09.jpg",
  "/NEW IN/P_10.jpg",
  "/NEW IN/P_11.jpg",
]

const PRICES = [
  2000,
  2000,
  2000,
  2000,
  2000,
  2000,
  2000,
  2000,
  2000,
  2000,
  2000,
]

export default function NewInPage() {
  const router = useRouter()

    function ProductCard({ src, idx, total }: { src: string; idx: number; total: number }) {
    const nextIdx = (idx + 1) % total
    const prevIdx = (idx - 1 + total) % total
      const price = PRICES[idx] ?? PRICES[0]
      const priceLabel = `${price.toLocaleString()} MXN`

    return (
      <div className="bg-transparent">
        <div className="group relative">
          <div
            className="bg-muted overflow-hidden"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Link href={`/new-in/${idx + 1}`}>
              <img
                src={src}
                alt={`Product ${idx + 1}`}
                className="w-full h-full object-cover block"
                loading="lazy"
              />
            </Link>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push(`/new-in/${prevIdx + 1}`)
            }}
            aria-label="Previous"
            className="opacity-0 group-hover:opacity-100 transition absolute left-2 top-1/2 -translate-y-1/2 text-[#454545] rounded p-2"
          >
            ‹
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push(`/new-in/${nextIdx + 1}`)
            }}
            aria-label="Next"
            className="opacity-0 group-hover:opacity-100 transition absolute right-2 top-1/2 -translate-y-1/2 text-[#454545] rounded p-2"
          >
            ›
          </button>
        </div>

          <div className="mt-2 text-center text-sm">
          <div className="font-medium text-[#dbdbdb]">Product {idx + 1}</div>
          <div className="text-xs" style={{ color: "#909090" }}>{priceLabel}</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 py-12 px-4 md:px-8 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image
              src="/Front/PP-LOGO-LTTRNG-A-02.png"
              alt="NEW IN"
              width={192}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>

        <h1 className="text-xl md:text-2xl font-semibold mb-6 italic text-[#dbdbdb]">New In</h1>

        {/* Grid container: 4 columns on desktop, strict 3:4 aspect, 2px gaps */}
        <div className="-mx-4 md:-mx-8 px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-0.5 gap-y-2 scrollbar-hide">
            {IMAGES.map((src, idx) => (
              <ProductCard key={idx} src={src} idx={idx} total={IMAGES.length} />
            ))}
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
