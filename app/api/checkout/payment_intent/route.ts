import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY || ''

export async function POST(req: NextRequest) {
  try {
    if (!stripeSecret) {
      return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 })
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' })
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
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
