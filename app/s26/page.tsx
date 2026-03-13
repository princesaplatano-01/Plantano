"use client"

import { Header } from "@/components/header"
import Link from 'next/link'

// Full SC26 media list (images + videos)
const SC26_IMAGES = [
  "/SC26/DSC07027.jpg",
  "/SC26/DSC06748.jpg",
  "/SC26/Pa_09.jpg",
  "/SC26/DSC07671.jpg",
  "/SC26/gif collar.gif",
  "/SC26/WhatsApp Video 2026-03-12 at 21.09.42.mp4",
  "/SC26/IMG_0224 i.jpg",
  "/SC26/IMG_1206.JPG",
  "/SC26/IMG_3201.jpg",
  "/SC26/IMG_3202.jpg",
  "/SC26/IMG_3212.jpg",
  "/SC26/IMG_3232.jpg",
  "/SC26/IMG_3289.jpg",
  "/SC26/Pa_02.JPG",
  "/SC26/Pa_07.jpg",
  "/SC26/Pa_08.jpg",
  "/SCROLL/DSC07548_72y 2.jpg",
  "/SC26/Pa_10.jpg",
  "/SC26/IMG_0224 a.jpg",
  "/SC26/WhatsApp Video 2026-03-12 at 21.09.43.mp4",
]

export default function S26Page() {
  const allImages = SC26_IMAGES

  const ASPECT_RATIOS = [
    '3 / 4', // DSC06748.jpg
    '3 / 4', // DSC07027.jpg
    '3 / 4', // DSC07548_72y 2.jpg
    '3 / 4', // DSC07671.jpg
    '1 / 1', // gif collar.gif
    '3 / 4', // WhatsApp Video 2026-03-12 at 21.09.42.mp4
    '3 / 4', // IMG_0224 i.jpg
    '3 / 4', // IMG_1206.JPG
    '3 / 2', // IMG_3201.jpg
    '4 / 5', // IMG_3202.jpg
    '3 / 4', // IMG_3212.jpg
    '3 / 4', // IMG_3232.jpg
    '3 / 4', // IMG_3289.jpg
    '3 / 4', // Pa_02.JPG
    '3 / 4', // Pa_07.jpg
    '3 / 4', // Pa_08.jpg
    '3 / 4', // Pa_09.jpg
    '3 / 4', // Pa_10.jpg
    '3 / 4', // IMG_0224 a.jpg
    '16 / 9', // WhatsApp Video 2026-03-12 at 21.09.43.mp4
  ]

  return (
    <>
      <Header />
      <style>{`
        .s26-bg {
          background-image: url('/SC26/mobile_a b.jpg');
          /* make mobile background smaller and align to top-center */
          background-size: 80% auto;
          background-position: top center;
          background-repeat: no-repeat;
        }
        @media (min-width: 1024px) {
          .s26-bg {
            background-image: url('/SC26/figs copy.jpg');
            /* preserve original proportions and scale to fit desktop */
            background-size: contain;
            background-position: center top;
            background-repeat: no-repeat;
          }
        }
      `}</style>

      <main className="s26-bg min-h-screen pt-8 py-8 px-3 md:px-6 text-foreground">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-6 -mt-2.5 md:mt-5">
            <Link href="/">
              <img src="/Front/PP-LOGO-LTTRNG-A-02.png" alt="S26" width={192} height={50} className="object-contain cursor-pointer transform scale-90 md:scale-100" />
            </Link>
          </div>

          <h1 className="text-xl md:text-2xl font-semibold mb-4 italic text-white text-center">S26 Collection</h1>

          <section>
            <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr_1fr] gap-2">
              {allImages.map((src, idx) => {
                const aspect = ASPECT_RATIOS[idx] ?? '3 / 4'
                const isLarge = idx % 4 === 0
                const largeGroup = Math.floor(idx / 4)
                const startClass = largeGroup % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'
                const containerClass = `relative overflow-hidden md:bg-muted md:rounded ${isLarge ? `${startClass} md:col-span-2` : ''} ${idx === 0 ? 'mt-[60px] md:mt-0' : ''}`
                return (
                  <div key={`g-${idx}`} className={containerClass} style={{ aspectRatio: aspect }}>
                    {src.toLowerCase().endsWith('.mp4') ? (
                      <video src={src} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    ) : (
                      <img src={src} alt={`S26 ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
