"use client"

import React, { useState, useEffect, useRef } from "react"
import { useCart } from "@/components/cart"
import { Header } from "@/components/header"
import Link from "next/link"
import getStripe from '@/lib/stripe'
import GooglePayButton from '@/components/google-pay-button'
import { useTranslation } from '@/lib/translations'

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
  phoneCountryCode: string
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
  phoneCountryCode: "+52",
  emailOrPhone: "",
  emailOffers: false,
}

const MEX_STATES = [
  'Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Coahuila','Colima','Ciudad de México','Durango','Guanajuato','Guerrero','Hidalgo','Jalisco','Estado de México','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'
]

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
]

function ExpressCheckoutBox({ children, onCheckout, label }: { children?: React.ReactNode; onCheckout?: () => Promise<void> | (() => void); label?: string }) {
  const [inverted, setInverted] = useState(false)

  async function handleClick() {
    setInverted(true)
    try {
      await onCheckout?.()
    } catch (e) {
      // allow error handling in caller
    } finally {
      setTimeout(() => setInverted(false), 200)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => { e.preventDefault(); handleClick() }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
      className={`py-2 px-4 rounded shadow click-invert ${inverted ? 'inverted' : ''} bg-[#f1ec48] hover:bg-[#e6e03f] transition-colors`}>
      <div className="font-bold uppercase mb-2 text-sm text-center">{label ?? 'PAY NOW'}</div>
      <div className="flex gap-2 items-center">
        <div className="flex-1" />
        <div className="flex-shrink-0">{children}</div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const [form, setForm] = useState<FormState>(defaultForm)
  const [shippingReady, setShippingReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSummaryOnMobile, setShowSummaryOnMobile] = useState(false)
  const [summaryLocked, setSummaryLocked] = useState(false)

  const { items: cartItems, subtotal: cartSubtotal, itemCount } = useCart()
  // store amounts in centavos (smallest MXN unit)
  function computeShippingAmount(form: FormState) {
    if (form.country === 'US') return 250 * 100
    // Mexico
    if (form.country === 'MX') {
      // exact match for Ciudad de México
      if ((form.state || '').toLowerCase() === 'ciudad de méxico' || (form.state || '').toLowerCase() === 'ciudad de mexico') return 100 * 100
      return 150 * 100
    }
    // fallback
    return 200 * 100
  }
  const shipping = form.shippingMethod === "ship" ? computeShippingAmount(form) : 0
  const subtotal = cartSubtotal
  const total = subtotal + shipping
  const currencyFormatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })
  
  const [isClient, setIsClient] = useState(false)
  const { t } = useTranslation()

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }))
  }

  function validateShippingForm() {
    const required: (keyof FormState)[] = ['firstName', 'lastName', 'address', 'city', 'postalCode', 'country']
    for (const k of required) {
      const val = (form as any)[k]
      if (!val || String(val).trim() === '') return false
    }
    return true
  }

  function continueToShipping() {
    if (!validateShippingForm()) {
      alert('Please complete the required shipping fields before continuing.')
      return
    }
    setShippingReady(true)
    // On mobile, open the order summary so users see the PAY NOW box
    try {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setShowSummaryOnMobile(true)
        setSummaryLocked(true)
      }
    } catch (e) {}
    // small UX: scroll to order summary
    try { document.querySelector('aside')?.scrollIntoView({ behavior: 'smooth' }) } catch (e) {}
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
    setIsClient(true)
    return () => {}
  }, [])
 

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    function logger(e: MouseEvent) {
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
      // If cart items include Stripe price IDs, use the price-id Checkout Sessions endpoint
      const hasPriceIds = cartItems.length > 0 && cartItems.every((it: any) => Boolean((it as any).priceId || (it as any).price_id))
      if (hasPriceIds) {
        const items = cartItems.map((it: any) => ({ priceId: it.priceId || it.price_id, quantity: it.quantity }))
        const res = await fetch('/api/checkout_sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, form }),
        })
        const data = await res.json()
        if (data.url) {
          window.location.href = data.url
          return
        } else {
          alert('Unable to create checkout session (priceId flow). Check server logs.')
          return
        }
      }

      // Fallback: existing name/price flow
      const res = await fetch("/api/checkout", {
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
            {/* Left-side action buttons moved to right sidebar (Express Checkout) */}

            <div className="bg-white p-6 shadow rounded">
              <div className="mb-6">
                <h2 className="text-sm font-semibold uppercase">{t('contact')}</h2>
                <div className="mt-4">
                  <input
                    value={form.emailOrPhone}
                    onChange={(e) => update('emailOrPhone', e.target.value)}
                    placeholder={t('emailOrPhone')}
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
                  <label htmlFor="email-offers" className="ml-2 block text-sm text-gray-900">{t('sendNewsOffers')}</label>
                </div>
              </div>
              <h2 className="text-sm font-semibold uppercase">{t('delivery')}</h2>
              <div className="mt-4 flex gap-3">
                <ClickableLabel className={`flex-1 p-3 border rounded cursor-pointer ${form.shippingMethod === 'ship' ? 'bg-gray-100' : ''}`}>
                  <input type="radio" name="shipping" checked={form.shippingMethod === 'ship'} onChange={() => update('shippingMethod', 'ship')} className="hidden" />
                  <div className="text-sm font-medium">{t('ship')}</div>
                </ClickableLabel>
              </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder={t('firstName')} className="p-3 border rounded h-12" />
                  <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder={t('lastName')} className="p-3 border rounded h-12" />
                  <input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder={t('address')} className="p-3 border rounded md:col-span-2 h-12" />
                  <input value={form.apartment} onChange={(e) => update('apartment', e.target.value)} placeholder={t('apartmentOptional')} className="p-3 border rounded md:col-span-2 h-12" />
                  <input value={form.city} onChange={(e) => update('city', e.target.value)} placeholder={t('city')} className="p-3 border rounded h-12" />
                  <input value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} placeholder={t('postalCode')} className="p-3 border rounded h-12" />
                  <select value={form.state} onChange={(e) => update('state', e.target.value)} className="p-3 border rounded h-12">
                    {(form.country === 'US' ? US_STATES : MEX_STATES).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                    <select value={form.phoneCountryCode} onChange={(e) => update('phoneCountryCode', e.target.value)} className="p-3 border rounded w-20 h-12 box-border">
                      <option value="+52">+52 MX</option>
                      <option value="+1">+1 US</option>
                      <option value="+44">+44 UK</option>
                      <option value="+34">+34 ES</option>
                    </select>
                    <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder={t('phoneLabel')} className="p-3 border rounded h-12 box-border w-full" />
                  </div>
                  <select value={form.country} onChange={(e) => update('country', e.target.value)} className="p-3 border rounded md:col-span-2 h-12">
                    <option value="MX">Mexico</option>
                    <option value="US">United States</option>
                  </select>
                </div>
                <div className="mt-6">
                  <button onClick={continueToShipping} className="w-full py-3 bg-black text-white uppercase font-semibold">{t('continueToShipping')}</button>
                </div>
            </div>
          </section>

          <aside className="md:col-span-4">
            <div className="md:sticky md:top-24">
              {!summaryLocked && (
                <div className="mb-4 md:hidden">
                  <button onClick={() => setShowSummaryOnMobile((s) => !s)} className="w-full p-3 rounded bg-[#f8fa41] text-black font-medium">{showSummaryOnMobile ? t('hideOrderSummary') : t('showOrderSummary')}</button>
                </div>
              )}

              {(showSummaryOnMobile || (isClient && window.innerWidth >= 768)) && (
                <div className="bg-gray-50 p-6 rounded">
                  <div className="flex flex-col gap-4">
                    {cartItems.length === 0 ? (
                      <div className="text-sm">{t('cartEmpty')}</div>
                    ) : (
                      cartItems.map((ci, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div style={{ aspectRatio: '3 / 4', width: 72 }}>
                            <img src={ci.image ?? '/SHOP/Pa_01.jpg'} alt={ci.name} className="w-full h-full object-cover rounded" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{ci.name}</div>
                            <div className="text-sm text-muted-foreground">{t('qtyPrefix')} {ci.quantity}</div>
                            <div className="text-sm text-muted-foreground">{currencyFormatter.format((ci.price * ci.quantity) / 100)}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                    <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span>{t('subtotal')}</span>
                      <span>{currencyFormatter.format(subtotal / 100)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span>{t('shippingLabel')}</span>
                      <span>{currencyFormatter.format(shipping / 100)}</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-bold mt-4">
                      <span>{t('totalLabel')}</span>
                      <span>{currencyFormatter.format(total / 100)}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    {shippingReady ? (
                      <ExpressCheckoutBox onCheckout={createCheckoutSession} label={t('payNow')}>
                        <GooglePayButton amount={total} />
                      </ExpressCheckoutBox>
                    ) : (
                      <div className="py-2 px-4 rounded shadow bg-gray-100 text-center text-sm text-gray-500">{t('completeShippingInfo')}</div>
                    )}
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
