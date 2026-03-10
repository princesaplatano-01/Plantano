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
        <div className="max-w-3xl mt-8 px-4 text-center">
          {/* About content goes here */}
        </div>
      </main>
    </>
  )
}
