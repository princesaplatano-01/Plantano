import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NewInPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-24 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8">New In</h1>
        {/* Placeholder for products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted h-64 rounded"></div>
          <div className="bg-muted h-64 rounded"></div>
          <div className="bg-muted h-64 rounded"></div>
          <div className="bg-muted h-64 rounded"></div>
        </div>
      </div>
      <Footer />
    </main>
  )
}