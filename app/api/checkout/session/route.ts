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

    const items = body.items || (body.item ? [body.item] : [{ name: 'Macrame bag', price: 3500, quantity: 1 }])
    const discountPercent = Number((body && body.discount && body.discount.percent) || 0)

    const line_items = (items || []).map((it: any) => {
      const rawImage = it.image
      const imageUrl = rawImage
        ? (rawImage.startsWith('http') ? rawImage : `${origin}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`)
        : `${origin}/images/placeholder.png`

      const baseAmount = Math.round(it.price || 0)
      const finalAmount = Math.max(0, Math.round(baseAmount * (1 - (discountPercent / 100))))
      return {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: it.name,
            images: [imageUrl],
          },
          unit_amount: finalAmount,
        },
        quantity: it.quantity || 1,
      }
    })

    const session = await stripe.checkout.sessions.create({
      allow_promotion_codes: true,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['MX', 'US'],
      },
      metadata: {
        shipping: JSON.stringify(body.form || {}),
        discount: JSON.stringify(body.discount || {}),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Error creating checkout session (/api/checkout/session):', err?.message || err)
    if (err?.stack) console.error(err.stack)
    const message = err?.message || 'server_error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
