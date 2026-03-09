"use client"

import Link from "next/link"
import { Instagram } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function Footer() {
  const { t } = useTranslation()

  const shopLinks = [
    { nameKey: "newIn" as const, href: "#" },
    { nameKey: "sale" as const, href: "#" },
    { nameKey: "bestsellers" as const, href: "#" },
  ]

  const helpLinks = [
    { nameKey: "shippingReturns" as const, href: "#" },
    { nameKey: "contactUs" as const, href: "#" },
  ]

  const aboutLinks = [
    { nameKey: "ourStory" as const, href: "#" },
    { nameKey: "sustainability" as const, href: "#" },
  ]

  return (
    <footer className="py-10 md:py-14 px-4 md:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Shop Links */}
          <div>
            <h3 className="text-[11px] tracking-wider mb-4 uppercase">{t("shop")}</h3>
            <nav className="flex flex-col gap-2">
              {shopLinks.map((link) => (
                <Link 
                  key={link.nameKey}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(link.nameKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-[11px] tracking-wider mb-4 uppercase">{t("help")}</h3>
            <nav className="flex flex-col gap-2">
              {helpLinks.map((link) => (
                <Link 
                  key={link.nameKey}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(link.nameKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-[11px] tracking-wider mb-4 uppercase">{t("about")}</h3>
            <nav className="flex flex-col gap-2">
              {aboutLinks.map((link) => (
                <Link 
                  key={link.nameKey}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(link.nameKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-[11px] tracking-wider mb-4 uppercase">{t("followUs")}</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Instagram">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold tracking-[0.15em]">
            PLATANO
          </Link>
          <div className="flex flex-wrap justify-center gap-4 text-[10px] text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">{t("privacyPolicy")}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t("termsOfService")}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t("cookies")}</Link>
            <span>{new Date().getFullYear()} PLATANO</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
