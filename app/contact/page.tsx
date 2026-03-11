"use client"
import { Header } from "@/components/header"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "@/lib/translations"

export default function ContactPage() {
  const [flash, setFlash] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[90px] flex flex-col items-center bg-background text-foreground" style={{ filter: flash ? 'invert(1)' : 'none', transition: 'filter 200ms ease' }}>

        <div className="max-w-xl mt-0 px-4" style={{ maxWidth: 'calc(36rem - 100px)' }}>
          <Link href="/">
            <img
              src="/Front/Princesa%20pl%C3%A1tano%20ct%C3%A1logo%20neckless.JPG"
              alt="Princesa Plátano catalog"
              className="mx-auto w-full object-contain transform -translate-y-[90px] cursor-pointer"
            />
          </Link>
          <p className="-mt-10 text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-left">
            {t("contactHeading")}
          </p>
          <p className="text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-right mt-8">
            {t("contactSubheading")}
          </p>

          <p className="mt-6 text-sm md:text-base text-[#d6d6d6]" style={{ textAlign: 'justify' }}>
            {t("contactIntro")} <a href="mailto:hello@princesaplatano.com" className="underline">hello@princesaplatano.com</a>
          </p>

          <div className="mt-6">
            <form className="flex flex-col gap-3">
              <input placeholder={t("placeholderName")} className="px-3 py-2 bg-transparent border border-[#454545] text-white" />
              <input placeholder={t("placeholderEmail")} className="px-3 py-2 bg-transparent border border-[#454545] text-white" />
              <textarea placeholder={t("placeholderMessage")} className="px-3 py-2 bg-transparent border border-[#454545] text-white h-32" />
              <button
                type="button"
                className="mt-2 py-2 bg-white text-black font-medium mb-12"
                onClick={() => {
                  setFlash(true)
                  setTimeout(() => setFlash(false), 200)
                }}
              >
                {t("sendButton")}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
