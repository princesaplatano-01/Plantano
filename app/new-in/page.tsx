"use client"

import Image from "next/image"
import Link from "next/link"

const IMAGES = [
  "/SCROLL/DSC07548.jpg",
  "/SCROLL/DSC07425.jpg",
  "/SCROLL/DSC08190.jpg",
  "/SCROLL/IMG_3221 a.jpg",
  "/SCROLL/DSC07548.jpg",
  "/SCROLL/DSC07425.jpg",
  "/SCROLL/DSC08190.jpg",
  "/SCROLL/IMG_3221 a.jpg",
]

export default function NewInPage() {
  return (
    <main className="min-h-screen py-12 px-4 md:px-8 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">New In</h1>

        {/* Horizontal scroller container */}
        <div className="overflow-x-auto -mx-4 md:-mx-8 py-2">
          <div
            className="flex gap-0.5 px-4 md:px-8"
            style={{
              // keep a small 2px gap (Tailwind gap-0.5 = 2px)
              WebkitOverflowScrolling: "touch",
            }}
          >
            {IMAGES.map((src, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 bg-muted overflow-hidden rounded"
                style={{
                  // On desktop: make exactly 4 images visible in viewport
                  // width calc: (100% - 3*2px)/4 = (100% - 6px)/4
                  width: "calc((100% - 6px) / 4)",
                  // enforce strict 3:4 aspect ratio
                  aspectRatio: "3 / 4",
                }}
              >
                <img
                  src={src}
                  alt={`Product ${idx + 1}`}
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">Use the horizontal scroller to browse. On desktop exactly 4 images are visible; images keep a strict 3:4 aspect ratio with 2px gaps.</p>
      </div>
    </main>
  )
}
