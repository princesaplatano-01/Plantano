"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

const editorialKeys = [
  {
    tagKey: "barefootFeel",
    titleKey: "barefootTitle",
    image: "https://images.unsplash.com/photo-1560343090-f0409e644b44?w=800&q=80",
  },
  {
    tagKey: "theBrooch",
    titleKey: "broochTitle",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
  },
  {
    tagKey: "kidsTable",
    titleKey: "kidsTitle",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  },
  {
    tagKey: "leDetour",
    titleKey: "detourTitle",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  },
  {
    tagKey: "backToReality",
    titleKey: "realityTitle",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
  },
  {
    tagKey: "newColorways",
    titleKey: "colorwaysTitle",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    tagKey: "layeringEdit",
    titleKey: "layeringTitle",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
  },
] as const

export function FeaturedCollection() {
  const { t } = useTranslation()

  return (
    <section className="py-8 md:py-12 px-4 md:px-6">
      <h2 className="text-lg md:text-xl font-medium text-center mb-10">{t("ourLastEdits")}</h2>
      
      {/* Large Feature */}
      <Link href="#" className="relative block h-[50vh] md:h-[70vh] overflow-hidden group mb-3">
        <Image
          src={editorialKeys[0].image}
          alt={t(editorialKeys[0].titleKey)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 max-w-lg">
          <span className="text-white/80 text-[10px] tracking-widest uppercase mb-2 block">{t(editorialKeys[0].tagKey)}</span>
          <h3 className="text-white text-xl md:text-3xl font-medium">
            {t(editorialKeys[0].titleKey)}
          </h3>
        </div>
      </Link>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {editorialKeys.slice(1).map((item) => (
          <Link key={item.tagKey} href="#" className="relative block aspect-[3/4] overflow-hidden group">
            <Image
              src={item.image}
              alt={t(item.titleKey)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 right-4">
              <span className="text-white/80 text-[9px] tracking-widest uppercase mb-1 block">{t(item.tagKey)}</span>
              <h3 className="text-white text-sm md:text-base font-medium leading-tight">
                {t(item.titleKey)}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
