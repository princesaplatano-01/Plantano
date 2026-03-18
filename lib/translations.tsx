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
    // Cart / Checkout
    cartTitle: "Cart",
    closeCart: "Close cart",
    cartEmpty: "Your cart is empty",
    remove: "Remove",
    subtotal: "Subtotal",
    goToCheckout: "GO TO CHECKOUT",
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
    knowMore: "Know More",
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
    product5: "Blue Nebula Necklace",
    product6: "Orion Berry Necklace",
    product7: "Solar Eclipse Necklace",
    product8: "Cherry Chita Necklace",
    product9: "Moon Pitaya Necklace",
    product10: "Solar Lemon Necklace",
    product11: "Tangerine Meteor Necklace",
    addToCart: "ADD TO CARD",
    // Product descriptions
    productDesc1: "Oaxaca black clay - Indian ceramic - Tiger eye - Hematit",
    productDesc2: "UNKNOWN clay piece - Oaxaca black clay - African krobo glass - coral - stainless steel - mother of pearl shell",
    productDesc3: "VINTAGE PORCELAINE ROSE BEAD - GREEN AVENTURINE - STAINLESS STEEL - Hematite",
    productDesc4: "MOOKAITE JASPER - GREEN MURANO - STAINLESS STEEL - Hematite",
    productDesc5: "RAW MILY QUARTZ FROM MARFA - BLUE GLASS - STAINLESS STEEL - Hematite",
    productDesc6: "AFRICAN BONE BEAD - ITALIAN recycled GLASS - green german vintage glass from the 70s - STAINLESS STEEL - Hematite",
    productDesc7: "OAXACA BLACK CLAY - AFRICAN KROBO RECYCLED GLASS",
    productDesc8: "UNKNOWN RED Painted seed - ITALIAN recycled GLASS - wood chitah bead - Hematite",
    productDesc9: "DALMATIAN JASPER - CORAL - OAXACA BLACK CLAY - STAINLESS STEEL",
    productDesc10: "Indian Dyed Stone Bead in Neon Green - PALM SEED - HEMATITE - STAINLESS STEEL",
    productDesc11: "PAKISTAN CLAY BEAD - CORAL - JADE - STAINLESS STEEL - Hematite",
    // Checkout / Cart
    payNow: "PAY NOW",
    contact: "Contact",
    delivery: "Delivery",
    ship: "Ship",
    emailOrPhone: "Email or phone number",
    sendNewsOffers: "Send me news and offers by email",
    firstName: "First Name",
    lastName: "Last Name",
    address: "Address",
    apartmentOptional: "Apartment (optional)",
    city: "City",
    postalCode: "Postal Code",
    state: "State",
    phoneLabel: "Phone",
    countryLabel: "Country",
    continueToShipping: "Continue to Shipping",
    showOrderSummary: "Show order summary",
    hideOrderSummary: "Hide order summary",
    shippingLabel: "Shipping",
    totalLabel: "Total",
    completeShippingInfo: "Complete shipping info to enable payment",
    qtyPrefix: "Qty:",
    
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
    footerCreditMain: "© 2026, PRINCESA PLÁTANO jewelry",
    footerCreditBy: "website by @bybambou",
    
    // Promo
    subscribeNow: "Subscribe Now",
    apply: "Apply",
    
    // Newsletter
    backToShop: "Back to Shop",
    get10Off: "GET 10% OFF",
    product2: "Star Fig Necklace",
    product3: "Roseberry Orbit Necklace",
    product4: "Cosmic Apple Necklace",
    product5: "Blue Nebula Necklace",
    product6: "Orion Berry Necklace",
    product7: "Solar Eclipse Necklace",
    product8: "Cherry Chita Necklace",
    product9: "Moon Pitaya Necklace",
    product10: "Solar Lemon Necklace",
    product11: "Tangerine Meteor Necklace",
    // Home (force Spanish caps)
    aboutPrincesaPlatanoHome: " ABOUT PRINCESA PLÁTANO",
    
    // About page
    aboutHeading1: "Princesa Plátano is an ode to my inner child that's what I used to call myself.",
    aboutHeading2: "Now it's a brand that celebrates being different and unique.",
    aboutPara1: "Princesa Plátano creates one of a kind pieces, handmade in Mexico slowly and intentionally by my own hands, almost like a small ritual of creation. Each design is made with global treasures I’ve discovered through my adventures around the world, using ethically and thoughtfully sourced materials that celebrate craftsmanship, culture, and individuality. Every piece is eclectic, special, and truly unique.",
    aboutPara2: "",
    
    // Contact page
    contactHeading: "Contact",
    contactSubheading: "We're here to help.",
    contactIntro: "For inquiries, collaborations or custom pieces, please reach out via email at princesaplatano@gmail.com or use the contact form below.",
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
    newIn: "TIENDA",
    // Cart / Checkout
    cartTitle: "Carrito",
    closeCart: "Cerrar carrito",
    cartEmpty: "Tu carrito está vacío",
    remove: "Eliminar",
    subtotal: "Subtotal",
    goToCheckout: "PAGAR",
    // Product descriptions
    productDesc1: "Barro negro de Oaxaca - Cerámica india - Ojo de tigre - Hematita",
    productDesc2: "Pieza de arcilla desconocida - Barro negro de Oaxaca - Vidrio Krobo africano - Coral - Acero inoxidable - Nácar",
    productDesc3: "Cuenta de porcelana vintage rosa - Aventurina verde - Acero inoxidable - Hematita",
    productDesc4: "Jaspe mookaíta - Murano verde - Acero inoxidable - Hematita",
    productDesc5: "Cuarzo bruto Mily de Marfa - Vidrio azul - Acero inoxidable - Hematita",
    productDesc6: "Cuenta de hueso africano - Vidrio reciclado italiano - Vidrio vintage alemán verde (70s) - Acero inoxidable - Hematita",
    productDesc7: "Barro negro de Oaxaca - Vidrio Krobo africano reciclado",
    productDesc8: "Semilla roja pintada desconocida - Vidrio reciclado italiano - Cuenta de madera chitah - Hematita",
    productDesc9: "Jaspe dálmata - Coral - Barro negro de Oaxaca - Acero inoxidable",
    productDesc10: "Cuenta de piedra teñida de la India en verde neón - Semilla de palma - Hematita - Acero inoxidable",
    productDesc11: "Cuenta de arcilla de Pakistán - Coral - Jade - Acero inoxidable - Hematita",
    // Availability / cart
    outOfStock: "AGOTADO",
    addToCart: "ADD TO CARD",
    // Checkout / Cart
    payNow: "PAGAR",
    contact: "Contacto",
    delivery: "Entrega",
    ship: "Envío",
    emailOrPhone: "Email o número de teléfono",
    sendNewsOffers: "Envíame noticias y ofertas por correo",
    firstName: "Nombre",
    lastName: "Apellido",
    address: "Dirección",
    apartmentOptional: "Apartamento (opcional)",
    city: "Ciudad",
    postalCode: "Código Postal",
    state: "Estado/Provincia",
    phoneLabel: "Teléfono",
    countryLabel: "País",
    continueToShipping: "Continuar al envío",
    showOrderSummary: "Mostrar resumen del pedido",
    hideOrderSummary: "Ocultar resumen del pedido",
    shippingLabel: "Envío",
    totalLabel: "Total",
    completeShippingInfo: "Completa la información de envío para habilitar el pago",
    qtyPrefix: "Cant:",
    readyToShip: "Listo para enviar | En Stock",
    s26Collection: "Coleccíon S26",
    sale: "Rebajas",
    aboutPrincesaPlatano: "Sobre Princesa Plátano",
    aLittleSacred: "Un Poco Sagrado",
    aLittleStrange: "Un Poco Extraño",
    
    // Hero
    newCollection: "Nueva Colección",
    springSummer: "PRIMAVERA VERANO 2026",
    shopNow: "Comprar Ahora",
    knowMore: "Saber más",
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
    product5: "Blue Nebula Necklace",
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
    footerCreditMain: "© 2026, PRINCESA PLÁTANO jewelry",
    footerCreditBy: "por @bybambou",
    
    // Promo
    subscribeNow: "Suscríbete",
    apply: "Aplicar",
    
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
    aboutPara1: "Princesa Plátano crea piezas únicas, hechas a mano en México de forma lenta e intencional por mis propias manos, casi como un pequeño ritual de creación. Cada diseño está elaborado con tesoros globales que he descubierto en mis aventuras por el mundo, utilizando materiales obtenidos de manera ética y consciente que celebran la artesanía, la cultura y la individualidad. Cada pieza es ecléctica, especial y verdaderamente única.",
    aboutPara2: "",

    // Contact page
    contactHeading: "Contacto",
    contactSubheading: "Estamos aquí para ayudarte.",
    contactIntro: "Para consultas, colaboraciones o piezas personalizadas, contáctanos por correo a princesaplatano@gmail.com o utiliza el formulario de contacto a continuación.",
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
