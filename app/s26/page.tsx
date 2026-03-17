"use client"

import { Header } from "@/components/header"
import { FileX2 } from "lucide-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// Full SC26 media list (images + videos)
const SC26_IMAGES = [
  "/SC26/DSC06685.jpg",
  "/SC26/DSC06748.jpg",
  "/SC26/DSC07392.jpg",
  "/SC26/DSC07548 2.jpg",
  "/SC26/DSC07671.jpg",
  "/SC26/DSC07773.jpg",
  "/SC26/DSC07989-2.jpg",
  "/SC26/eclipse.jpg",
  "/SC26/gif collar.gif",
  "/SC26/IMG_1206.jpg",
  "/SC26/IMG_1207.JPG",
  "/SC26/IMG_3212.jpg",
  "/SC26/IMG_3228.jpg",
  "/SC26/IMG_3232.jpg",
  "/SC26/IMG_3289.jpg",
  "/SC26/Pa_02.JPG",
  "/SC26/Pa_06.JPG",
  "/SC26/Pa_07.jpg",
  "/SC26/Pa_08.jpg",
  "/SC26/Pa_09 .jpg",
  "/SC26/Pa_10.jpg",
]

// User-provided mapped images (b1..b20) — used as the visible assets for the mood-board
const B_IMAGES = [
  '/SC26/b1.jpg',
  '/SC26/b2.jpg',
  '/SC26/b3.JPG',
  '/SC26/b4.jpg',
  '/SC26/b5.jpg',
  '/SC26/b6.JPG',
  '/SC26/b7.jpg',
  '/SC26/b8.JPG',
  '/SC26/b9.jpg',
  '/SC26/b10.jpg',
  '/SC26/b11.jpg',
  '/SC26/b12.gif',
  '/SC26/b13.jpg',
  '/SC26/b14.jpg',
  '/SC26/b15.jpg',
  '/SC26/b16.jpg',
  '/SC26/b17.jpg',
  '/SC26/b18.jpg',
  '/SC26/b20.jpg',
]

