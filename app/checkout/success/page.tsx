"use client"

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const sp = useSearchParams()
  const sessionId = sp?.get('session_id')

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
