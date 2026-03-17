"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StripeRefRedirect() {
  const router = useRouter()

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const ref = document.referrer || ''
      if (ref.includes('checkout.stripe.com')) {
        // Send the user back to the cart/checkout page when returning from Stripe
        router.replace('/checkout')
      }
    } catch (e) {
      // ignore
    }
  }, [router])

  return null
}
