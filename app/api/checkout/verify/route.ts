import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function GET(req: NextRequest) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY
    if (!stripeSecret) return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 })
    const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' })

    const url = new URL(req.url)
    const session_id = url.searchParams.get('session_id')
    if (!session_id) return NextResponse.json({ error: 'missing session_id' }, { status: 400 })

    const sess = await stripe.checkout.sessions.retrieve(session_id, { expand: ['payment_intent'] })

    // Consider session.payment_status or the expanded payment_intent status
    const paid = (sess.payment_status === 'paid') || ((sess.payment_intent as any)?.status === 'succeeded')

    return NextResponse.json({ paid: !!paid, session: { id: sess.id, payment_status: sess.payment_status } })
  } catch (err: any) {
    console.error('Error verifying checkout session (/api/checkout/verify):', err?.message || err)
    return NextResponse.json({ error: err?.message || 'server_error' }, { status: 500 })
  }
}
