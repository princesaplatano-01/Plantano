import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js'

type StripeJSPromise = Promise<StripeJS | null>

// Client-side singleton for loadStripe()
let stripePromise: StripeJSPromise | null = null

export function getStripe(): StripeJSPromise {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
    stripePromise = loadStripe(key)
  }
  return stripePromise
}

// Server-side singleton for Stripe secret-key client.
// We `require` inside the function so bundlers don't include the server SDK in client builds.
export function getStripeServer() {
  if (typeof window !== 'undefined') {
    throw new Error('getStripeServer must be called on the server')
  }

  const globalAny: any = globalThis as any
  if (!globalAny.__stripe_server) {
    const Stripe = require('stripe')
    const secret = process.env.STRIPE_SECRET_KEY || ''
    globalAny.__stripe_server = new Stripe(secret, { apiVersion: '2022-11-15' })
  }
  return globalAny.__stripe_server
}

export default getStripe
