"use client"

import Link from "next/link"
import { X } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <main className="relative max-w-2xl mx-auto py-16 px-4 text-[#dbdbdb] text-justify">
      <Link
        href="/"
        aria-label="Close terms of service"
        className="absolute top-6 right-6 text-[#dbdbdb] hover:opacity-80 transition-opacity"
      >
        <X size={20} strokeWidth={1.5} />
      </Link>

      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Terms of Service</h1>

      <h2 className="text-sm font-semibold mb-2">OVERVIEW</h2>
      <p className="mb-4">
        This website is operated by Princesa Plátano Jewelry. Throughout the site, the terms “we”, “us” and “our” refer to Princesa Plátano Jewelry. Princesa Plátano Jewelry offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
      </p>

      <p className="mb-4">
        By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
      </p>

      <p className="mb-4">
        Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
      </p>

      <h3 className="text-sm font-semibold mb-2">SECTION 1 - ONLINE STORE TERMS</h3>
      <p className="mb-4">
        By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
      </p>

      <h3 className="text-sm font-semibold mb-2">SECTION 2 - GENERAL CONDITIONS</h3>
      <p className="mb-4">
        We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted. Credit card information is always encrypted during transfer over networks.
      </p>

      <h3 className="text-sm font-semibold mb-2">SECTION 3 - ACCURACY OF INFORMATION</h3>
      <p className="mb-4">
        We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions.
      </p>

      <h3 className="text-sm font-semibold mb-2">SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</h3>
      <p className="mb-4">
        Prices for our jewelry are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice.
      </p>

      <h3 className="text-sm font-semibold mb-2">SECTION 5 - PRODUCTS OR SERVICES</h3>
      <p className="mb-4">
        Certain jewelry pieces may be available exclusively online through the website. These products may have limited quantities and are subject to return or exchange only according to our Return Policy. We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.
      </p>

      <h3 className="text-sm font-semibold mb-2">SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h3>
      <p className="mb-4">
        We reserve the right to refuse any order you place with us. You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.
      </p>

      <h3 className="text-sm font-semibold mb-2">SECTION 7 - PERSONAL INFORMATION</h3>
      <p className="mb-4">
        Your submission of personal information through the store is governed by our Privacy Policy.
      </p>

      <h3 className="text-sm font-semibold mb-2">SECTION 8 - PROHIBITED USES</h3>
      <p className="mb-4">
        In addition to other prohibitions, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (c) to harass, abuse, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability.
      </p>

      <h3 className="text-sm font-semibold mb-2">SECTION 9 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h3>
      <p className="mb-4">
        In no case shall Princesa Plátano Jewelry, our directors, officers, employees, or affiliates be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind arising from your use of any of the service or any products procured using the service.
      </p>

      <h3 className="text-sm font-semibold mb-2">SECTION 10 - CONTACT INFORMATION</h3>
      <p className="mb-4">
        Questions about the Terms of Service should be sent to us at: [Insert Your Preferred Email Here].
      </p>
    </main>
  )
}
