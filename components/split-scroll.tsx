"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/translations"

export function SplitScroll() {
  const router = useRouter()

  const { t } = useTranslation()

  return (
    <section aria-label="Split scroll section" className="w-full">
      {/*
        Desktop: two columns, right column height = 3 * 100vh so the left sticky
        image remains visible while the right column is scrolled through.
        Mobile: stacked vertically (no sticky behavior).
      */}

      <div className="md:grid md:grid-cols-2 md:h-[300vh]">
        {/* Left column: sticky image (only on md and up) */}
        <div className="md:sticky md:top-0 md:h-screen">
          <img
            src="/SCROLL/IMG_3221%20a.jpg"
            alt="Sticky artwork"
            className="w-full h-screen object-cover"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right column: stacked items that scroll normally */}
        <div className="flex flex-col items-center">
          <div className="min-h-[60vh] w-full md:h-screen md:w-1/2 mb-[15vh]">
            <img
              src="/SC26/gif%20collar.gif"
              alt="Collar GIF"
              className="w-full h-auto object-contain cursor-pointer"
              style={{ objectFit: "contain", aspectRatio: "3 / 4" }}
              onClick={() => router.push('/new-in')}
            />
             <div className="mt-6 text-center">
               <div
                 role="button"
                 tabIndex={0}
                 onClick={() => router.push('/new-in')}
                 onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/new-in') }}
                 className="text-lg font-semibold text-[#dbdbdb] cursor-pointer"
               >
                {t('theDrop')}
               </div>
               <div className="mt-4">
                 <span
                   role="button"
                   tabIndex={0}
                   onClick={() => router.push('/new-in')}
                   onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/new-in') }}
                   className="inline-block px-4 py-1 border border-[#dbdbdb] text-[#dbdbdb] rounded-md cursor-pointer"
                 >
                  {t('shopNow')}
                 </span>
               </div>
             </div>
          </div>

          <div className="min-h-[60vh] w-full md:h-screen md:w-1/2 mb-[15vh]">
            <img
              src="/SCROLL/DSC07425.jpg"
              alt="Right item 2"
              className="w-full h-auto object-cover cursor-pointer"
              style={{ objectFit: "cover", aspectRatio: "3 / 4" }}
              onClick={() => router.push('/s26')}
            />
             <div className="mt-6 text-center">
               <div
                 role="button"
                 tabIndex={0}
                 onClick={() => router.push('/s26')}
                 onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/s26') }}
                 className="text-lg font-semibold text-[#dbdbdb] cursor-pointer"
               >
                {t('sacredSpring')}
               </div>
               <div className="mt-4">
                <span className="inline-block px-4 py-1 border border-[#dbdbdb] text-[#dbdbdb] rounded-md">{t('shopNow')}</span>
               </div>
             </div>
          </div>

          <div className="min-h-[60vh] w-full md:h-screen md:w-1/2" style={{ transform: 'translateY(-60px)' }}>
            <img
              src="/SCROLL/DSC07821.jpg"
              alt="Right item 3"
              className="w-full h-auto object-cover cursor-pointer"
              style={{ objectFit: "cover", aspectRatio: "3 / 4" }}
              role="button"
              tabIndex={0}
              onClick={() => router.push('/about')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/about') }}
            />
               <div className="mt-6 text-center">
                 <div
                   role="button"
                   tabIndex={0}
                   onClick={() => router.push('/about')}
                   onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/about') }}
                   className="text-lg font-semibold text-[#dbdbdb] cursor-pointer"
                 >
                 {t('aboutPrincesaPlatanoHome')}
                 </div>
                 <div className="mt-4">
                  <span className="inline-block px-4 py-1 border border-[#dbdbdb] text-[#dbdbdb] rounded-md">{t('shopNow')}</span>
                 </div>
               </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SplitScroll
