"use client"
import { Header } from "@/components/header"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "@/lib/translations"

export default function ContactPage() {
  const [flash, setFlash] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[90px] flex flex-col items-center bg-background text-foreground" style={{ filter: flash ? 'invert(1)' : 'none', transition: 'filter 200ms ease' }}>

        <div className="max-w-xl mt-0 px-4" style={{ maxWidth: 'calc(36rem - 100px)' }}>
          <Link href="/">
            <img
              src="/Front/PP-LOGO-LTTRNG-A-02.png"
              alt="Platano Logo"
              className="mx-auto w-40 md:w-56 object-contain transform -translate-y-[50px] cursor-pointer"
            />
          </Link>
          <p className="-mt-10 text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-left">
            {t("contactHeading")}
          </p>
          <p className="text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-right mt-8">
            {t("contactSubheading")}
          </p>

          <p className="mt-6 text-sm md:text-base text-[#d6d6d6]" style={{ textAlign: 'justify' }}>
            {t("contactIntro")}
          </p>

          <div className="mt-6">
            <form
              className="flex flex-col gap-3"
              onSubmit={async (e) => {
                e.preventDefault()
                setSubmitting(true)
                setStatus(null)
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message }),
                  })
                  const json = await res.json()
                  if (res.ok) {
                    setStatus('Message sent — thanks!')
                    setName('')
                    setEmail('')
                    setMessage('')
                  } else {
                    setStatus(json?.error || 'Failed to send message')
                  }
                } catch (err) {
                  setStatus('Failed to send message')
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("placeholderName")} className="px-3 py-2 bg-transparent border border-[#454545] text-white" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("placeholderEmail")} className="px-3 py-2 bg-transparent border border-[#454545] text-white" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t("placeholderMessage")} className="px-3 py-2 bg-transparent border border-[#454545] text-white h-32" />
              <button
                type="submit"
                className="mt-2 py-2 bg-white text-black font-medium mb-12"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : t("sendButton")}
              </button>
              {status && <p className="text-sm mt-2">{status}</p>}
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
