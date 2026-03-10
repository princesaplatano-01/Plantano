import { Header } from "@/components/header"
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[90px] flex flex-col items-center bg-background text-foreground">
        <div className="mt-8">
          <Link href="/">
            <img
              src="/Front/PP-LOGO-STKR-01.png"
              alt="PP Logo"
              className="mx-auto w-full object-contain transform -translate-y-[90px] cursor-pointer"
              style={{ maxWidth: 'calc(36rem - 100px)' }}
            />
          </Link>
        </div>
        <div className="max-w-xl mt-0 px-4" style={{ maxWidth: 'calc(36rem - 100px)' }}>
          <p className="-mt-10 text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-left">
            Princesa Plátano is an ode to my inner child that's what I used to call myself.
          </p>
          <p className="text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-right mt-8">
            Now it's a brand that celebrates being different and unique.
          </p>

          <p className="mt-6 text-sm md:text-base text-[#d6d6d6]" style={{ textAlign: 'justify' }}>
            Princesa Plátano creates one of a kind pieces, handmade in Mexico. Crafted with global treasures I’ve discovered through my adventures around the world. Each piece is eclectic, special, and truly unique.
          </p>
          <p className="mt-2 text-sm md:text-base text-[#d6d6d6] font-semibold">
            No repeats. No copies.
          </p>
        </div>
      </main>
    </>
  )
}
