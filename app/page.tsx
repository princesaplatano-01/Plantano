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
      <div className="mt-[100px] relative">
        <img
          src="/SCROLL/DSC07548_72y.jpg"
          alt="Scroll detail"
          className="w-full object-cover"
          style={{ height: "auto" }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img src="/Front/PP-LOGO-LTTRNG-VERSION-02.svg" alt="Platano Logo" className="w-[48.4%] md:w-[30.8%] h-auto transform translate-y-[30px] translate-x-[10px]" />
        </div>
      </div>
      {/* FeaturedCollection and ProductGrid sections removed */}
      <Footer />
      <PromoPopup />
    </main>
  )
}
