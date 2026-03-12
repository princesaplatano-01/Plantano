"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

const images = [
  "/Polaroids/polar_1.jpg",
  "/Polaroids/polar_2.jpg",
  "/Polaroids/polar_3.jpg",
  "/Polaroids/polar_4.jpg",
  "/Polaroids/polar_5.jpg",
]

export function CategoryGrid() {
  const router = useRouter()
  const [hovered, setHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [layout, setLayout] = useState<Array<any>>([])

  // seed rotates/jitter stable per mount
  const seed = useMemo(() => {
    return images.map((_, i) => {
      let rotate = Number((Math.random() * 16 - 8).toFixed(2)) // -8..+8
      if (i === 0) rotate = rotate - 6
      const jitter = Math.round(Math.random() * 40 - 20)
      return { rotate, jitter, zBase: i }
    })
  }, [])

  useEffect(() => {
    function compute() {
      const el = containerRef.current
      if (!el) return
      const width = el.clientWidth || 420

      const isDesktop = width >= 1024

      // mobile / narrow: single-column large images
      // desktop: smaller, overlapping polaroids arranged across the container
      const baseImgW = isDesktop
        ? Math.max(180, Math.floor(Math.min(320, width * 0.22)))
        : Math.min(900, Math.max(240, Math.floor(width * 0.9)))

      const results = seed.map((s, i) => {
        // random small translations to make layout messy
        const tx = Math.round(Math.random() * 30 - 15) // -15..15
        // move polaroids 60px upwards on desktop only (mobile unchanged)
        const ty = isDesktop
          ? Math.round(Math.random() * 80 - 40) - 60
          : Math.round(Math.random() * 100 - 40) - 80
        // Use a consistent width for all polaroids (no per-item randomness)
        // Increase size by 30% (0.3x bigger)
        const imgW = Math.max(160, Math.floor(baseImgW * 1.3))
        const zBase = s.zBase + Math.round(Math.random() * 6)

        // desktop-specific absolute positions (spread across width)
        if (isDesktop) {
          const cols = Math.max(3, seed.length)
          const pct = 0.12 + (i / (seed.length - 1)) * 0.76 // spread 12%..88%
          const left = Math.round(width * pct) + tx
          // move polaroids upward on desktop by reducing the vertical multiplier
          const top = Math.round(el.clientHeight * 0.22) + ty
          return { rotate: s.rotate, left, top, zBase, imgW, isDesktop }
        }

        return { rotate: s.rotate, tx, ty, zBase, imgW }
      })

      setLayout(results)
    }

    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [seed])

  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <div
        ref={containerRef}
        className={
          `relative grid grid-cols-1 gap-y-10 mt-[125px] pb-24 pr-4 justify-items-center ${
            layout[0]?.isDesktop ? 'min-h-[520px]' : ''
          }`
        }
      >
        {images.map((src, i) => {
            const item = layout[i]
          const isHovered = hovered === i
          const zIndex = isHovered ? 999 : 10 + (item?.zBase ?? i)

          return (
            <img
              key={src}
              src={src}
              alt={`Editorial ${i + 1}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                if (i === 0) router.push('/new-in/9')
                if (i === 1) router.push('/new-in/2')
                if (i === 2) router.push('/new-in/10')
                if (i === 3) router.push('/new-in/4')
                if (i === 4) router.push('/new-in/3')
              }}
              className={`pointer-events-auto select-none rounded-sm transition-transform duration-300 ease-out ${i <= 4 ? 'cursor-pointer' : ''}`}
              style={
                item?.isDesktop
                  ? {
                      position: 'absolute' as const,
                      left: item.left + 'px',
                      top: item.top + 'px',
                      transform: `translate(-50%, -50%) rotate(${item.rotate}deg) ${isHovered ? 'scale(1.06)' : 'scale(1)'}`,
                      zIndex,
                      boxShadow: '8px 8px 30px rgba(0,0,0,0.16)',
                      width: item ? `${item.imgW}px` : '320px',
                      maxWidth: '40%',
                      height: 'auto',
                    }
                  : {
                      display: 'block',
                      transform: `rotate(${item ? item.rotate : 0}deg) translate(${item ? item.tx : 0}px, ${item ? item.ty : 0}px) ${isHovered ? 'scale(1.06)' : 'scale(1)'}`,
                      zIndex,
                      boxShadow: '8px 8px 30px rgba(0,0,0,0.16)',
                      width: item ? `${item.imgW}px` : '320px',
                      maxWidth: '92%',
                      height: 'auto',
                      marginBottom: '-24px',
                      marginLeft: '0px',
                    }
              }
            />
          )
        })}
      </div>

      {/* (Removed standalone scroll image — split-screen inserted directly after CategoryGrid.) */}
    </section>
  )
}
