import { NextResponse } from 'next/server'
import { getStripeServer } from '@/lib/stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY || ''

export async function POST(req: Request) {
  try {
    if (!stripeSecret) {
      return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 })
    }

    const stripe = getStripeServer()
    const body = await req.json()
    const items = body?.items
    const form = body?.form || {}

    function toIntegerAmount(value: any) {
      if (value == null) return null
      if (typeof value === 'number' && Number.isFinite(value)) {
        if (Number.isInteger(value)) return value
        return Math.round(value * 100)
      }
      const s = String(value).trim().replace(/,/g, '')
      if (!s) return null
      if (/^\d+\.\d+$/.test(s)) {
        return Math.round(parseFloat(s) * 100)
      }
      if (/^\d+$/.test(s)) return parseInt(s, 10)
      const parsed = parseFloat(s)
      if (Number.isFinite(parsed)) return Math.round(parsed)
      return null
    }

    function sanitizeImageUrl(url: any) {
      if (!url || typeof url !== 'string') return null
      const trimmed = url.trim()
      if (!/^https:\/\//i.test(trimmed)) return null
      if (/localhost|127\.0\.0\.1/.test(trimmed)) return null
      return trimmed
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty items array' }, { status: 400 })
    }

    const line_items = items.map((it: any) => {
      const quantity = Number.isInteger(it.quantity) ? it.quantity : parseInt(it.quantity, 10) || 1
      const unitAmt = toIntegerAmount(it.unit_amount ?? it.price ?? it.unitAmount ?? it.amount)
      if (unitAmt == null || unitAmt <= 0) {
        throw new Error('Each item must include a valid unit_amount (in cents) or a priceId')
      }

      const rawImages = it.images || it.image || []
      const images = Array.isArray(rawImages)
        ? rawImages.map(sanitizeImageUrl).filter(Boolean)
        : []

      return {
        price_data: {
          currency: (it.currency || 'mxn').toLowerCase(),
          product_data: {
            name: it.name || it.title || 'Item',
            images: images as string[],
          },
          unit_amount: unitAmt,
        },
        quantity,
      }
    })

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
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

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
    console.error('Error creating checkout session (/api/checkout):', err?.message || err)
    if (err?.stack) console.error(err.stack)
    const message = err?.message || 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
