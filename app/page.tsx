import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
// FeaturedCollection and ProductGrid removed per request
import { Footer } from "@/components/footer"
import { PromoPopup } from "@/components/promo-popup"
import { SplitScroll } from "@/components/split-scroll"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <SplitScroll />
      <div className="mt-[100px] relative overflow-hidden">
        <picture>
          <source media="(min-width: 1024px)" srcSet="/SCROLL/DSC07548_72y.jpg" />
          <img
            src="/SCROLL/DSC07548_72y 2.jpg"
            alt="Scroll detail"
            className="w-full object-cover mobile-scale-120"
            style={{ height: "auto" }}
          />
        </picture>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            src="/Front/PP-LOGO-LTTRNG-VERSION-02.svg"
            alt="Platano Logo"
            className="w-[48.4%] md:w-[30.8%] h-auto"
            style={{ transform: 'translateY(10px) translateX(10px) scale(0.8)' }}
          />
        </div>
      </div>
      {/* FeaturedCollection and ProductGrid sections removed */}
      <Footer />
      <PromoPopup />
    </main>
  )
}
