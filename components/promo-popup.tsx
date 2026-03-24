"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation()

  useEffect(() => {
    // If user already subscribed, don't show the popup
    try {
      const subscribed = localStorage.getItem('newsletterSubscribed') === 'true'
      if (subscribed) {
        setIsDismissed(true)
        return
      }
    } catch (err) {
      // ignore storage errors
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isDismissed || !isVisible) return null

  return (
    <>
      {!showMenu && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="relative bg-foreground text-background p-2 shadow-lg min-w-[120px]">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 hover:opacity-70 transition-opacity text-[#dcdcdc]"
              aria-label="Close popup"
            >
              <X size={12} strokeWidth={1.5} />
            </button>
              <div className="block text-center cursor-pointer" onClick={() => setShowMenu(true)}>
              <p className="text-lg font-semibold tracking-wide mb-0" style={{ color: '#dcdcdc' }}>10% OFF</p>
            </div>
          </div>
        </div>
      )}
      {showMenu && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="relative bg-foreground text-background p-4 shadow-2xl flex flex-col items-center max-w-xs rounded-lg">
            <button
              onClick={() => setShowMenu(false)}
              className="absolute top-2 right-2 hover:opacity-70 transition-opacity text-[#dcdcdc]"
              aria-label="Close menu"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
            {!submitted ? (
              <>
                <p className="text-sm mb-2 text-center" style={{ color: '#dcdcdc' }}>BE THE FIRST TO DISCOVER OUR NEW ARRIVALS—SUBSCRIBE NOW</p>
                <form
                  className="flex flex-col items-center w-full"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const response = await fetch('/api/subscribe', {
                        method: 'POST',
                        body: JSON.stringify({ email }),
                        headers: { 'Content-Type': 'application/json' },
                      })

                      if (response.ok) {
                        try {
                          localStorage.setItem('newsletterSubscribed', 'true')
                        } catch (err) {
                          // ignore
                        }
                        setSubmitted(true)
                        alert('Check your inbox! ✨')
                      } else {
                        const json = await response.json().catch(() => ({}))
                        console.error('Subscribe API error:', json?.error)
                        alert('Subscription failed')
                      }
                    } catch (err) {
                      alert('Subscription failed')
                    }
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="mb-2 px-3 py-1 rounded border border-border w-full text-sm text-white bg-transparent placeholder:text-[#dcdcdc]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-background text-[#dcdcdc] rounded border border-border hover:bg-muted transition text-xs"
                  >
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <p className="text-center text-sm text-white">You're in! Check your email.</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
