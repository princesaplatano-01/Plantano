"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

const images = [
  "/Polaroids/DSC06217%20pola.jpg",
  "/Polaroids/DSC06217%20polaro.jpg",
  "/Polaroids/DSC06217%20polaroid.jpg",
  "/Polaroids/DSC06217%20polaroido.jpg",
  "/Polaroids/DSC06217%20polaroodi.jpg",
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
      const width = el.clientWidth || 1200

      // image width responsive: up to 640px, at least 120px
      const baseImgW = Math.min(640, Math.max(120, Math.floor(width * 0.5)))
      // reduce current display size by additional 30% relative to previous scale
      // previous scale was 0.7, so new scale = 0.7 * 0.7 = 0.49
      // increase by 10% as requested -> 0.49 * 1.1 = 0.539
      const scaleFactor = 0.539
      const imgW = Math.max(40, Math.floor(baseImgW * scaleFactor))
      const minCenterSep = imgW * 0.75 // ensure centers separated so overlap ≤25%

      const centerX = width / 2
      const results = seed.map((s, i) => {
        const base = centerX + (i - (images.length - 1) / 2) * (minCenterSep + 40)
        const extra = (Math.random() * minCenterSep) - (minCenterSep / 2)
        let left = Math.round(base + extra + s.jitter)

        // allow up to 20% out-of-frame for centers
        const minCenter = -0.2 * width + imgW / 2
        const maxCenter = 1.2 * width - imgW / 2
        left = Math.min(Math.max(left, Math.round(minCenter)), Math.round(maxCenter))

        const yOffset = Math.round(Math.random() * 40)
        return { rotate: s.rotate, left, yOffset, zBase: s.zBase, imgW }
      })

      // Adjust pairwise to ensure min separation
      for (let pass = 0; pass < 4; pass++) {
        for (let i = 1; i < results.length; i++) {
          const prev = results[i - 1]
          const cur = results[i]
          const sep = cur.left - prev.left
          if (sep < minCenterSep) {
            const needed = Math.ceil(minCenterSep - sep)
            cur.left += Math.ceil(needed / 2)
            prev.left -= Math.floor(needed / 2)
            // clamp
            const minCenter = -0.2 * width + imgW / 2
            const maxCenter = 1.2 * width - imgW / 2
            cur.left = Math.min(Math.max(cur.left, Math.round(minCenter)), Math.round(maxCenter))
            prev.left = Math.min(Math.max(prev.left, Math.round(minCenter)), Math.round(maxCenter))
          }
        }
      }

      setLayout(results)
    }

    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [seed])

  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <div ref={containerRef} className="relative flex justify-center items-start mt-[25px] h-auto md:h-[520px]">
        {images.map((src, i) => {
          const item = layout[i]
          const isHovered = hovered === i
          const zIndex = isHovered ? 999 : 10 + (item?.zBase ?? i)

          return (
            <img
              key={i}
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
              style={{
                position: "absolute",
                left: item ? `${item.left}px` : "50%",
                top: item ? `${item.yOffset}px` : "0px",
                transform: `translateX(-50%) rotate(${item ? item.rotate : 0}deg) ${isHovered ? 'scale(1.08)' : 'scale(1)'}`,
                zIndex,
                boxShadow: "5px 5px 15px rgba(0,0,0,0.1)",
                width: item ? `${item.imgW}px` : "320px",
                height: "auto",
              }}
            />
          )
        })}
      </div>

      {/* (Removed standalone scroll image — split-screen inserted directly after CategoryGrid.) */}
    </section>
  )
}
