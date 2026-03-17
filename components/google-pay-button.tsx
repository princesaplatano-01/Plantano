"use client"

import React, { useEffect, useState } from 'react'
import { Elements, PaymentRequestButtonElement, useStripe } from '@stripe/react-stripe-js'
import getStripe from '@/lib/stripe'

function GooglePayButtonInner({ amount }: { amount: number }) {
  const stripe = useStripe()
  const [paymentRequest, setPaymentRequest] = useState<any | null>(null)

  useEffect(() => {
    if (!stripe) return

    const pr = stripe.paymentRequest({
      country: 'MX',
      currency: 'mxn',
      total: { label: 'Total', amount },
      requestPayerName: true,
      requestPayerEmail: true,
    })

    let mounted = true
    pr.canMakePayment().then((res: any) => {
      if (mounted && res) setPaymentRequest(pr)
    }).catch(() => {})

    const handle = async (ev: any) => {
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        })
        const data = await res.json()
        if (data.error || !data.clientSecret) {
          ev.complete('fail')
          return
        }

        const clientSecret = data.clientSecret
        const confirmResult = await stripe.confirmCardPayment(clientSecret, { payment_method: ev.paymentMethod.id }, { handleActions: false })
        if (confirmResult.error) {
          ev.complete('fail')
          return
        }

        if (confirmResult.paymentIntent && confirmResult.paymentIntent.status === 'requires_action') {
          const finalResult = await stripe.confirmCardPayment(clientSecret)
          if (finalResult.error) {
            ev.complete('fail')
            return
          }
          ev.complete('success')
          window.location.href = `/checkout/success?session_id=${finalResult.paymentIntent.id}`
        } else {
          ev.complete('success')
          window.location.href = `/checkout/success?session_id=${confirmResult.paymentIntent?.id ?? ''}`
        }
      } catch (err) {
        try { ev.complete('fail') } catch (e) {}
      }
    }

    pr.on('paymentmethod', handle)

    return () => {
      mounted = false
      try { pr.off('paymentmethod', handle) } catch (e) {}
    }
  }, [stripe, amount])

  if (!paymentRequest) return null

  return (
    <div className="mt-4">
      <PaymentRequestButtonElement options={{ paymentRequest, style: { paymentRequestButton: { type: 'default', theme: 'dark', height: '48px' } } }} />
    </div>
  )
}

export default function GooglePayButton({ amount }: { amount: number }) {
  const stripePromise = getStripe()
  return (
    <Elements stripe={stripePromise}>
      <GooglePayButtonInner amount={amount} />
    </Elements>
  )
}
