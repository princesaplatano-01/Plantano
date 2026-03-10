"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/components/cart"
import Link from "next/link"
import { Search, ShoppingBag, Menu, X, Globe } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const { items: cartItems, removeFromCart } = useCart()
  // Hide search after 2s of inactivity
  useEffect(() => {
    if (!searchOpen) return;
    const timer = setTimeout(() => {
      setSearchOpen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [searchOpen]);
          {/* Left - Logo Title */}
          <Link href="/" className="absolute top-8 left-8 z-[60] logo-overlay">
            <img src="/Collares/PP-LOGO-LTTRNG-VERSION-01.svg" alt="Platano Logo Title" className="h-16 md:h-24 drop-shadow-lg" />
          </Link>
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{background: 'transparent', border: 'none'}}>
      <nav className="flex items-center justify-between px-4 md:px-6 py-3" style={{background: 'transparent', border: 'none'}}>
        {/* Left - Hamburger Menu */}
        <button 
          className="hover:opacity-60 transition-opacity"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>


        {/* Right - Search and Cart */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="hover:opacity-60 transition-opacity" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            {searchOpen && (
              <form
                className="absolute top-0 right-0 flex items-center z-[100]"
                style={{ width: '100px' }}
                onSubmit={e => { e.preventDefault(); setSearchOpen(false); }}
              >
                <input
                  type="text"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  autoFocus
                  placeholder="Search"
                  className="w-full px-2 py-1 text-xs rounded bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  style={{ background: 'none', border: 'none' }}
                />
              </form>
            )}
          </div>
                {/* Search Bar Drawer */}
          <button className="hover:opacity-60 transition-opacity relative" aria-label="Cart" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span
              className="absolute -top-1.5 -right-1.5 text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: '#ffffff', color: '#1E1D1D' }}
            >
              {cartItems.length}
            </span>
          </button>
              {/* Cart Drawer */}
              {cartOpen && (
                <div className="fixed inset-0 z-[100]">
                  <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black text-white shadow-2xl flex flex-col">
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
                        <ul>
                          {cartItems.map((item, idx) => (
                            <li key={idx} className="mb-4 text-white flex items-center justify-between">
                              <span>{item.name} × {item.qty || 1}</span>
                              <button className="text-xs underline" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                          ))}
                        </ul>
                      )}
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
