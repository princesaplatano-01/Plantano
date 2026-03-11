"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

export default function SalePage() {
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[90px] flex flex-col items-center bg-background text-foreground">
        <div className="mt-8">
          <Link href="/">
            <img
              src="/Front/PP-LOGO-LTTRNG-A-02.png"
              alt="PP Logo"
              className="mx-auto w-40 md:w-56 object-contain transform -translate-y-[90px] cursor-pointer"
            />
          </Link>
        </div>
        <div className="max-w-xl mt-0 px-4" style={{ maxWidth: 'calc(36rem - 100px)' }}>
          <p className="-mt-10 text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-left">
            {t("saleMessage")}
          </p>
        </div>
      </main>
    </>
  )
}
