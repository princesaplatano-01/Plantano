import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 flex flex-col items-center bg-background text-foreground">
        <div className="mt-8">
          <img
            src="/Front/PP-LOGO-STKR-01.png"
            alt="PP Logo"
            className="mx-auto w-40 md:w-56 object-contain"
          />
        </div>
        <div className="max-w-xl mt-8 px-4">
          <p className="text-lg md:text-xl italic font-semibold text-[#e6e6e6] text-left">
            Princesa Plátano is an ode to my inner child that's what I used to call myself.
          </p>
          <p className="text-lg md:text-xl italic font-semibold text-[#e6e6e6] text-right mt-4">
            Now it's a brand that celebrates being different and unique.
          </p>

          <p className="mt-6 text-sm md:text-base text-[#d6d6d6]" style={{ textAlign: 'justify' }}>
            Princesa Plátano creates one of a kind pieces, handmade in Mexico. Crafted with global treasures I’ve discovered through my adventures around the world. Each piece is eclectic, special, and truly unique. <span className="font-semibold">No repeats. No copies.</span>
          </p>
        </div>
      </main>
    </>
  )
}
