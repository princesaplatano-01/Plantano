"use client"

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

type State = {
  items: CartItem[]
}

type Action =
  | { type: "HYDRATE"; payload: CartItem[] }
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "CLEAR" }

const initialState: State = { items: [] }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload }
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        const newQty = existing.quantity + action.payload.quantity
        if (newQty <= 0) {
          return { items: state.items.filter((i) => i.id !== action.payload.id) }
        }
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: newQty } : i
          ),
        }
      }
      // only add if positive quantity
      if (action.payload.quantity <= 0) return state
      return { items: [...state.items, action.payload] }
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.payload.id) }
    case "CLEAR":
      return { items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  subtotal: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    try {
      // Ensure the site opens with an empty shopping cart by clearing any
      // persisted cart data on mount. This prevents previously stored items
      // from appearing when the website is opened.
      localStorage.removeItem("platano_cart")
      // No hydrate dispatch; keep initial state empty.
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("platano_cart", JSON.stringify(state.items))
    } catch (e) {
      // ignore
    }
  }, [state.items])

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const payload: CartItem = {
      ...item,
      quantity: item.quantity ?? 1,
    }
    dispatch({ type: "ADD", payload })
  }

  const removeFromCart = (id: string) => dispatch({ type: "REMOVE", payload: { id } })

  const clearCart = () => dispatch({ type: "CLEAR" })

  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0)
  const itemCount = state.items.reduce((s, i) => s + i.quantity, 0)

  const value = useMemo(
    () => ({ items: state.items, addToCart, removeFromCart, clearCart, subtotal, itemCount }),
    [state.items, subtotal, itemCount]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
