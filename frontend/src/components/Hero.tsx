'use client'

import { ArrowRight, ChevronLeft, ChevronRight, Flame, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FadeIn, StaggerContainer, StaggerItem } from './animations'

const hotDrops = [
  {
    id: 1,
    name: 'Satoru Gojo',
    series: 'Jujutsu Kaisen',
    price: 129.99,
    comparePrice: 162.99,
    image: '/assets/sample/1.png',
    badge: '-20% OFF',
    badgeColor: 'bg-peach-500',
    tag: 'Limitdik Kaisen',
  },
  {
    id: 2,
    name: 'Hatsune Miku',
    series: 'Vocaloid',
    price: 76.99,
    comparePrice: 109.99,
    image: '/assets/sample/2.png',
    badge: '-30% OFF',
    badgeColor: 'bg-pink-500',
    tag: 'Non OFF Stock',
  },
  {
    id: 3,
    name: 'Monkey D. Luffy',
    series: 'One Piece',
    price: 119.99,
    comparePrice: 149.99,
    image: '/assets/sample/3.png',
    badge: '-20% OFF',
    badgeColor: 'bg-peach-500',
    tag: 'Hot ITEM',
  },
  {
    id: 4,
    name: 'Super Saiyan Goku',
    series: 'Dragon Ball Z',
    price: 189.99,
    comparePrice: 219.99,
    image: '/assets/sample/4.png',
    badge: 'Limited',
    badgeColor: 'bg-charcoal',
    tag: 'Hot ITEM',
  },
  {
    id: 5,
    name: 'Sailor Moon',
    series: 'Sailor Moon',
    price: 99.99,
    comparePrice: 129.99,
    image: '/assets/sample/5.png',
    badge: '-23% OFF',
    badgeColor: 'bg-pink-500',
    tag: 'New',
  },
  {
    id: 6,
    name: 'Rem',
    series: 'Re:Zero',
    price: 149.99,
    comparePrice: 179.99,
    image: '/assets/sample/6.png',
    badge: '-17% OFF',
    badgeColor: 'bg-pink-500',
    tag: 'Fan Fav',
  },
  {
    id: 7,
    name: 'Levi Ackerman',
    series: 'Attack on Titan',
    price: 159.99,
    comparePrice: 189.99,
    image: '/assets/sample/7.png',
    badge: '-16% OFF',
    badgeColor: 'bg-charcoal',
    tag: 'Best Seller',
  },
  {
    id: 8,
    name: 'Rem (Maid Ver.)',
    series: 'Re:Zero',
    price: 134.99,
    comparePrice: 164.99,
    image: '/assets/sample/8.png',
    badge: '-18% OFF',
    badgeColor: 'bg-pink-500',
    tag: 'Popular',
  },
  {
    id: 9,
    name: 'Izuku Midoriya',
    series: 'My Hero Academia',
    price: 109.99,
    comparePrice: 139.99,
    image: '/assets/sample/9.png',
    badge: '-21% OFF',
    badgeColor: 'bg-peach-500',
    tag: 'New Arrival',
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % hotDrops.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % hotDrops.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + hotDrops.length) % hotDrops.length)

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background - Soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-soft-pink/30 to-soft-peach/20" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      
      {/* Decorative Blobs */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/4 right-1/4 w-72 h-72 bg-pink-300/40 rounded-full blur-3xl" 
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
        className="absolute bottom-1/3 left-1/5 w-80 h-80 bg-peach-300/30 rounded-full blur-3xl" 
      />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Brand Statement */}
          <StaggerContainer className="text-center lg:text-left">
            {/* Badge */}
            <StaggerItem>
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-soft-pink rounded-full mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </span>
                <span className="text-sm font-medium text-charcoal">
                  ✨ Premium Anime Collectibles
                </span>
              </motion.div>
            </StaggerItem>

            {/* Main Heading */}
            <StaggerItem>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-charcoal leading-[1.05] tracking-tight mb-6 font-display">
                Bring Your
                <span className="block text-gradient">
                  Favorite Characters
                </span>
                Home
              </h1>
            </StaggerItem>

            {/* Description */}
            <StaggerItem>
              <p className="text-lg text-charcoal-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                Discover authentic anime figures, Funko Pops, and premium collectibles 
                from your favorite series. 100% official, delivered with love.
              </p>
            </StaggerItem>

            {/* CTA Buttons */}
            <StaggerItem>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="/shop"
                  className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-peach-500 text-white rounded-full text-base font-semibold hover:shadow-lg hover:shadow-pink-300/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/new-arrivals"
                  className="flex items-center gap-2 px-6 py-4 bg-white/80 backdrop-blur-sm text-charcoal rounded-full text-base font-medium hover:bg-white transition-all border border-pink-100 hover:border-pink-200"
                >
                  New Arrivals
                </Link>
              </div>
            </StaggerItem>

            {/* Trust Badges */}
            <StaggerItem>
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-pink-100 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-soft-pink flex items-center justify-center">
                    <span className="text-lg">🛡️</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">100% Authentic</p>
                    <p className="text-xs text-charcoal-500">Official licensed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-soft-peach flex items-center justify-center">
                    <span className="text-lg">🚚</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">Free Shipping</p>
                    <p className="text-xs text-charcoal-500">On orders $50+</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-soft-pink flex items-center justify-center">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">10K+ Reviews</p>
                    <p className="text-xs text-charcoal-500">Happy collectors</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right Content - Hot Drops Carousel */}
          <FadeIn direction="left" delay={0.3} className="relative">
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-peach-500" />
                  <h3 className="text-xl font-bold text-charcoal font-display">Hot Drops</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-pink-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-charcoal" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-pink-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-charcoal" />
                  </button>
                </div>
              </div>

              {/* Carousel Container */}
              <div className="relative bg-white rounded-3xl shadow-card p-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-soft-pink to-soft-peach overflow-hidden mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Placeholder - Replace with actual image */}
                        <div className="text-center">
                          <div className="w-48 h-64 mx-auto bg-white/50 rounded-2xl flex items-center justify-center">
                            <span className="text-6xl">🎭</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white ${
                        hotDrops[currentSlide].badge === 'Hot' ? 'bg-peach-500' :
                        hotDrops[currentSlide].badge === 'New' ? 'bg-pink-500' :
                        'bg-charcoal'
                      }`}>
                        {hotDrops[currentSlide].badge}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-center">
                      <p className="text-sm text-pink-500 font-medium mb-1">
                        {hotDrops[currentSlide].series}
                      </p>
                      <h4 className="text-xl font-bold text-charcoal font-display mb-2">
                        {hotDrops[currentSlide].name}
                      </h4>
                      <p className="text-2xl font-bold text-gradient mb-4">
                        ${hotDrops[currentSlide].price}
                      </p>
                      <Link
                        href={`/product/${hotDrops[currentSlide].id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-full text-sm font-semibold hover:bg-charcoal-700 transition-all"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide Indicators */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {hotDrops.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide 
                          ? 'w-8 bg-gradient-to-r from-pink-500 to-peach-500' 
                          : 'w-2 bg-pink-200 hover:bg-pink-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative floating elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-peach-100 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl">🔥</span>
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2 -left-4 w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-xl">✨</span>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
