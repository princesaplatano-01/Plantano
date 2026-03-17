"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { decrementByProductId } from '@/lib/stock'

export default function SuccessPage() {
  const sp = useSearchParams()
  const sessionId = sp?.get('session_id')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('platano_cart')
      if (!raw) return
      const items = JSON.parse(raw)
      if (Array.isArray(items)) {
        items.forEach((it: any) => {
          try {
            // decrement local stock by product id and quantity
            if (it.id) decrementByProductId(it.id, it.quantity || 1)
          } catch (e) {}
        })
        // clear cart after successful payment
        localStorage.removeItem('platano_cart')
        try { window.dispatchEvent(new CustomEvent('platano_cart:cleared')) } catch (e) {}
      }
    } catch (e) {
      // ignore
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center py-24 px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
        <p className="mb-4">Thank you — your payment was received.</p>
        {sessionId ? (
          <p className="text-sm text-gray-600 mb-4">Order reference: <span className="font-mono">{sessionId}</span></p>
        ) : null}
        <Link href="/" className="inline-block mt-4 px-4 py-2 bg-black text-white rounded">Continue shopping</Link>
      </div>
    </main>
  )
}
