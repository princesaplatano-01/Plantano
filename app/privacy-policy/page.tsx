"use client"

import Link from "next/link"
import { X } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <main className="relative max-w-2xl mx-auto py-16 px-4 text-[#dbdbdb] text-justify">
      <Link
        href="/"
        aria-label="Close privacy policy"
        className="absolute top-6 right-6 text-[#dbdbdb] hover:opacity-80 transition-opacity"
      >
        <X size={20} strokeWidth={1.5} />
      </Link>

      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Privacy policy</h1>

      <h2 className="text-sm font-semibold mb-2">THE INFORMATION THAT PRINCESA PLÁTANO COLLECTS, AND HOW IT IS COLLECTED:</h2>
      <p className="mb-4">
        Princesa Plátano collects personal information and anonymous information from you when you visit the site, create an account, submit a request or place an order. "Personal Information" means information that can be used to identify a particular individual or Site user, including, for example, your name, address, telephone number, e-mail address, user name, and any information about you that is associated with or linked to any of the foregoing information, such as your IP address or geographic location information. "Anonymous Information" means information that is not associated with or linked to your Personal Information and which cannot be used to identify an individual. Hana collects and uses Personal Information and Anonymous Information as described in this Privacy Policy.
      </p>

      <h2 className="text-sm font-semibold mb-2">USER PROVIDED INFORMATION:</h2>
      <p className="mb-4">
        You may voluntarily provide personal information such as your name, email address, postal address, phone number, or credit card information when placing orders or participating in various activities on the site. Hana may also collect your email address if you choose to sign up for email communications or newsletters from the brand.
      </p>
    </main>
  )
}
