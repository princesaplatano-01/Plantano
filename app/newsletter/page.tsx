"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 text-sm hover:opacity-60 transition-opacity">
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="hidden md:inline">{t("backToShop")}</span>
        </Link>
        <span className="text-lg font-semibold tracking-[0.2em]">PLATANO</span>
        <div className="w-20" />
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center">
          {!isSubmitted ? (
            <>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-4">
                {t("get10Off")}
              </h1>
              <p className="text-muted-foreground text-sm tracking-wide mb-8">
                {t("newsletterDesc")}
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("enterEmail")}
                  required
                  className="w-full px-4 py-3 border border-border bg-transparent text-sm tracking-wide placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-foreground text-background py-3 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
                >
                  {t("subscribe")}
                </button>
              </form>
              <p className="text-[10px] text-muted-foreground mt-6 tracking-wide">
                {t("bySubscribing")}
              </p>
            </>
          ) : (
            <div className="animate-in fade-in duration-500">
              <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-6">
                <Check size={28} strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
                {t("thankYou")}
              </h1>
              <p className="text-muted-foreground text-sm tracking-wide mb-8">
                {t("thankYouDesc")}
              </p>
              <Link 
                href="/"
                className="inline-block bg-foreground text-background px-8 py-3 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                {t("startShopping")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
