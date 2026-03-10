"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"

export default function S26Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 py-12 px-4 md:px-8 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <Image src="/Front/PP-LOGO-LTTRNG-A-02.png" alt="S26" width={192} height={50} className="object-contain" />
          </div>

          <h1 className="text-xl md:text-2xl font-semibold mb-6 italic text-[#dbdbdb]">S26 Collection</h1>

          <p className="text-sm text-muted-foreground">This is a placeholder page for the S26 Collection. Add content here.</p>
        </div>
      </main>
    </>
  )
}
