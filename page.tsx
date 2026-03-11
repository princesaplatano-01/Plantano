import { Header } from "@/components/header"
import Link from "next/link"

export default function SalePage() {
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
        <div className="flex-grow flex items-center justify-center -mt-20">
          <p className="text-xl md:text-2xl text-[#d6d6d6]">No sales yet.</p>
        </div>
      </main>
    </>
  )
}