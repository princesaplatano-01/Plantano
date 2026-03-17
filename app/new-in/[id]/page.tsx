"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useCart } from "@/components/cart"
import AddToCart from "@/components/add-to-cart"
import { Header } from "@/components/header"
import { IMAGES, PRICES, DESCRIPTIONS } from "@/lib/products"
import { getStock, listenStockUpdate } from "@/lib/stock"
import { useTranslation } from "@/lib/translations"
import { useState, useRef, useEffect } from "react"

// IMAGES, PRICES, SOLD imported from lib/products

export default function ProductPage() {
  const params = useParams()
  const id = parseInt((params?.id as string) || "1", 10)
  const idx = Math.max(0, Math.min(IMAGES.length - 1, id - 1))
  const raw = IMAGES[idx]
  const images = Array.isArray(raw) ? raw : [raw]
  const [imageIdx, setImageIdx] = useState(0)
  const src = images[imageIdx]
  const nextImage = () => setImageIdx((i) => (i + 1) % images.length)
  const prevImage = () => setImageIdx((i) => (i - 1 + images.length) % images.length)
  const price = PRICES[idx] ?? PRICES[0]
  const priceLabel = `${price.toLocaleString()} MXN`
  const router = useRouter()

  const { addToCart } = useCart()
  const { t } = useTranslation()

  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const notifyBtnRef = useRef<HTMLButtonElement | null>(null)
  const [modalCoords, setModalCoords] = useState<{ x: number; y: number; w: number } | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!modalOpen) return
    const btn = notifyBtnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    setModalCoords({ x: rect.left + rect.width / 2, y: rect.top, w: rect.width })
  }, [modalOpen])

  // After modal renders, measure its height and, if there's not enough space below the button,
  // move the modal above the button so inputs aren't covered (mobile keyboards, etc.).
  useEffect(() => {
    if (!modalOpen) return
    const btn = notifyBtnRef.current
    const modalEl = modalRef.current
    if (!btn || !modalEl) return

    const rect = btn.getBoundingClientRect()
    const modalH = modalEl.clientHeight
    const spaceBelow = window.innerHeight - rect.bottom

    // prefer below, but if not enough space then position above with 8px gap
    if (spaceBelow < modalH + 80) {
      let top = rect.top - modalH - 8
      if (top < 8) top = 8
      setModalCoords({ x: rect.left + rect.width / 2, y: top, w: rect.width })
    }
  }, [modalOpen])

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push('/new-in')
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 py-12 px-4 md:px-8 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
        <button
          onClick={handleBack}
          className={`text-sm mb-4 ${id === 10 ? 'text-[#dcdcdc]' : 'text-muted-foreground'}`}
        >
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="relative group">
            <div className="overflow-hidden bg-muted rounded" style={{ aspectRatio: "3 / 4", width: '100%' }}>
              <img
                src={src}
                alt={t((`product${id}`) as any)}
                className="w-full h-full object-cover rounded"
              />
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
                    className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition absolute left-2 top-1/2 -translate-y-1/2 text-[#454545] rounded text-3xl p-4 bg-white/10"
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
                    className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition absolute right-2 top-1/2 -translate-y-1/2 text-[#454545] rounded text-3xl p-4 bg-white/10"
                  >
                    ›
                  </button>

                
              </>
            )}
            {images.length > 1 && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Show image ${i + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setImageIdx(i)
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${imageIdx === i ? 'bg-white' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#dbdbdb]">{t((`product${id}`) as any)}</h2>
            <div className="text-xl" style={{ color: "#909090" }}>{priceLabel}</div>
            {DESCRIPTIONS[idx] && (
              <div className="text-sm text-muted-foreground mt-2">{DESCRIPTIONS[idx]}</div>
            )}
                      {
                        (() => {
                          const [stock, setStock] = (() => {
                            const s = getStock(idx)
                            const [st, setSt] = useState(s)
                            useEffect(() => {
                              const cb = () => setSt(getStock(idx))
                              const off = listenStockUpdate(cb)
                              return off
                            }, [idx])
                            return [st, setSt] as const
                          })()

                          if (stock === 0) {
                            return (
                              <>
                                <div className="text-sm text-muted-foreground">OUT OF STOCK</div>
                                {!sent ? (
                                  <div className="mt-4">
                                    <button
                                      ref={notifyBtnRef}
                                      onClick={() => setModalOpen(true)}
                                      className="w-full py-2 bg-white text-black font-medium"
                                    >
                                      DON'T MISS THE NEXT DROP
                                    </button>
                                  </div>
                                ) : (
                                  <div className="mt-4 text-sm">Thank you — we'll notify you when available.</div>
                                )}
                              </>
                            )
                          }

                          return (
                            <>
                              <div className="text-sm text-muted-foreground">IN STOCK</div>
                              <AddToCart id={`newin-${id}`} name={t((`product${id}`) as any)} price={price} image={src} className="mt-4 px-4 py-2 border border-white text-white">Add to cart</AddToCart>
                            </>
                          )
                        })()
                      }
            </div>

            {/* Modal for notify */}
            {modalOpen && (
              <>
                <div className="fixed inset-0 z-[1000]" onClick={() => setModalOpen(false)} />
                <div
                  style={
                    modalCoords
                      ? {
                          position: "fixed",
                          top: modalCoords.y,
                          left: modalCoords.x,
                          transform: "translate(-50%, 0)",
                          zIndex: 1001,
                        }
                      : { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1001 }
                  }
                >
                  <div ref={modalRef} className="bg-background p-6 rounded shadow-lg text-foreground" style={{ width: modalCoords ? modalCoords.w : 320 }}>
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-semibold uppercase" style={{ color: '#dcdcdc' }}>DON'T MISS THE NEXT DROP</h2>
                      <button onClick={() => setModalOpen(false)} aria-label="Close" className="text-muted-foreground text-xl leading-none">×</button>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">We'll notify you when this product is back in stock.</p>
                    {!sent ? (
                      <div className="mt-4">
                        <input
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="px-3 py-2 w-full mb-3 bg-transparent border border-[#454545] text-white"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (!email) return alert('Please enter an email')
                              setSent(true)
                              setModalOpen(false)
                              alert(`We'll notify you at ${email}`)
                            }}
                            className="flex-1 py-2 bg-white text-black font-medium"
                          >
                            Notify me
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 text-sm" style={{ color: '#d9d9d9' }}>Thank you — we'll notify you when available.</div>
                    )}
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </main>
    </>
  )
}
