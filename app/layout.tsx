import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { TranslationProvider } from '@/lib/translations'
import { headers } from 'next/headers'
import { CartProvider } from '@/components/cart'
import './globals.css'
import CustomCursor from '@/components/custom-cursor'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: 'PLATANO | On-demand Fashion',
  description: 'Sustainable fashion for the modern individual',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Read preferred language from the cookie header so server renders matching language
  let cookieHeader = ''
  try {
    const h = await headers()
    if (h && typeof (h as any).get === 'function') {
      cookieHeader = (h as any).get('cookie') || ''
    } else if (h && typeof (h as any).cookie === 'string') {
      cookieHeader = (h as any).cookie || ''
    }
  } catch (e) {
    cookieHeader = ''
  }
  const langCookie = cookieHeader.split(';').map(s => s.trim()).find(s => s.startsWith('lang='))?.split('=')[1]
  const initialLang = langCookie === 'ES' ? 'ES' : 'EN'

  return (
    <html lang={initialLang === 'ES' ? 'es' : 'en'}>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <script src="https://js.stripe.com/v3/"></script>
        <TranslationProvider initialLanguage={initialLang}>
          <CartProvider>
            {children}
          </CartProvider>
        </TranslationProvider>
        <Analytics />
        <CustomCursor />
      </body>
    </html>
  )
}
