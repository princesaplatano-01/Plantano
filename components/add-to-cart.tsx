"use client"

import React, { useRef, useState, useEffect } from "react"
import { useCart } from "@/components/cart"
import { getStock } from '@/lib/stock'
import { decrementByProductId } from "@/lib/stock"

type Props = {
  id: string
  name: string
  price: number
  image?: string
  quantity?: number
  className?: string
  children?: React.ReactNode
}

export default function AddToCart({ id, name, price, image, quantity = 1, className, children }: Props) {
  const { addToCart, items: cartItems } = useCart()
  const [clicked, setClicked] = useState(false)
  const tRef = useRef<number | null>(null)

  function handleAdd(e?: React.MouseEvent) {
    if (e) e.stopPropagation()
    const priceInCentavos = Math.round(price * 100)
    // Check stock before adding
    try {
      let allowed = true
      if (typeof id === 'string' && id.startsWith('newin-')) {
        const parts = id.split('-')
        const n = parseInt(parts[1] || '', 10)
        if (!Number.isNaN(n) && n > 0) {
          const stock = getStock(n - 1)
          const inCart = cartItems.find((c) => c.id === id)?.quantity || 0
          if (typeof stock === 'number') {
            if (inCart + quantity > stock) allowed = false
          }
        }
      }
      if (!allowed) return
    } catch (e) {
      // ignore and allow
    }

    addToCart({ id, name, price: priceInCentavos, quantity, image })
    setClicked(true)
    try {
      // Only update stock after confirmed payment. Previously desktop decremented immediately;
      // keep stock changes gated to successful payment to avoid showing sold-out prematurely.
    } catch (err) {
      // ignore
    }
    if (tRef.current) window.clearTimeout(tRef.current)
    tRef.current = window.setTimeout(() => setClicked(false), 200)
  }

  useEffect(() => {
    return () => {
      if (tRef.current) window.clearTimeout(tRef.current)
    }
  }, [])

  const base = className || "mt-4 px-4 py-2 border border-white text-white"
  const inverse = "bg-white text-[#1E1D1D]"

  // determine whether the add action should be disabled due to stock limits
  let addDisabled = false
  try {
    if (typeof id === 'string' && id.startsWith('newin-')) {
      const parts = id.split('-')
      const n = parseInt(parts[1] || '', 10)
      if (!Number.isNaN(n) && n > 0) {
        const stock = getStock(n - 1)
        const inCart = cartItems.find((c) => c.id === id)?.quantity || 0
        if (typeof stock === 'number') {
          if (inCart >= stock) addDisabled = true
        }
      }
    }
  } catch (e) {
    // ignore
  }

  return (
    <button onClick={handleAdd} disabled={addDisabled} className={`${base} ${clicked ? inverse : ""} transition-colors duration-200 ${addDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
      {children ?? "Add to cart"}
    </button>
  )
}
