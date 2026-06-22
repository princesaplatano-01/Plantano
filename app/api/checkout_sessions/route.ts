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

    // Helpers
    function sanitizeImageUrl(url: any) {
      if (!url || typeof url !== 'string') return null
      const trimmed = url.trim()
      // Only allow absolute HTTPS URLs (no localhost, no relative paths)
      if (!/^https:\/\//i.test(trimmed)) return null
      if (/localhost|127\.0\.0\.1/.test(trimmed)) return null
      return trimmed
    }

    function toIntegerAmount(value: any) {
      if (value == null) return null
      // Accept numbers or strings like "19.99" or "1,234.56"
      if (typeof value === 'number' && Number.isFinite(value)) {
        if (Number.isInteger(value)) return value
        return Math.round(value * 100)
      }
      const s = String(value).trim().replace(/,/g, '')
      if (!s) return null
      // If it looks like a decimal (e.g. 19.99) treat as major units and convert to cents.
      // Use Math.round so Stripe always gets an integer amount.
      if (/^\d+\.\d+$/.test(s)) {
        return Math.round(parseFloat(s) * 100)
      }
      // If it's an integer string, interpret as cents already.
      if (/^\d+$/.test(s)) return parseInt(s, 10)
      // fallback: try parseFloat then round
      const parsed = parseFloat(s)
      if (Number.isFinite(parsed)) return Math.round(parsed)
      return null
    }

    // Accept items in the shape: { priceId: 'price_xxx', quantity: 1 }
    // or a fallback product shape: { name, unit_amount, currency, images, quantity }
    const line_items: any[] = items.map((it: any) => {
      const priceId = it.priceId || it.price_id || it.price
      const quantity = Number.isInteger(it.quantity) ? it.quantity : parseInt(it.quantity) || 1
      if (priceId) return { price: priceId, quantity }

      // Fallback to inline price data
      const name = it.name || it.title || 'Item'
      // unit_amount may be provided as major units (e.g. 19.99) or as cents
      const unitAmt = toIntegerAmount(it.unit_amount ?? it.price ?? it.unitAmount)
      if (unitAmt == null || unitAmt <= 0) {
        throw new Error('Each item must include a valid unit_amount (in cents) or a priceId')
      }
      const currency = (it.currency || 'mxn').toLowerCase()
      const rawImages = it.images || it.image || it.images_url || []
      const images = Array.isArray(rawImages) ? rawImages.map(sanitizeImageUrl).filter(Boolean) : []

      return {
        price_data: {
          currency,
          product_data: {
            name,
            images: images as string[],
          },
          unit_amount: unitAmt,
        },
        quantity,
      }
    })

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

    const session = await stripe.checkout.sessions.create({
      allow_promotion_codes: true,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['MX', 'US', 'PT', 'BE'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingAmount, currency: 'mxn' },
            display_name: 'Shipping',
          },
        },
      ],
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
