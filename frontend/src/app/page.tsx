'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Brands from '@/components/Brands'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  return (
    <>
      <LoadingScreen minDuration={1500} />
      <main className="min-h-screen bg-cream">
        <Navbar />
        <Hero />
        <Features />
        <Brands />
        <Footer />
      </main>
    </>
  )
}
