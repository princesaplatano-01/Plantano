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
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const items = body.items
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty items array' }, { status: 400 })
    }

    // Accept items in the shape: { priceId: 'price_xxx', quantity: 1 }
    const line_items = items.map((it: any) => {
      const priceId = it.priceId || it.price_id || it.price
      if (!priceId) throw new Error('Each item must include a priceId')
      const quantity = Number.isInteger(it.quantity) ? it.quantity : parseInt(it.quantity) || 1
      return { price: priceId, quantity }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['MX', 'US', 'PT', 'BE'],
      },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Could not create checkout session' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Error creating checkout session (/api/checkout_sessions):', err?.message || err)
    if (err?.stack) console.error(err.stack)
    const message = err?.message || 'server_error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
