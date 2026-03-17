"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetStockPage() {
  const router = useRouter()

  useEffect(() => {
    try {
      localStorage.removeItem('platano_stock_v1')
    } catch {}

    const t = setTimeout(() => router.replace('/new-in/1'), 250)
    return () => clearTimeout(t)
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Resetting stock...</h1>
        <p className="mt-2 text-sm" style={{ color: '#9ca3af' }}>
          You will be redirected to product 1 shortly.
        </p>
      </div>
    </main>
  )
}
