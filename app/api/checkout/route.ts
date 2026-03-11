import { NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const stripe = getStripeServer()
    const body = await req.json()
    const { amount, currency = 'mxn' } = body || {}

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount. Send amount as an integer (cents).' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: any) {
    console.error('Error creating PaymentIntent:', err)
    const message = err?.message || 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
