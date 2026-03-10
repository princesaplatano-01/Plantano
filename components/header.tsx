"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart"
import Link from "next/link"
import { Search, ShoppingBag, Menu, X, Globe } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function Header() {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const { items: cartItems, removeFromCart, addToCart, itemCount } = useCart()
  // Hide search after 2s of inactivity
  useEffect(() => {
    if (!searchOpen) return;
    // Only auto-close when search is open AND the user is NOT typing (empty input)
    if (searchValue && searchValue.trim().length > 0) return;
    const timer = setTimeout(() => {
      setSearchOpen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [searchOpen]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useTranslation()

  useEffect(() => {
    if (typeof document === "undefined") return
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open")
    } else {
      document.body.classList.remove("menu-open")
    }
    return () => {
      if (typeof document !== "undefined") document.body.classList.remove("menu-open")
    }
  }, [mobileMenuOpen])

  function handleSearchSubmit(e?: React.FormEvent | React.KeyboardEvent) {
    if (e && 'preventDefault' in e) e.preventDefault()
    const q = searchValue.trim()
    const m = q.match(/product\s*(\d+)/i) || q.match(/p[\s-_]?(\d+)/i) || q.match(/^(\d+)$/)
    const total = 11
    if (m) {
      const id = parseInt(m[1], 10)
      if (!isNaN(id) && id >= 1 && id <= total) {
        setSearchOpen(false)
        router.push(`/new-in/${id}`)
        setSearchValue("")
        return true
      }
    }
    return false
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{background: 'transparent', border: 'none'}}>
      <nav className="flex items-center justify-between px-4 md:px-6 py-3 text-[#dbdbdb]" style={{background: 'transparent', border: 'none'}}>
        {/* Left - Hamburger Menu */}
        <button 
          className="hover:opacity-60 transition-opacity"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} strokeWidth={1.5} color="#4b4b4b" /> : <Menu size={20} strokeWidth={1.5} color="#4b4b4b" />}
        </button>


        {/* Right - Search and Cart */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="hover:opacity-60 transition-opacity" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={20} strokeWidth={1.5} color="#4b4b4b" />
            </button>
            {searchOpen && (
              <form
                className="absolute top-0 right-0 flex items-center z-[100]"
                style={{ width: '160px' }}
                onSubmit={(e) => handleSearchSubmit(e)}
              >
                  <input
                  type="text"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearchSubmit(e)
                  }}
                  autoFocus
                  placeholder="Search"
                  className="w-full px-2 py-1 text-xs rounded bg-transparent text-[#4b4b4b] placeholder:text-[#6b6b6b] focus:outline-none"
                  style={{ background: 'none', border: 'none' }}
                />
              </form>
            )}
          </div>
                {/* Search Bar Drawer */}
          <button className="hover:opacity-60 transition-opacity relative" aria-label="Cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} strokeWidth={1.5} color="#4b4b4b" />
            <span
              className="absolute -top-1.5 -right-1.5 text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: '#ffffff', color: '#1E1D1D' }}
            >
              {itemCount}
            </span>
          </button>
              {/* Cart Drawer */}
              {cartOpen && (
                <div className="fixed inset-0 z-[100]" onClick={() => setCartOpen(false)}>
                  <div onClick={(e) => e.stopPropagation()} className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black text-white shadow-2xl flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-border">
                      <span className="text-sm font-medium tracking-wider">Cart</span>
                      <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                        <X size={20} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex-1 p-6">
                      {cartItems.length === 0 ? (
                        <p className="text-center text-white text-sm">Your cart is empty</p>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {cartItems.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-white">
                              <div className="w-16" style={{ aspectRatio: "3 / 4" }}>
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium uppercase">{item.name}</div>
                                <div className="text-xs text-muted-foreground">{item.price} MXN</div>
                                <div className="mt-2 flex items-center gap-2">
                                  <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, quantity: -1 })} className="px-2 py-1 border">-</button>
                                  <div className="px-2">{item.quantity}</div>
                                  <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1 })} className="px-2 py-1 border">+</button>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <button className="text-xs underline ml-2" onClick={() => removeFromCart(item.id)}>Remove</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-4 border-t border-border">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">Subtotal</span>
                        <span className="text-sm">${cartItems.reduce((s, i) => s + i.price * i.quantity, 0)}</span>
                      </div>
                      <button className="w-full py-3 bg-white text-black font-medium">GO TO CHECKOUT</button>
                    </div>
                  </div>
                </div>
              )}
        </div>
      </nav>

      {/* Slide-out Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-[9999]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[10001] shadow-2xl flex flex-col bg-black text-white" style={{border: 'none'}}>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-medium tracking-wider">{t("menu")}</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col py-2 flex-1">
              <Link href="/new-in" className="px-6 py-4 text-sm tracking-wider uppercase hover:bg-muted transition-colors border-b border-border">
                {t("newIn")}
              </Link>
              <Link href="#" className="px-6 py-4 text-sm tracking-wider uppercase hover:bg-muted transition-colors border-b border-border">
                {t("readyToShip")}
              </Link>
              <Link href="#" className="px-6 py-4 text-sm tracking-wider uppercase hover:bg-muted transition-colors border-b border-border">
                {t("s26Collection")}
              </Link>
              <Link href="#" className="px-6 py-4 text-sm tracking-wider uppercase hover:bg-muted transition-colors border-b border-border text-accent">
                {t("sale")}
              </Link>
            </div>
            
            {/* Language Selector */}
            <div className="px-6 py-4 border-t border-border flex flex-col gap-3">
              <button
                onClick={() => setLanguage("EN")}
                className={`text-left text-sm tracking-wider transition-colors ${
                  language === "EN" 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ES")}
                className={`text-left text-sm tracking-wider transition-colors ${
                  language === "ES" 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
