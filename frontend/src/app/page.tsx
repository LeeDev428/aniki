import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Brands from '@/components/Brands'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Features />
      <Brands />
      <Footer />
    </main>
  )
}
