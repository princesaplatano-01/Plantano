"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { useState, useEffect } from "react"

import { IMAGES, PRICES, SOLD } from "@/lib/products"
import { useTranslation } from "@/lib/translations"

export default function NewInPage() {
  const router = useRouter()
  const cardAspect = "3 / 4"

  function ProductCard({ item, idx, total }: { item: string | string[]; idx: number; total: number }) {
    const { t } = useTranslation()
    const images = Array.isArray(item) ? item : [item]
    const [imageIdx, setImageIdx] = useState(0)
    useEffect(() => setImageIdx(0), [idx])

    const nextImage = () => setImageIdx((i) => (i + 1) % images.length)
    const prevImage = () => setImageIdx((i) => (i - 1 + images.length) % images.length)

    const price = PRICES[idx] ?? PRICES[0]
    const priceLabel = `${price.toLocaleString()} MXN`

    return (
      <div className="bg-transparent">
        <div className="group relative">
          <div className="bg-muted overflow-hidden" style={{ aspectRatio: cardAspect }}>
            <Link href={`/new-in/${idx + 1}`}>
              <img
                src={images[imageIdx]}
                alt={t((`product${idx + 1}`) as any)}
                className={`w-full h-full object-cover block ${SOLD[idx] ? 'brightness-90' : ''}`}
                loading="lazy"
              />
            </Link>

            {SOLD[idx] && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                <div className="text-center">
                  <div className="text-xs tracking-widest uppercase text-white">SOLD OUT</div>
                </div>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  prevImage()
                }}
                aria-label="Previous image"
                className="opacity-0 group-hover:opacity-100 transition absolute left-2 top-1/2 -translate-y-1/2 text-black rounded p-2 bg-transparent"
              >
                ‹
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  nextImage()
                }}
                aria-label="Next image"
                className="opacity-0 group-hover:opacity-100 transition absolute right-2 top-1/2 -translate-y-1/2 text-black rounded p-2 bg-transparent"
              >
                ›
              </button>
            </>
          )}
        </div>

          <div className="mt-2 text-center text-sm">
          <div className="font-medium text-[#dbdbdb]">{t((`product${idx + 1}`) as any)}</div>
          <div className="text-xs" style={{ color: "#909090" }}>{priceLabel}</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-12 py-12 px-4 md:px-8 bg-background text-foreground">
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

          <div className="-mx-4 md:-mx-8 px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-0.5 gap-y-2 scrollbar-hide">
              {IMAGES.map((item, idx) => (
                <ProductCard key={idx} item={item} idx={idx} total={IMAGES.length} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
