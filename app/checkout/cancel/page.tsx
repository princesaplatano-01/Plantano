import Link from 'next/link'
import { Header } from '@/components/header'

export default function CancelPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl text-center bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4">Payment canceled</h1>
          <p className="text-sm text-gray-700 mb-6">Your payment was not completed. Your cart is still available.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/checkout" className="px-5 py-3 bg-black text-white rounded font-medium">Return to cart</Link>
            <Link href="/" className="px-5 py-3 border rounded font-medium">Continue browsing</Link>
          </div>
        </div>
      </main>
    </>
  )
}
