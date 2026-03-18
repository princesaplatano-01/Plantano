"use client"
import { useEffect } from 'react'

export default function AntiDownload() {
  useEffect(() => {
    const setImgProps = () => {
      document.querySelectorAll('img').forEach((el) => {
        el.setAttribute('draggable', 'false')
        // prevent programmatic dragging
        el.addEventListener('dragstart', dragStartHandler)
      })
    }

    const dragStartHandler = (e: Event) => {
      e.preventDefault()
    }

    const contextMenuHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest && target.closest('img')) {
        e.preventDefault()
      }
    }

    const dragStartGlobal = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (target && target.closest && target.closest('img')) e.preventDefault()
    }

    setImgProps()

    const observer = new MutationObserver(() => setImgProps())
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('contextmenu', contextMenuHandler)
    document.addEventListener('dragstart', dragStartGlobal)

    return () => {
      observer.disconnect()
      document.removeEventListener('contextmenu', contextMenuHandler)
      document.removeEventListener('dragstart', dragStartGlobal)
      document.querySelectorAll('img').forEach((el) => {
        el.removeEventListener('dragstart', dragStartHandler)
      })
    }
  }, [])

  return null
}
