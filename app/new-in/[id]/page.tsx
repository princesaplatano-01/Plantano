"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useCart } from "@/components/cart"
import AddToCart from "@/components/add-to-cart"
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

const PRICES = [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000]

export default function ProductPage() {
  const params = useParams()
  const id = parseInt((params?.id as string) || "1", 10)
  const idx = Math.max(0, Math.min(IMAGES.length - 1, id - 1))
  const src = IMAGES[idx]
  const price = PRICES[idx] ?? PRICES[0]
  const priceLabel = `${price.toLocaleString()} MXN`
  const router = useRouter()

  const { addToCart } = useCart()

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
        <button onClick={handleBack} className="text-sm mb-4 text-muted-foreground">Back</button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <img src={src} alt={`Product ${id}`} className="w-full h-auto object-cover rounded" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#dbdbdb]">Product {id}</h2>
            <div className="text-xl" style={{ color: "#909090" }}>{priceLabel}</div>
            <div className="text-sm text-muted-foreground">IN STOCK</div>
            <AddToCart id={`newin-${id}`} name={`Product ${id}`} price={price} image={src} className="mt-4 px-4 py-2 border border-white text-white">Add to cart</AddToCart>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
