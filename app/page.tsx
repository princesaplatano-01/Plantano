import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedCollection } from "@/components/featured-collection"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"
import { PromoPopup } from "@/components/promo-popup"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <FeaturedCollection />
      <ProductGrid />
      <Footer />
      <PromoPopup />
    </main>
  )
}
