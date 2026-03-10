"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart"

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

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id || "1", 10)
  const idx = Math.max(0, Math.min(IMAGES.length - 1, id - 1))
  const src = IMAGES[idx]
  const router = useRouter()

  const { addItem } = useCart()

  function handleAdd() {
    addItem({ id: `newin-${id}`, name: `Product ${id}`, price: 2000, qty: 1, src })
  }

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => router.back()} className="text-sm mb-4 text-muted-foreground">Back</button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <img src={src} alt={`Product ${id}`} className="w-full h-auto object-cover rounded" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#dbdbdb]">Product {id}</h2>
            <div className="text-xl" style={{ color: "#909090" }}>$2000 MXN</div>
            <div className="text-sm text-muted-foreground">IN STOCK</div>
            <button onClick={handleAdd} className="mt-4 px-4 py-2 border border-white text-white">Add to cart</button>
          </div>
        </div>
      </div>
    </main>
  )
}
