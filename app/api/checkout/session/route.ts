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
    console.log('[/api/checkout/session] incoming headers origin:', req.headers.get('origin'))
    console.log('[/api/checkout/session] NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL)
    try {
      console.log('[/api/checkout/session] request body:', JSON.stringify(body))
    } catch (e) {
      console.log('[/api/checkout/session] request body (unserializable)')
    }
    let origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    try {
      // validate origin is a proper URL; fallback to localhost if not
      // eslint-disable-next-line no-new
      new URL(origin)
    } catch (e) {
      console.warn('Invalid origin header or NEXT_PUBLIC_SITE_URL, falling back to http://localhost:3000', origin)
      origin = 'http://localhost:3000'
    }
    console.log('[/api/checkout/session] using origin:', origin)

    const items = body.items || (body.item ? [body.item] : [{ name: 'Macrame bag', price: 3500, quantity: 1 }])
    const discountPercent = Number((body && body.discount && body.discount.percent) || 0)

    const line_items = (items || []).map((it: any) => {
      const rawImage = it.image
      let imageUrl: string | null = null
      if (rawImage) {
        // coerce relative paths to absolute using origin
        const candidate = rawImage.startsWith('http') ? rawImage : `${origin}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`
        try {
          // eslint-disable-next-line no-new
          const u = new URL(candidate)
          // Only send HTTPS images to Stripe (Stripe requires secure URLs)
          if (u.protocol === 'https:') imageUrl = candidate
          else console.warn('Image URL not HTTPS; omitting from product_data.images:', candidate)
        } catch (e) {
          console.warn('Invalid item image URL, omitting image:', rawImage)
          imageUrl = null
        }
      }

      const baseAmount = Math.round(it.price || 0)
      const finalAmount = Math.max(0, Math.round(baseAmount * (1 - (discountPercent / 100))))
      const product_data: any = { name: it.name }
      if (imageUrl) product_data.images = [imageUrl]

      return {
        price_data: {
          currency: 'mxn',
          product_data,
          unit_amount: finalAmount,
        },
        quantity: it.quantity || 1,
      }
    })

    // compute shipping based on form values (posted in body.form)
    const form = body.form || {}
    function computeShippingAmount(formData: any) {
      const country = (formData.country || '').toUpperCase()
      const state = (formData.state || '').toLowerCase()
      if (country === 'US') return 250 * 100
      if (country === 'MX') {
        if (state === 'ciudad de méxico' || state === 'ciudad de mexico') return 100 * 100
        return 150 * 100
      }
      return 200 * 100
    }

    const shippingAmount = computeShippingAmount(form)

    try {
      console.log('[/api/checkout/session] computed line_items:', JSON.stringify(line_items, null, 2))
    } catch (e) {
      console.log('[/api/checkout/session] computed line_items (unserializable)')
    }

    let session
    try {
      session = await stripe.checkout.sessions.create({
      allow_promotion_codes: true,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['MX', 'US'],
      },
      // Add a single fixed shipping option computed from the form so Stripe
      // shows the same shipping amount the user saw in the UI.
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingAmount, currency: 'mxn' },
            display_name: 'Shipping',
          },
        },
      ],
      metadata: {
        shipping: JSON.stringify(body.form || {}),
        discount: JSON.stringify(body.discount || {}),
      },
    })
    } catch (e: any) {
      console.error('[/api/checkout/session] Stripe session create error:', e?.message || e)
      throw e
    }

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Error creating checkout session (/api/checkout/session):', err?.message || err)
    if (err?.stack) console.error(err.stack)
    const message = err?.message || 'server_error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
