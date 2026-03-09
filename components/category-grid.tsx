"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

const categoryKeys = [
  { key: "sneakers", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80" },
  { key: "balletFlats", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80" },
  { key: "loafers", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80" },
  { key: "barefoot", image: "https://images.unsplash.com/photo-1560343090-f0409e644b44?w=400&q=80" },
  { key: "boots", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80" },
  { key: "sandals", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80" },
  { key: "heels", image: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400&q=80" },
] as const

export function CategoryGrid() {
  const { t } = useTranslation()

  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <h2 className="text-lg md:text-xl font-medium text-center mb-6">{t("ourCategories")}</h2>

      {/* Horizontal scrolling categories (flexbox) */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {categoryKeys.map((category) => (
          <Link key={category.key} href="#" className="flex-shrink-0 w-44 md:w-56 group">
            <div className="relative w-44 md:w-56 h-32 md:h-40 overflow-hidden rounded-lg bg-muted">
              <Image
                src={category.image}
                alt={t(category.key)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-xs md:text-sm text-center capitalize mt-2 group-hover:underline">
              {t(category.key)}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
