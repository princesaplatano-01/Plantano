"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useTranslation } from "@/lib/translations"

const products = [
  {
    id: 1,
    name: "Rosalind All Studs Black Leather Ballet Flats",
    price: 180,
    salePrice: 126,
    colors: 14,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
    badgeKey: "preOrder" as const,
    badgeColor: "bg-foreground text-background",
  },
  {
    id: 2,
    name: "Sway Chestnut Brown Leather Ballet Flats",
    price: 160,
    salePrice: null,
    colors: 10,
    image: "https://images.unsplash.com/photo-1560343090-f0409e644b44?w=500&q=80",
    badgeKey: "inStock" as const,
    badgeColor: "bg-muted text-foreground",
  },
  {
    id: 3,
    name: "Tb.490 Club Patent Deep Burgundy Leather Sneakers",
    price: 200,
    salePrice: null,
    colors: 13,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
    badgeKey: "inStock" as const,
    badgeColor: "bg-muted text-foreground",
  },
  {
    id: 4,
    name: "Marina Camel Suede Loafers",
    price: 175,
    salePrice: 140,
    colors: 8,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&q=80",
    badgeKey: "sale" as const,
    badgeColor: "bg-foreground text-background",
  },
]

export function ProductGrid() {
  const { t } = useTranslation()

  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <h2 className="text-lg md:text-xl font-medium text-center mb-10">{t("topFinds")}</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-4 overflow-visible">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative inline-block will-change-transform transform-gpu transition-all duration-300 ease-out hover:scale-[1.03] hover:z-50 hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
          >
            <div className="relative aspect-square bg-muted mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button 
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Add to wishlist"
              >
                <Heart size={18} strokeWidth={1.5} />
              </button>
              {product.badgeKey && (
                <span className={`absolute bottom-3 left-3 px-2 py-1 text-[10px] tracking-wide ${product.badgeColor}`}>
                  {t(product.badgeKey)}
                </span>
              )}
            </div>
            <h3 className="text-xs md:text-sm mb-1.5 leading-tight">
              <Link href={`/new-in/${product.id}`} className="hover:underline">{product.name}</Link>
            </h3>
            <div className="flex items-center gap-2 text-xs">
              {product.salePrice ? (
                <>
                  <span className="text-accent font-medium">{"€"}{product.salePrice.toFixed(2).replace(".", ",")}</span>
                  <span className="text-muted-foreground line-through">{"€"}{product.price.toFixed(2).replace(".", ",")}</span>
                </>
              ) : (
                <span>{"€"}{product.price.toFixed(2).replace(".", ",")}</span>
              )}
              <span className="text-muted-foreground">+{product.colors} {t("colors")}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
