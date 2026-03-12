"use client"

import React, { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const visibleRef = useRef(false)
  const modeRef = useRef<'default' | 'pointer'>('default')
  const [enabled, setEnabled] = React.useState<boolean | null>(null)

  useEffect(() => {
    // Detect touch / mobile devices and disable custom cursor there
    const isTouch = typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
    )

    if (isTouch) {
      setEnabled(false)
      // ensure no custom class remains
      document.body.classList.remove('use-custom-cursor')
      return
    }

    setEnabled(true)

    // Preload images
    const pre1 = new Image()
    const pre2 = new Image()
    pre1.src = '/Front/mu1.png'
    pre2.src = '/Front/mu2.png'

    const el = imgRef.current
    if (!el) return

    el.style.width = '16px'
    el.style.height = '16px'
    el.style.position = 'fixed'
    el.style.top = '0'
    el.style.left = '0'
    el.style.pointerEvents = 'none'
    el.style.zIndex = '9999'
    el.style.transform = 'translate3d(0,0,0) translate(-50%,-50%)'
    el.style.transition = 'opacity 80ms linear'
    el.style.opacity = '0'
    el.style.willChange = 'transform, opacity'
    el.style.backfaceVisibility = 'hidden'

    const update = () => {
      const { x, y } = posRef.current
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%)`
      el.style.opacity = visibleRef.current ? '1' : '0'
      rafRef.current = null
    }

    const schedule = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update)
    }

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX
      posRef.current.y = e.clientY

      // detect underlying element
      const under = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      if (under) {
        const tag = under.tagName.toLowerCase()
        const isInput = tag === 'input' || tag === 'textarea' || under.isContentEditable
        if (isInput) {
          visibleRef.current = false
        } else {
          visibleRef.current = true
          const wantsPointer = under.closest && under.closest('a, button, [role="button"], .cursor-pointer')
          const newMode = wantsPointer ? 'pointer' : 'default'
          if (newMode !== modeRef.current) {
            modeRef.current = newMode
            el.src = newMode === 'pointer' ? '/Front/mu2.png' : '/Front/mu1.png'
          }
        }
      }

      schedule()
    }

    const onLeave = () => {
      visibleRef.current = false
      schedule()
    }

    document.body.classList.add('use-custom-cursor')
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)

    return () => {
      document.body.classList.remove('use-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (enabled === false) return null

  return (
    <img
      ref={imgRef}
      src="/Front/mu1.png"
      alt=""
      className="custom-cursor-img"
      aria-hidden="true"
    />
  )
}
