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
    aboutPrincesaPlatano: "About Princesa Plátano",
    aLittleSacred: "A Little Sacred",
    aLittleStrange: "A Little Strange",
    
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
    theDrop: "THE DROP",
    sacredSpring: "SACRED SPRING",
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
    product1: "UFO Plum Necklace",
    product2: "Star Fig Necklace",
    product3: "Roseberry Orbit Necklace",
    product4: "Cosmic Apple Necklace",
    product5: "Blue Neblua Necklace",
    product6: "Orion Berry Necklace",
    product7: "Solar Eclipse Necklace",
    product8: "Cherry Chita Necklace",
    product9: "Moon Pitaya Necklace",
    product10: "Solar Lemon Necklace",
    product11: "Tangerine Meteor Necklace",
    
    // Footer
    shop: "Shop",
    bestsellers: "Bestsellers",
    help: "Help",
    shippingReturns: "Shipping",
    contactUs: "Contact Us",
    about: "About",
    ourStory: "Our Story",
    sustainability: "Sustainability",
    followUs: "Follow Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookies: "Cookies",
    footerCredit: "© 2026, PRINCESA PLÁTANO jewelry website by @bybambou",
    
    // Promo
    subscribeNow: "Subscribe Now",
    
    // Newsletter
    backToShop: "Back to Shop",
    get10Off: "GET 10% OFF",
    product2: "Star Fig Necklace",
    product3: "Roseberry Orbit Necklace",
    product4: "Cosmic Apple Necklace",
    product5: "Blue Neblua Necklace",
    product6: "Orion Berry Necklace",
    product7: "Solar Eclipse Necklace",
    product8: "Cherry Chita Necklace",
    product9: "Moon Pitaya Necklace",
    product10: "Solar Lemon Necklace",
    product11: "Tangerine Meteor Necklace",
    // Home (force Spanish caps)
    aboutPrincesaPlatanoHome: "SOBRE PRINCESA PLÁTANO",
    
    // About page
    aboutHeading1: "Princesa Plátano is an ode to my inner child that's what I used to call myself.",
    aboutHeading2: "Now it's a brand that celebrates being different and unique.",
    aboutPara1: "Princesa Plátano creates one of a kind pieces, handmade in Mexico. Crafted with global treasures I’ve discovered through my adventures around the world. Each piece is eclectic, special, and truly unique.",
    aboutPara2: "No repeats. No copies.",
    
    // Contact page
    contactHeading: "Contact",
    contactSubheading: "We're here to help.",
    contactIntro: "For inquiries, collaborations or custom pieces, please reach out via email at hello@princesaplatano.com or use the contact form below.",
    placeholderName: "Your name",
    placeholderEmail: "Your email",
    placeholderMessage: "Message",
    sendButton: "Send",
    
    // Sale page
    saleMessage: "No sales yet, stay tuned.",
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
    aboutPrincesaPlatano: "Sobre Princesa Plátano",
    aLittleSacred: "Un Poco Sagrado",
    aLittleStrange: "Un Poco Extraño",
    
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
    theDrop: "EL LANZAMIENTO",
    sacredSpring: "PRIMAVERA SAGRADA",
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
    product1: "UFO Plum Necklace",
    product2: "Star Fig Necklace",
    product3: "Roseberry Orbit Necklace",
    product4: "Cosmic Apple Necklace",
    product5: "Blue Neblua Necklace",
    product6: "Orion Berry Necklace",
    product7: "Solar Eclipse Necklace",
    product8: "Cherry Chita Necklace",
    product9: "Moon Pitaya Necklace",
    product10: "Solar Lemon Necklace",
    product11: "Tangerine Meteor Necklace",
    
    // Footer
    shop: "Tienda",
    bestsellers: "Más Vendidos",
    help: "Ayuda",
    shippingReturns: "Envíos",
    contactUs: "Contáctanos",
    about: "Sobre Nosotros",
    ourStory: "Nuestra Historia",
    sustainability: "Sostenibilidad",
    followUs: "Síguenos",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    cookies: "Cookies",
    footerCredit: "© 2026, PRINCESA PLÁTANO jewelry . por @bybambou",
    
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
    // Home (force Spanish caps)
    aboutPrincesaPlatanoHome: "SOBRE PRINCESA PLÁTANO",
    
    // About page
    aboutHeading1: "Princesa Plátano es un homenaje a mi niña interior, así es como solía llamarme.",
    aboutHeading2: "Ahora es una marca que celebra ser diferente y único.",
    aboutPara1: "Princesa Plátano crea piezas únicas, hechas a mano en México. Elaboradas con tesoros globales que he descubierto en mis aventuras por el mundo. Cada pieza es ecléctica, especial y verdaderamente única.",
    aboutPara2: "Sin repeticiones. Sin copias.",

    // Contact page
    contactHeading: "Contacto",
    contactSubheading: "Estamos aquí para ayudarte.",
    contactIntro: "Para consultas, colaboraciones o piezas personalizadas, contáctanos por correo a hello@princesaplatano.com o utiliza el formulario de contacto a continuación.",
    placeholderName: "Tu nombre",
    placeholderEmail: "Tu email",
    placeholderMessage: "Mensaje",
    sendButton: "Enviar",

    // Sale page
    saleMessage: "Aún no hay rebajas, mantente atento.",
  },
}

type TranslationContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.EN) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children, initialLanguage }: { children: ReactNode, initialLanguage?: Language }) {
  const getInitial = (): Language => {
    // Prefer server-provided initialLanguage when available
    if (initialLanguage === 'EN' || initialLanguage === 'ES') return initialLanguage
    try {
      if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem('lang') as Language | null
        if (stored === 'EN' || stored === 'ES') return stored
        const nav = (navigator.language || (navigator as any).userLanguage || 'en').toLowerCase()
        return nav.startsWith('es') ? 'ES' : 'EN'
      }
    } catch (e) {
      // ignore
    }
    return 'EN'
  }

  const [language, setLanguageState] = useState<Language>(getInitial)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem('lang', lang)
    } catch (e) {
      // ignore
    }
  }

  const t = (key: keyof typeof translations.EN) => {
    return translations[language][key] || key
  }

  // keep html lang in sync
  ;(typeof window !== 'undefined') && (function useSyncLang() {
    try {
      if (typeof window !== 'undefined') {
        // run in microtask to avoid SSR issues
        setTimeout(() => {
          document.documentElement.lang = language === 'ES' ? 'es' : 'en'
        }, 0)
      }
    } catch (e) {}
  })()

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
