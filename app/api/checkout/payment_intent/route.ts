import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY
    if (!stripeSecret) {
      return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 })
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' as const })
    const body = await req.json()
    const amount = Math.round(body.amount || 0)
    const currency = body.currency || 'mxn'

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'invalid_amount' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: any) {
    console.error('Error creating payment intent (checkout/payment_intent):', err?.message || err)
    if (err?.stack) console.error(err.stack)
    const message = err?.message || 'server_error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
