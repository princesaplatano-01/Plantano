"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  qty?: number
  src?: string
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("platano_cart")
      if (raw) setItems(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("platano_cart", JSON.stringify(items))
    } catch (e) {
      // ignore
    }
  }, [items])

  function addItem(item: CartItem) {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id)
      if (idx !== -1) {
        const copy = [...prev]
        copy[idx].qty = (copy[idx].qty || 1) + (item.qty || 1)
        return copy
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }]
    })
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }

  function clear() {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
