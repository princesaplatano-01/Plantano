"use client"

import { Header } from "@/components/header"
import { useTranslation } from "@/lib/translations"
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
  "/SC26/b12.gif",
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

    const basename = (src || '').split('/').pop()?.split('?')[0].toLowerCase() || ''

    const mapping: Record<string, string> = {
      'b2.jpg': '/new-in/7',
      'b3.jpg': '/new-in/4',
      'b4.jpg': '/new-in/2',
      'b6.jpg': '/new-in/6',
      'b7.jpg': '/new-in/3',
      'b8.jpg': '/new-in/2',
      'b10.jpg': '/new-in/2',
      'b11.jpg': '/new-in/8',
      'b12.jpg': '/new-in/11',
      'b12.gif': '/new-in/11',
      'b13.jpg': '/new-in/7',
      'b14.jpg': '/new-in/1',
      'b17.jpg': '/new-in/10',
      'b18.jpg': '/new-in/7',
    }

    if (mapping[basename]) {
      router.push(mapping[basename])
      return
    }

    // fallback / legacy mappings for other filenames
    if (basename.includes('dsc06748.jpg') || basename.includes('dsc07027.jpg')) {
      router.push('/new-in/2')
      return
    }
    if (basename.includes('img_1206') || basename.includes('img_0224') || basename.includes('pa_07')) {
      router.push('/new-in/7')
      return
    }
    if (basename.includes('pa_08')) {
      router.push('/new-in/8')
      return
    }
    if (basename.includes('pa_09')) {
      router.push('/new-in/9')
      return
    }
    if (basename.includes('pa_10')) {
      router.push('/new-in/10')
      return
    }
    if (basename.includes('pa_02')) {
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
    '1 / 1', // b12.gif (collar)
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
    'md:col-span-2 md:row-span-1', // b12.gif (collar)
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
  const { t } = useTranslation()

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

      <main className="s26-bg min-h-screen pt-6 py-6 px-3 md:px-6 text-foreground" style={{ paddingBottom: '60px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6 mt-[15px] md:mt-5">
            <Link href="/">
              <img src="/Front/PP-LOGO-LTTRNG-A-02.png" alt="S26" width={192} height={50} className="object-contain cursor-pointer transform scale-90 md:scale-100" />
            </Link>
          </div>

          <h1 className="mt-[60px] md:mt-0 ml-[-5px] md:ml-0 text-xl md:text-2xl font-semibold mb-3 italic text-white text-center">{t('s26Collection')}</h1>

          <section>
            {/* Desktop: absolute-positioned canvas based on reference coordinates */}
            <div className="hidden md:flex justify-center">
              <div className="relative w-full" style={{ maxWidth: 985 }}>
                {/* preserve aspect ratio of reference (985 x 896) */}
                <div style={{ width: '100%', paddingTop: `${(896 / 985) * 100}%`, paddingBottom: '60px', position: 'relative' }}>
                  {/* bounding boxes (x1,y1,x2,y2) mapped to percentages of 985x896 */}
                  {(() => {
                    const refW = 985
                    const refH = 896
                    // User-provided boxes (converted to [x1, y1, x2, y2])
                    const boxes = [
                      // Row 1 (Top)
                      [-170, -100, 410, 584], // b1: 253 x 319
                      [430, -70, 670, 581], // b2: 97 x 254
                      [690, -190, 992, 552], // b3: 142 x 226
                      [728, 120, 940, 817], // b4: 118 x 308
                      [935, 304, 1246, 500], // b5: 141 x 374
                      // Row 2 (Middle)
                      [-184, 476, 236, 623], // b6: 182 x 237
                      [90, 451, 519, 660], // b7: 160 x 249
                      [484, 375, 715, 728], // b8: 161 x 189
                      [900, 406, 1225, 1105], // b9: 137 x 319
                      // Row 3 (Bottom)
                      [-200, 635, 243, 993], // b10: 203 x 238
                      [-487, 1043, 1005, 1705], // b11: 168 x 222
                      [95, 700, 668, 1030], // b12: 114 x 296
                      [482, 670, 931, 1107], // b13: 139 x 325
                      [1000, 778, 881, 975], // b14: 137 x 197

                      // Row 4 (as [x, y, width, height])
                      [510, 1190, 790, 880],   // b15: 250 x 320
                      [800, 1190, 1000, 1080],  // b16: 180 x 250
                      [840, 1480, 40, 520],  // b17: 230 x 300
                      [510, 1470, 420, 620],  // b18: 170 x 330

                      // Row 5 (as [x, y, width, height])
                      [-80, 1720, 320, 350],  // b20: 280 x 300
                      [250, 1300, 200, 300],  // Pa_08: 200 x 300
                      [550, 1530, 250, 350],  // Pa_09: 250 x 350
                    ]

                    return boxes.map((b, i) => {
                      const [x1, y1, x2, y2] = b
                      const left = (x1 / refW) * 100
                      const top = (y1 / refH) * 100
                      const width = ((x2 - x1) / refW) * 100
                      const height = ((y2 - y1) / refH) * 100
                      // use user-provided b-images in the exact provided order (b1..b20)
                      const src = B_IMAGES[i] ?? ''
                      if (!src) return null
                      const cb = cacheBuster ? (src.includes('?') ? `&cb=${cacheBuster}` : `?cb=${cacheBuster}`) : ''
                      const displaySrc = `${src}${cb}`

                      const isEnlarged = enlarged.includes(i)
                      const boxStyle: React.CSSProperties = {
                        position: 'absolute',
                        left: `${left}%`,
                        top: `${top}%`,
                        width: `${width}%`,
                        height: `${height}%`,
                        zIndex: isEnlarged ? 20 : undefined,
                      }

                      return (
                        <div key={`box-${i}`} onClick={() => handleMobileTap(src)} style={boxStyle}>
                          {displaySrc.toLowerCase().endsWith('.mp4') ? (
                            <video src={displaySrc} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} autoPlay loop muted playsInline />
                          ) : (
                            <img src={displaySrc} alt={`S26 ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} loading="lazy" />
                          )}
                        </div>
                      )
                    })
                  })()}
                </div>
              </div>
            </div>

            {/* Mobile / small screens: flow layout (masonry-like) */}
            <div className="block md:hidden">
              <div className="flex flex-col md:columns-2" style={{ columnGap: '12px' }}>
                {B_IMAGES.map((src, idx) => {
                  const cb = cacheBuster ? (src.includes('?') ? `&cb=${cacheBuster}` : `?cb=${cacheBuster}`) : ''
                  const displaySrc = `${src}${cb}`
                  const isB20 = src.includes('b20.jpg')
                  return (
                    <div
                      key={`m-${idx}`}
                      style={{ breakInside: 'avoid', marginBottom: isB20 ? 60 : 12, marginTop: idx === 0 ? '3cm' : undefined }}
                      onClick={() => handleMobileTap(src)}
                    >
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
