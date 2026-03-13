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
  const [containerMarginTop, setContainerMarginTop] = useState<number>(90)
  // manual vertical offset to nudge polaroids (negative moves them up)
  // moved up 50px previously; subtract ~38px (1cm) to move up 1cm more
  const manualOffset = -88
  // mobile-only downward offset (~0.5cm ≈ 19px)
  const mobileOffset = 19

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

      // measure marquee (moving text) height so we can position polaroids
      // 60px below it on desktop
      let marqueeHeight = 0
      try {
        const marqueeInner = document.querySelector('.animate-marquee') as HTMLElement | null
        const marqueeWrapper = marqueeInner?.parentElement as HTMLElement | null
        marqueeHeight = marqueeWrapper?.clientHeight ?? 0
      } catch (err) {
        marqueeHeight = 0
      }

      const isDesktop = width >= 1024

      // Desktop-only margin adjustments: keep mobile behavior unchanged.
      if (isDesktop) {
        const desiredTopMargin = marqueeHeight > 0 ? marqueeHeight + 60 : 140
        setContainerMarginTop(desiredTopMargin + manualOffset)
      } else {
        const desiredTopMarginMobile = marqueeHeight > 0 ? marqueeHeight + 50 : 125
        setContainerMarginTop(desiredTopMarginMobile + mobileOffset)
      }

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
        // Increase size by 30% (0.3x bigger). Apply desktop-only scale so
        // mobile sizing remains unchanged.
        const desktopScale = 0.8
        const sizeScale = isDesktop ? desktopScale : 1
        const imgW = Math.max(160, Math.floor(baseImgW * 1.3 * sizeScale))
        const zBase = s.zBase + Math.round(Math.random() * 6)

        // desktop-specific absolute positions (spread across width)
        if (isDesktop) {
          const cols = Math.max(3, seed.length)
          const pct = 0.12 + (i / (seed.length - 1)) * 0.76 // spread 12%..88%
          const left = Math.round(width * pct) + tx
          // move polaroids upward on desktop by reducing the vertical multiplier
          // use a guaranteed minimum height so initial measurements don't collapse
          const measuredHeight = Math.max(el.clientHeight, 520)
          const top = Math.round(measuredHeight * 0.22) + ty
          // return preliminary top; we'll refine after measuring actual image heights
          return { rotate: s.rotate, left, top, zBase, imgW, isDesktop }
        }

        return { rotate: s.rotate, tx, ty, zBase, imgW }
      })

      setLayout(results)

      // After layout is applied, measure a rendered polaroid's height and
      // adjust the container margin so the top edge of polaroids sits
      // `50px` below the marquee. We measure the first image available.
      if (isDesktop) {
        setTimeout(() => {
          try {
            const imgEl = containerRef.current?.querySelector('img') as HTMLImageElement | null
            const imgH = imgEl?.clientHeight ?? 0

            // Get marquee and container rects early for safe clamping
            const marqueeInner2 = document.querySelector('.animate-marquee') as HTMLElement | null
            const marqueeWrapper2 = marqueeInner2?.parentElement as HTMLElement | null
            const marqueeRect = marqueeWrapper2?.getBoundingClientRect() ?? null
            const containerRectNow = containerRef.current?.getBoundingClientRect() ?? null

            // compute split offset relative to container
            const containerRect = containerRef.current?.getBoundingClientRect()
            const splitEl = document.querySelector('section[aria-label="Split scroll section"]') as HTMLElement | null
            const splitOffset = (containerRect && splitEl)
              ? Math.max(0, splitEl.getBoundingClientRect().top - containerRect.top)
              : el.clientHeight + 200

            const estimatedImgH = imgH > 0 ? imgH : Math.round((results[0]?.imgW ?? 240) * 1.2)

            if (imgH > 0 && marqueeRect && containerRectNow) {
              // Top limit: 20px below marquee bottom
              const topLimitCenter = Math.round(marqueeRect.bottom - containerRectNow.top + 20 + estimatedImgH / 2)
              // Bottom limit: 30px above split screen
              const bottomLimitCenter = Math.round(splitOffset - 30 - estimatedImgH / 2)

              // ensure sensible ordering
              const minCenter = Math.min(topLimitCenter, bottomLimitCenter)
              const maxCenter = Math.max(topLimitCenter, bottomLimitCenter)

              // Aim for middle point between the two limits
              const desiredCenter = Math.round((minCenter + maxCenter) / 2)

              // Move container so first polaroid's center equals desiredCenter
              if (results[0]) {
                const currentAbsCenter = (containerRectNow.top + (results[0].top ?? 0))
                const desiredAbsCenter = containerRectNow.top + desiredCenter
                const delta = desiredAbsCenter - currentAbsCenter
                const computed = getComputedStyle(containerRef.current!)
                const currentMargin = parseFloat(computed.marginTop || '0')
                const newMargin = Math.round(currentMargin + delta) + manualOffset
                setContainerMarginTop(newMargin)
              }

              // After moving container, clamp individual tops to stay within min/max
              const refined = results.map((r) => {
                if (!r.isDesktop || typeof r.top !== 'number') return r
                let top = r.top
                if (top < minCenter) top = minCenter
                if (top > maxCenter) top = maxCenter
                return { ...r, top }
              })

              setLayout(refined)
            }
          } catch (err) {
            // ignore measurement errors
          }
        }, 80)
      }
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
          `relative grid grid-cols-1 gap-y-10 pb-24 pr-4 justify-items-center ${
            layout[0]?.isDesktop ? 'min-h-[520px]' : ''
          }`
        }
        style={{ marginTop: `${containerMarginTop}px` }}
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
                if (i === 0) router.push('/new-in/3')
                if (i === 1) router.push('/new-in/2')
                if (i === 2) router.push('/new-in/10')
                if (i === 3) router.push('/new-in/9')
                if (i === 4) router.push('/new-in/4')
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
