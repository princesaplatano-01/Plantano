import { Header } from "@/components/header"
import Link from "next/link"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[90px] flex flex-col items-center bg-background text-foreground">
        <div className="mt-8">
          <Link href="/">
            <img
              src="/Front/Princesa%20pl%C3%A1tano%20ct%C3%A1logo%20neckless.JPG"
              alt="Princesa Plátano catalog"
              className="mx-auto w-40 md:w-56 object-contain transform -translate-y-[90px] cursor-pointer"
            />
          </Link>
        </div>

        <div className="max-w-xl mt-0 px-4" style={{ maxWidth: 'calc(36rem - 100px)' }}>
          <p className="-mt-10 text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-left">
            Contact
          </p>
          <p className="text-xl md:text-2xl italic font-semibold text-[#f2f2f2] text-right mt-8">
            We're here to help.
          </p>

          <p className="mt-6 text-sm md:text-base text-[#d6d6d6]" style={{ textAlign: 'justify' }}>
            For inquiries, collaborations or custom pieces, please reach out via email at <a href="mailto:hello@princesaplatano.com" className="underline">hello@princesaplatano.com</a> or use the contact form below.
          </p>

          <div className="mt-6">
            <form className="flex flex-col gap-3">
              <input placeholder="Your name" className="px-3 py-2 bg-transparent border border-[#454545] text-white" />
              <input placeholder="Your email" className="px-3 py-2 bg-transparent border border-[#454545] text-white" />
              <textarea placeholder="Message" className="px-3 py-2 bg-transparent border border-[#454545] text-white h-32" />
              <button type="button" className="mt-2 py-2 bg-white text-black font-medium mb-12">Send</button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