export default function S26Page() {
  const allImages = SC26_IMAGES
  const router = useRouter()
  const [cacheBuster, setCacheBuster] = useState<string>('')
  const [enlarged, setEnlarged] = useState<number[]>([0])

  useEffect(() => {
    // set a client-only cache buster so images reload after hydration
    setCacheBuster(String(Date.now()))
    // pick some random desktop boxes to enlarge (always include index 0 -> b1)
    const picks: number[] = [0]
    const maxIndex = 10 // we have 11 desktop boxes (0..10)
    while (picks.length < 4) {
      const r = Math.floor(Math.random() * maxIndex) + 1
      if (!picks.includes(r)) picks.push(r)
    }
    setEnlarged(picks)
  }, [])

  const handleMobileTap = (src: string) => {
    if (typeof window === 'undefined') return
    if (window.innerWidth >= 768) return // only on mobile (<768px)
    if (src.includes('DSC06748.jpg') || src.includes('DSC07027.jpg')) {
      router.push('/new-in/2')
      return
    }
    if (src.includes('gif collar.gif')) {
      router.push('/new-in/11')
      return
    }
    if (
      src.includes('IMG_0224 a.jpg') ||
      src.includes('IMG_0224 i.jpg') ||
      src.includes('IMG_1206.JPG') ||
      src.includes('Pa_07.jpg')
    ) {
      router.push('/new-in/7')
      return
    }
    if (src.includes('Pa_08.jpg')) {
      router.push('/new-in/8')
      return
    }
    if (src.includes('Pa_09.jpg')) {
      router.push('/new-in/9')
      return
    }
    if (src.includes('Pa_10.jpg')) {
      router.push('/new-in/10')
      return
    }
    if (src.includes('Pa_02.JPG')) {
      router.push('/new-in/2')
      return
    }
  }

  const ASPECT_RATIOS = [
    '3 / 4', // DSC06685.jpg
    '3 / 4', // DSC06748.jpg
    '3 / 4', // DSC07392.jpg
    '3 / 4', // DSC07548 2.jpg
    '3 / 4', // DSC07671.jpg
    '3 / 4', // DSC07773.jpg
    '3 / 4', // DSC07989-2.jpg
    '1 / 1', // eclipse.jpg
    '1 / 1', // gif collar.gif
    '3 / 4', // IMG_1206.jpg
    '3 / 4', // IMG_1207.JPG
    '3 / 4', // IMG_3212.jpg
    '3 / 4', // IMG_3228.jpg
    '3 / 4', // IMG_3232.jpg
    '3 / 4', // IMG_3289.jpg
    '3 / 4', // Pa_02.JPG
    '3 / 4', // Pa_06.JPG
    '3 / 4', // Pa_07.jpg
    '3 / 4', // Pa_08.jpg
    '3 / 4', // Pa_09 .jpg
    '3 / 4', // Pa_10.jpg
  ]

  // Per-item layout classes for a mosaic grid (md and up).
  // Each entry controls column/row span to build a reference-style layout.
  // Layout: heavily inspired by the reference image, adjust as needed for best fit
  const LAYOUT_CLASSES = [
    'md:col-span-2 md:row-span-1', // DSC06685.jpg
    'md:col-span-2 md:row-span-1', // DSC06748.jpg
    'md:col-span-3 md:row-span-1', // DSC07392.jpg
    'md:col-span-3 md:row-span-1', // DSC07548 2.jpg
    'md:col-span-2 md:row-span-1', // DSC07671.jpg
    'md:col-span-2 md:row-span-1', // DSC07773.jpg
    'md:col-span-3 md:row-span-1', // DSC07989-2.jpg
    'md:col-span-2 md:row-span-1', // eclipse.jpg
    'md:col-span-2 md:row-span-1', // gif collar.gif
    'md:col-span-2 md:row-span-1', // IMG_1206.jpg
    'md:col-span-2 md:row-span-1', // IMG_1207.JPG
    'md:col-span-2 md:row-span-1', // IMG_3212.jpg
    'md:col-span-2 md:row-span-1', // IMG_3228.jpg
    'md:col-span-2 md:row-span-1', // IMG_3232.jpg
    'md:col-span-2 md:row-span-1', // IMG_3289.jpg
    'md:col-span-2 md:row-span-1', // Pa_02.JPG
    'md:col-span-2 md:row-span-1', // Pa_06.JPG
    'md:col-span-2 md:row-span-1', // Pa_07.jpg
    'md:col-span-2 md:row-span-1', // Pa_08.jpg
    'md:col-span-2 md:row-span-1', // Pa_09 .jpg
    'md:col-span-2 md:row-span-1', // Pa_10.jpg
  ]
  return (
    <>
      <Header />
      <style>{`
        /* Default: desktop-style background (used for non-touch/desktop devices).
           Mobile/touch devices will use the mobile background via the pointer coarse rule below.
           This prevents desktop browsers from swapping to the mobile image when the window is resized. */
        .s26-bg {
          background-image: url('/SC26/props/figs copy.jpg');
          background-size: contain;
          background-position: center top;
          background-repeat: no-repeat;
        }

        /* For touch / coarse-pointer devices (phones, many tablets), use the mobile background. */
        @media (pointer: coarse), (hover: none) {
          .s26-bg {
            background-image: url('/SC26/props/mobile_a b.jpg');
            background-size: 90% auto;
            background-position: top center;
            background-repeat: no-repeat;
          }
        }
      `}</style>

      <main className="s26-bg min-h-screen pt-6 py-6 px-3 md:px-6 text-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6 mt-[15px] md:mt-5">
            <Link href="/">
              <img src="/Front/PP-LOGO-LTTRNG-A-02.png" alt="S26" width={192} height={50} className="object-contain cursor-pointer transform scale-90 md:scale-100" />
            </Link>
          </div>

          <h1 className="mt-[40px] md:mt-0 text-xl md:text-2xl font-semibold mb-3 italic text-white text-center">S26 Collection</h1>

          <section>
            {/* Desktop: grid-based mosaic to increase tile sizes and avoid overlap */}
            <div className="hidden md:flex justify-center">
              <div className="w-full" style={{ maxWidth: 1100 }}>
                <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(6, 1fr)', alignItems: 'start' }}>
                  {B_IMAGES.slice(0, 14).map((src, i) => {
                    const cb = cacheBuster ? (src.includes('?') ? `&cb=${cacheBuster}` : `?cb=${cacheBuster}`) : ''
                    const displaySrc = `${src}${cb}`
                    // make the first tile larger to mimic the previous design
                    const extraClass = i === 0 ? 'md:col-span-3 md:row-span-2' : LAYOUT_CLASSES[i] ?? 'md:col-span-2'
                    const isEnlarged = enlarged.includes(i)
                    const aspect = ASPECT_RATIOS[i] ?? '3 / 4'
                    const [w, h] = aspect.split('/').map((s) => Number(s.trim()))
                    const paddingTop = h && w ? `${(h / w) * 100}%` : '133%'

                    return (
                      <div key={`box-${i}`} onClick={() => handleMobileTap(src)} className={`${extraClass} relative`} style={{ zIndex: isEnlarged ? 20 : undefined }}>
                        <div style={{ width: '100%', paddingTop, position: 'relative' }}>
                          {displaySrc.toLowerCase().endsWith('.mp4') || displaySrc.toLowerCase().endsWith('.gif') ? (
                            <video src={displaySrc} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} autoPlay loop muted playsInline />
                          ) : (
                            <img src={displaySrc} alt={`S26 ${i + 1}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Mobile / small screens: flow layout (masonry-like) */}
            <div className="block md:hidden">
              <div className="flex flex-col md:columns-2" style={{ columnGap: '12px' }}>
                {B_IMAGES.map((src, idx) => {
                  const cb = cacheBuster ? (src.includes('?') ? `&cb=${cacheBuster}` : `?cb=${cacheBuster}`) : ''
                  const displaySrc = `${src}${cb}`
                    return (
                    <div key={`m-${idx}`} style={{ breakInside: 'avoid', marginBottom: 12, marginTop: idx === 0 ? '3cm' : undefined }} onClick={() => handleMobileTap(src)}>
                      {displaySrc.toLowerCase().endsWith('.mp4') || displaySrc.toLowerCase().endsWith('.gif') ? (
                        <video src={displaySrc} className="w-full object-contain block" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} autoPlay loop muted playsInline />
                      ) : (
                        <img src={displaySrc} alt={`S26 ${idx + 1}`} className="w-full object-contain block" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} loading="lazy" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
