"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "EN" | "ES"

const translations = {
  EN: {
    // Announcement
    freeShipping: "Free shipping on orders over 150€",
    
    // Menu
    menu: "MENU",
    newIn: "New In",
    readyToShip: "Ready to ship | in Stock",
    s26Collection: "S26 Collection",
    sale: "Sale",
    aboutPrincesaPlatano: "About Princesa Platano",
    
    // Hero
    newCollection: "New Collection",
    springSummer: "SPRING SUMMER 2026",
    shopNow: "Shop Now",
    explore: "Explore",
    
    // Categories
    ourCategories: "Our Categories",
    sneakers: "Sneakers",
    balletFlats: "Ballet flats",
    loafers: "Loafers",
    barefoot: "Barefoot",
    boots: "Boots",
    sandals: "Sandals",
    heels: "Heels",
    
    // Featured
    ourLastEdits: "Our last edits",
    barefootFeel: "BAREFOOT FEEL",
    barefootTitle: "Meet styles designed for natural movement",
    theBrooch: "THE BROOCH",
    broochTitle: "A story about reinventing",
    kidsTable: "THE KIDS' TABLE",
    kidsTitle: "Go back where the magic never ended.",
    leDetour: "LE DETOUR",
    detourTitle: "The cold has officially knocked at the door.",
    backToReality: "BACK TO REALITY",
    realityTitle: "FW25 just landed.",
    newColorways: "TB.490. NEW COLORWAYS.",
    colorwaysTitle: "Shades that embody vivacity.",
    layeringEdit: "THE LAYERING EDIT",
    layeringTitle: "Spring styling done our way.",
    
    // Products
    topFinds: "Top Finds",
    preOrder: "Pre-order 30%",
    inStock: "In stock",
    colors: "colors",
    
    // Footer
    shop: "Shop",
    bestsellers: "Bestsellers",
    help: "Help",
    shippingReturns: "Shipping & Returns",
    contactUs: "Contact Us",
    about: "About",
    ourStory: "Our Story",
    sustainability: "Sustainability",
    followUs: "Follow Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookies: "Cookies",
    
    // Promo
    subscribeNow: "Subscribe Now",
    
    // Newsletter
    backToShop: "Back to Shop",
    get10Off: "GET 10% OFF",
    newsletterDesc: "Subscribe to our newsletter and receive 10% off your first order, plus early access to new collections and exclusive offers.",
    enterEmail: "Enter your email",
    subscribe: "Subscribe",
    bySubscribing: "By subscribing, you agree to receive marketing emails from Platano.",
    thankYou: "THANK YOU",
    thankYouDesc: "Your discount code has been sent to your email. Check your inbox for 10% off your first order.",
    startShopping: "Start Shopping",
    
    // Language
    language: "Language",
  },
  ES: {
    // Announcement
    freeShipping: "Envío gratis en pedidos superiores a 150€",
    
    // Menu
    menu: "MENÚ",
    newIn: "Novedades",
    readyToShip: "Listo para enviar | En Stock",
    s26Collection: "Colección S26",
    sale: "Rebajas",
    aboutPrincesaPlatano: "Sobre Princesa Platano",
    
    // Hero
    newCollection: "Nueva Colección",
    springSummer: "PRIMAVERA VERANO 2026",
    shopNow: "Comprar Ahora",
    explore: "Explorar",
    
    // Categories
    ourCategories: "Nuestras Categorías",
    sneakers: "Zapatillas",
    balletFlats: "Bailarinas",
    loafers: "Mocasines",
    barefoot: "Barefoot",
    boots: "Botas",
    sandals: "Sandalias",
    heels: "Tacones",
    
    // Featured
    ourLastEdits: "Nuestras últimas ediciones",
    barefootFeel: "SENSACIÓN BAREFOOT",
    barefootTitle: "Conoce estilos diseñados para el movimiento natural",
    theBrooch: "EL BROCHE",
    broochTitle: "Una historia sobre reinventarse",
    kidsTable: "LA MESA DE LOS NIÑOS",
    kidsTitle: "Vuelve donde la magia nunca terminó.",
    leDetour: "LE DETOUR",
    detourTitle: "El frío ha llamado oficialmente a la puerta.",
    backToReality: "VUELTA A LA REALIDAD",
    realityTitle: "OI25 acaba de aterrizar.",
    newColorways: "TB.490. NUEVOS COLORES.",
    colorwaysTitle: "Tonos que encarnan la vivacidad.",
    layeringEdit: "EDICIÓN CAPAS",
    layeringTitle: "Estilismo de primavera a nuestra manera.",
    
    // Products
    topFinds: "Los Más Buscados",
    preOrder: "Pre-pedido 30%",
    inStock: "En stock",
    colors: "colores",
    
    // Footer
    shop: "Tienda",
    bestsellers: "Más Vendidos",
    help: "Ayuda",
    shippingReturns: "Envíos y Devoluciones",
    contactUs: "Contáctanos",
    about: "Sobre Nosotros",
    ourStory: "Nuestra Historia",
    sustainability: "Sostenibilidad",
    followUs: "Síguenos",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    cookies: "Cookies",
    
    // Promo
    subscribeNow: "Suscríbete",
    
    // Newsletter
    backToShop: "Volver a la Tienda",
    get10Off: "OBTÉN 10% OFF",
    newsletterDesc: "Suscríbete a nuestro boletín y recibe un 10% de descuento en tu primer pedido, además de acceso anticipado a nuevas colecciones y ofertas exclusivas.",
    enterEmail: "Introduce tu email",
    subscribe: "Suscribirse",
    bySubscribing: "Al suscribirte, aceptas recibir emails de marketing de Platano.",
    thankYou: "GRACIAS",
    thankYouDesc: "Tu código de descuento ha sido enviado a tu email. Revisa tu bandeja de entrada para obtener el 10% de descuento.",
    startShopping: "Empezar a Comprar",
    
    // Language
    language: "Idioma",
  },
}

type TranslationContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.EN) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN")

  const t = (key: keyof typeof translations.EN) => {
    return translations[language][key] || key
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
