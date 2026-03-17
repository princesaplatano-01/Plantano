"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[90px] pb-24 md:pb-40 flex flex-col items-center bg-background text-foreground">
        <div className="mt-8">
          <Link href="/">
            <img
              src="/SCROLL/DSC07821%203.png"
              alt="PP Logo"
              className="mx-auto w-full max-w-[calc(36rem-100px)] object-contain cursor-pointer"
              style={{ transform: 'translateY(-120px) scale(0.8)' }}
            />
          </Link>
        </div>
        <div className="max-w-xl mt-0 px-4" style={{ maxWidth: 'calc(36rem - 100px)', transform: 'translateY(-90px)' }}>
          <p className="-mt-[30px] md:mt-0 text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-left">
            {t("aboutHeading1")}
          </p>
          <p className="text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-right mt-8">
            {t("aboutHeading2")}
          </p>

          <p className="mt-6 text-sm md:text-base text-[#d6d6d6]" style={{ textAlign: 'justify' }}>
            {t("aboutPara1")}
          </p>
            {/* short tagline removed */}
        </div>
      </main>
    </>
  )
}
