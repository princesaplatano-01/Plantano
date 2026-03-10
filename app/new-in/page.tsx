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

        {/* Grid container: 4 columns on desktop, strict 3:4 aspect, 2px gaps */}
        <div className="-mx-4 md:-mx-8 px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 scrollbar-hide">
            {IMAGES.map((src, idx) => (
              <div
                key={idx}
                className="bg-muted overflow-hidden rounded"
                style={{
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
