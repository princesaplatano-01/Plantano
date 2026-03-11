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

    const item = body.item || { name: 'Macrame bag', price: 3500, quantity: 1 }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: item.name,
              images: [item.image || `${origin}/images/placeholder.png`],
            },
            unit_amount: Math.round(item.price || 0),
          },
          quantity: item.quantity || 1,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['MX', 'US'],
      },
      metadata: {
        shipping: JSON.stringify(body.form || {}),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
