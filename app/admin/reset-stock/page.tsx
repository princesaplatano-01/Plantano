"use client"

import { useEffect } from 'react'
import { setStock } from '@/lib/stock'
import { useRouter } from 'next/navigation'

export default function ResetStockPage() {
  const router = useRouter()

  useEffect(() => {
    try {
      // Set product index 0 (UFO Plum Necklace) back to 1
      setStock(0, 1)
      // Give a brief moment then redirect to the product listing
      setTimeout(() => router.push('/new-in/1'), 250)
    } catch (e) {
      // ignore
      setTimeout(() => router.push('/new-in/1'), 250)
    }
  }, [router])

  return <div style={{ padding: 24 }}>Resetting stock and redirecting…</div>
}
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetStockPage() {
  const router = useRouter()

  useEffect(() => {
    try {
      // clear the stored stock so products revert to initial stock
      localStorage.removeItem('platano_stock_v1')
      // optionally clear cart as well
      // localStorage.removeItem('platano_cart')
    } catch (e) {
      // ignore
    }
    // small delay to ensure storage cleared before navigation
    const t = setTimeout(() => router.replace('/new-in/1'), 250)
    return () => clearTimeout(t)
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Resetting stock…</h1>
        <p className="mt-2 text-sm text-muted-foreground">You will be redirected to product 1 shortly.</p>
      </div>
    </main>
  )
}
