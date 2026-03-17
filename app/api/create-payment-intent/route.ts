import { NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe'
import { mxnToCentavos } from '@/lib/utils'

export async function POST(req: Request) {
  try {
    const stripe = getStripeServer()
    const body = await req.json()
    // Accept either `amount` (in centavos) or `amountMXN` (in pesos). If neither provided, use default.
    const { amount, amountMXN } = body || {}

    // default amount (in smallest currency unit, centavos)
    const DEFAULT_AMOUNT = 3500

    let finalAmount: number
    if (typeof amount === 'number' && amount > 0) {
      finalAmount = Math.round(amount)
    } else if (typeof amountMXN === 'number' && amountMXN > 0) {
      finalAmount = mxnToCentavos(amountMXN)
    } else {
      finalAmount = DEFAULT_AMOUNT
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: 'mxn',
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: any) {
    console.error('Error creating PaymentIntent:', err)
    const message = err?.message || 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
