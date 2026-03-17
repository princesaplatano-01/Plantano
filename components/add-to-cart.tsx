"use client"

import React, { useRef, useState, useEffect } from "react"
import { useCart } from "@/components/cart"
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
  const { addToCart } = useCart()
  const [clicked, setClicked] = useState(false)
  const tRef = useRef<number | null>(null)

  function handleAdd(e?: React.MouseEvent) {
    if (e) e.stopPropagation()
    const priceInCentavos = Math.round(price * 100)
    addToCart({ id, name, price: priceInCentavos, quantity, image })
    setClicked(true)
    try {
      decrementByProductId(id, quantity)
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

  return (
    <button onClick={handleAdd} className={`${base} ${clicked ? inverse : ""} transition-colors duration-200`}>
      {children ?? "Add to cart"}
    </button>
  )
}
