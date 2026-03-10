"use client"

import React, { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export function SplitScroll() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el || typeof IntersectionObserver === "undefined") return

    el.muted = true
    el.loop = true
    el.playsInline = true

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            el.play().catch(() => {})
          } else {
            el.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.5] }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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
          <div className="h-screen w-full md:w-1/2 mb-[15vh]">
            <img
              src="/SCROLL/DSC08190.jpg"
              alt="Right item 1"
              className="w-full h-auto object-cover cursor-pointer"
              style={{ objectFit: "cover", aspectRatio: "3 / 4" }}
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
                 THE DROP
               </div>
               <div className="mt-4">
                 <span
                   role="button"
                   tabIndex={0}
                   onClick={() => router.push('/new-in')}
                   onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push('/new-in') }}
                   className="inline-block px-4 py-1 border border-[#dbdbdb] text-[#dbdbdb] rounded-md cursor-pointer"
                 >
                   SHOP NOW
                 </span>
               </div>
             </div>
          </div>

          <div className="h-screen w-full md:w-1/2 mb-[15vh]">
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
                 SACRED SPRING
               </div>
               <div className="mt-4">
                 <span className="inline-block px-4 py-1 border border-[#dbdbdb] text-[#dbdbdb] rounded-md">SHOP NOW</span>
               </div>
             </div>
          </div>

          <div className="h-screen w-full md:w-1/2" style={{ transform: 'translateY(-60px)' }}>
            <video
              ref={videoRef}
              src="/SCROLL/Video_Adjustment_Less_Rotation_More_Sway.mp4"
              poster="/SCROLL/DSC07548_72y.jpg"
              className="w-full h-auto object-cover"
              style={{ objectFit: "cover", aspectRatio: "3 / 4" }}
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
            />
               <div className="mt-6 text-center">
                 <div className="text-lg font-semibold text-[#dbdbdb]">ABOUT PRINCESA PLÁTANO</div>
                 <div className="mt-4">
                   <span className="inline-block px-4 py-1 border border-[#dbdbdb] text-[#dbdbdb] rounded-md">SHOP NOW</span>
                 </div>
               </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SplitScroll
