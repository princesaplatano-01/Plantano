"use client"

import React, { useState, useEffect } from "react"
import { useCart } from "@/components/cart"
import { Header } from "@/components/header"
import Link from "next/link"

type FormState = {
  shippingMethod: "ship"
  firstName: string
  lastName: string
  address: string
  apartment: string
  city: string
  postalCode: string
  state: string
  country: string
  phone: string
  emailOrPhone: string
  emailOffers: boolean
}

const defaultForm: FormState = {
  shippingMethod: "ship",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
  state: "",
  country: "MX",
  phone: "",
  emailOrPhone: "",
  emailOffers: false,
}

export default function CheckoutPage() {
  const [form, setForm] = useState<FormState>(defaultForm)
  const [loading, setLoading] = useState(false)
  const [showSummaryOnMobile, setShowSummaryOnMobile] = useState(false)

  const { items: cartItems, subtotal: cartSubtotal, itemCount } = useCart()
  const shipping = form.shippingMethod === "ship" ? 200 : 0
  const subtotal = cartSubtotal
  const total = subtotal + shipping

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }))
  }

  function ClickableButton({ children, onClick, className, disabled, type }: { children: React.ReactNode; onClick?: (e: any) => void; className?: string; disabled?: boolean; type?: 'button' | 'submit' }) {
    const [active, setActive] = useState(false)
    function handleClick(e: any) {
      setActive(true)
      onClick?.(e)
      setTimeout(() => setActive(false), 200)
    }
    return (
      <button type={type ?? 'button'} disabled={disabled} onClick={handleClick} className={`click-invert ${active ? 'inverted' : ''} ${className ?? ''}`}>
        {children}
      </button>
    )
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    function logger(e: MouseEvent) {
      // log target info to help diagnose unexpected navigation
      try {
        // eslint-disable-next-line no-console
        console.log('CLICK LOGGER:', { target: (e.target as Element)?.outerHTML?.slice?.(0, 200), path: (e as any).composedPath?.()?.map((n: any) => n?.nodeName).slice?.(0,8) })
      } catch (err) {
        // ignore
      }
    }
    document.addEventListener('click', logger, true)
    return () => document.removeEventListener('click', logger, true)
  }, [])

  function ClickableLabel({ children, onClick, className }: { children: React.ReactNode; onClick?: (e: any) => void; className?: string }) {
    const [active, setActive] = useState(false)
    function handleClick(e: any) {
      setActive(true)
      onClick?.(e)
      setTimeout(() => setActive(false), 200)
    }
    return (
      <label onClick={handleClick} className={`click-invert ${active ? 'inverted' : ''} ${className ?? ''}`}>
        {children}
      </label>
    )
  }

  async function createCheckoutSession() {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems, form }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Unable to create checkout session. Check server logs.")
      }
    } catch (err) {
      console.error(err)
      alert("Error creating checkout session")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <Link href="/">
            <img src="/Front/PP-LOGO-LTTRNG-A-02.png" alt="Princesa Plátano" className="mx-auto w-40 h-auto cursor-pointer" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
          <section className="md:col-span-6">
            <div className="mb-6">
              <div className="flex gap-3 items-center">
                <ClickableButton onClick={createCheckoutSession} disabled={loading} className="flex-1 py-3 bg-black text-white uppercase font-semibold">Pay with Card</ClickableButton>
                <ClickableButton onClick={() => alert('PayPal integration not configured')} className="py-3 px-4 bg-[#f8fa41] text-black font-medium">PayPal</ClickableButton>
                <ClickableButton onClick={createCheckoutSession} className="py-3 px-4 bg-black text-white font-medium">GPay / Apple Pay</ClickableButton>
              </div>
            </div>

            <div className="bg-white p-6 shadow rounded">
              <div className="mb-6">
                <h2 className="text-sm font-semibold uppercase">Contact</h2>
                <div className="mt-4">
                  <input
                    value={form.emailOrPhone}
                    onChange={(e) => update('emailOrPhone', e.target.value)}
                    placeholder="Email or phone number"
                    className="p-3 border rounded w-full"
                  />
                </div>
                <div className="mt-2 flex items-center">
                  <input
                    id="email-offers"
                    type="checkbox"
                    checked={form.emailOffers}
                    onChange={(e) => update('emailOffers', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 accent-[#f8fa41]"
                  />
                  <label htmlFor="email-offers" className="ml-2 block text-sm text-gray-900">Send me news and offers by email</label>
                </div>
              </div>
              <h2 className="text-sm font-semibold uppercase">Delivery</h2>
              <div className="mt-4 flex gap-3">
                <ClickableLabel className={`flex-1 p-3 border rounded cursor-pointer ${form.shippingMethod === 'ship' ? 'bg-gray-100' : ''}`}>
                  <input type="radio" name="shipping" checked={form.shippingMethod === 'ship'} onChange={() => update('shippingMethod', 'ship')} className="hidden" />
                  <div className="text-sm font-medium">Ship</div>
                </ClickableLabel>
              </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="First Name" className="p-3 border rounded" />
                <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Last Name" className="p-3 border rounded" />
                <input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Address" className="p-3 border rounded md:col-span-2" />
                <input value={form.apartment} onChange={(e) => update('apartment', e.target.value)} placeholder="Apartment (optional)" className="p-3 border rounded md:col-span-2" />
                <input value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="City" className="p-3 border rounded" />
                <input value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} placeholder="Postal Code" className="p-3 border rounded" />
                <input value={form.state} onChange={(e) => update('state', e.target.value)} placeholder="State" className="p-3 border rounded" />
                <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Phone" className="p-3 border rounded" />
                <select value={form.country} onChange={(e) => update('country', e.target.value)} className="p-3 border rounded">
                  <option value="MX">Mexico</option>
                  <option value="US">United States</option>
                </select>
              </div>
            </div>
          </section>

          <aside className="md:col-span-4">
            <div className="md:sticky md:top-24">
              <div className="mb-4 md:hidden">
                <button onClick={() => setShowSummaryOnMobile((s) => !s)} className="w-full p-3 border rounded">{showSummaryOnMobile ? 'Hide order summary' : 'Show order summary'}</button>
              </div>

              {(showSummaryOnMobile || typeof window !== 'undefined' && window.innerWidth >= 768) && (
                <div className="bg-gray-50 p-6 rounded">
                  <div className="flex flex-col gap-4">
                    {cartItems.length === 0 ? (
                      <div className="text-sm">Your cart is empty</div>
                    ) : (
                      cartItems.map((ci, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div style={{ aspectRatio: '3 / 4', width: 72 }}>
                            <img src={ci.image ?? '/SHOP/Pa_01.jpg'} alt={ci.name} className="w-full h-full object-cover rounded" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{ci.name}</div>
                            <div className="text-sm text-muted-foreground">Qty: {ci.quantity}</div>
                            <div className="text-sm text-muted-foreground">${(ci.price * ci.quantity).toFixed(0)}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${(subtotal / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span>Shipping</span>
                      <span>${(shipping / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-bold mt-4">
                      <span>Total</span>
                      <span>${(total / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
    </>
  )
}
