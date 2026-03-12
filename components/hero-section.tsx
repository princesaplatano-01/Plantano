"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { useTranslation } from "@/lib/translations"

function MarqueeBar() {
  const { t } = useTranslation()
  const baseMarqueeItems = [
    t("newCollection"),
    t("aLittleSacred"),
    t("aboutPrincesaPlatanoHome"),
    t("aLittleStrange"),
  ]
  // To ensure the marquee is long enough for a seamless loop on wide screens,
  // we repeat the items.
  const marqueeItems = Array(5).fill(baseMarqueeItems).flat();

  const MarqueeItem = ({ text }: { text: string }) => (
    <span className="px-8 text-xs uppercase tracking-widest">{text}</span>
  )

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            /* Faster marquee */
            animation: marquee 20s linear infinite;
            will-change: transform;
          }
        `}
      </style>
      <div className="w-full overflow-hidden border-y border-border bg-white text-foreground py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex flex-shrink-0 items-center">
            {marqueeItems.map((item, index) => <MarqueeItem key={index} text={item} />)}
          </div>
          <div className="flex flex-shrink-0 items-center" aria-hidden="true">
            {marqueeItems.map((item, index) => <MarqueeItem key={index + marqueeItems.length} text={item} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export function HeroSection() {
    // ...existing code...
    // Add logo overlay
  const containerRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      setMousePosition({ x, y })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const mq = () => window.matchMedia('(min-width: 1024px)').matches
    const set = () => setIsDesktop(mq())
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  // Hide logo if menu is open
  const isMenuOpen = typeof window !== "undefined" && document.body.classList.contains("menu-open");
  return (
    <>
      <section 
        ref={containerRef}
        className="cursor-pointer relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Logo overlay */}
        <div className="absolute top-8 left-[73px] md:left-[88px] z-[60] logo-overlay">
          <img
            src="/Front/PP-LOGO-LTTRNG-VERSION-02.svg"
            alt="Platano Logo Title"
            className="h-36 md:h-54"
            style={{ transform: 'scale(1.15)', transformOrigin: 'center' }}
          />
        </div>
        <div className="relative h-screen md:h-[100vh] overflow-hidden block">
          {/* Background Image with parallax */}
          <div 
            className="absolute inset-0 md:inset-[-20px] transition-transform duration-300 ease-out"
            style={{
              transform: isHovering
                ? `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px) ${isDesktop ? 'translateY(-70px)' : ''} scale(1.05)`
                : `${isDesktop ? 'translateY(-70px)' : 'translate(0, 0)'} scale(1)`
            }}
          >
              <div className="relative w-full h-full">
                <div className="md:hidden absolute inset-0 w-full h-full">
                  <Image
                    src="/Front/mobile_a.jpg"
                    alt="Spring Summer Collection Mobile"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>

                <div className="hidden md:block relative w-full h-full">
                  <Image
                    src="/Front/DSC07126_a.jpg"
                    alt="Spring Summer Collection"
                    fill
                    className="object-cover object-right md:object-center"
                    priority
                  />
                </div>
              </div>
          </div>
          
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/20 transition-opacity duration-300"
            style={{ opacity: isHovering ? 0.3 : 0.2 }}
          />
          
          {/* Text content with opposite parallax */}
          <div 
            className="absolute bottom-12 left-6 md:bottom-16 md:left-12 transition-transform duration-200 ease-out"
            style={{
              transform: isHovering 
                ? `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` 
                : 'translate(0, 0)'
            }}
          >
            <Link
              href="/new-in"
              className="inline-block text-[#1E1D1D] text-xs tracking-widest uppercase border-b border-[#1E1D1D] pb-0.5 transition-all duration-150 ease-out"
              style={{
                transform: isHovering
                     ? `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px) ${isDesktop ? 'translateY(-40px)' : 'translateY(-50px)'}`
                  : `translate(0, 0) ${isDesktop ? 'translateY(-40px)' : ''}`
              }}
            >
              {t("shopNow")}
            </Link>
          </div>

          {/* Marquee: overlay on desktop, static below hero on mobile so it's visible on open */}
          <div className="hidden md:block absolute bottom-0 left-0 w-full z-50 pointer-events-auto">
            <MarqueeBar />
          </div>
        </div>
      </section>
      {/* Mobile: show marquee directly below hero so it's visible on initial view */}
      <div className="md:hidden">
        <MarqueeBar />
      </div>
    </>
  )
}
