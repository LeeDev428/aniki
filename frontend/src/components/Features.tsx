'use client'

import { Truck, ShieldCheck, Headphones, RotateCcw, Sparkles, Heart, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from './animations'

const features = [
  {
    icon: ShieldCheck,
    title: '100% Authentic',
    description: 'All products are officially licensed and verified',
    color: 'pink'
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free worldwide shipping on orders over $50',
    color: 'peach'
  },
  {
    icon: Heart,
    title: 'Collector Community',
    description: 'Join 10K+ happy collectors worldwide',
    color: 'pink'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
    color: 'peach'
  }
]

const categories = [
  { name: 'Anime Figures', count: '250+', emoji: '🎭', gradient: 'from-pink-500 to-pink-400' },
  { name: 'Funko Pop', count: '150+', emoji: '🎪', gradient: 'from-peach-500 to-peach-400' },
  { name: 'Model Kits', count: '80+', emoji: '🔧', gradient: 'from-pink-400 to-peach-400' },
  { name: 'Accessories', count: '100+', emoji: '✨', gradient: 'from-peach-400 to-pink-400' },
]

export default function Features() {
  return (
    <>
      {/* Why Choose Aniki Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-soft-pink rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-soft-peach rounded-full blur-3xl opacity-40" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <FadeIn className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-soft-pink rounded-full text-pink-500 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Why Choose Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-display mb-4">
              Why Choose <span className="text-gradient">Aniki</span>
            </h2>
            <p className="text-charcoal-500 max-w-xl mx-auto">
              We&apos;re committed to providing the best experience for anime collectors worldwide.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`group p-6 bg-white rounded-2xl border border-${feature.color === 'pink' ? 'pink' : 'peach'}-100 hover:border-${feature.color === 'pink' ? 'pink' : 'peach'}-200 shadow-soft hover:shadow-card transition-all duration-300 h-full`}
                >
                  <div className={`w-14 h-14 mb-5 rounded-2xl ${feature.color === 'pink' ? 'bg-soft-pink' : 'bg-soft-peach'} flex items-center justify-center`}>
                    <feature.icon className={`w-7 h-7 ${feature.color === 'pink' ? 'text-pink-500' : 'text-peach-500'}`} />
                  </div>
                  <h3 className="font-bold text-lg text-charcoal mb-2 font-display">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-20 bg-gradient-to-b from-cream to-soft-pink/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-soft-peach rounded-full text-peach-500 text-sm font-semibold mb-4">
                <Star className="w-4 h-4" />
                Shop by Category
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-display mb-2">
                Browse <span className="text-gradient">Categories</span>
              </h2>
              <p className="text-charcoal-500 max-w-lg">
                Explore our wide range of collectibles from your favorite anime series and games.
              </p>
            </div>
            <Link 
              href="/shop" 
              className="group flex items-center gap-2 px-6 py-3 bg-charcoal text-white text-sm rounded-full font-semibold hover:bg-charcoal-700 transition-all"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <StaggerItem key={index}>
                <Link
                  href={`/shop?category=${category.name.toLowerCase().replace(' ', '-')}`}
                  className="group relative bg-white rounded-3xl overflow-hidden block shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Gradient top border */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${category.gradient}`} />
                  
                  <div className="p-6 lg:p-8">
                    <div className="text-4xl lg:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.emoji}
                    </div>
                    <div className="relative">
                      <span className="text-sm text-pink-500 font-semibold">{category.count}</span>
                      <h3 className="text-lg font-bold text-charcoal mt-1 group-hover:text-pink-500 transition-colors font-display">
                        {category.name}
                      </h3>
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-soft-pink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-pink-500" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Limited Drop Banner */}
      <FadeIn>
        <section className="relative py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-pink-400 to-peach-500 rounded-3xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>
              
              {/* Floating icons */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-6 right-10 text-4xl opacity-80"
              >
                🔥
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute bottom-6 left-10 text-3xl opacity-80"
              >
                ✨
              </motion.div>

              <div className="relative px-8 py-12 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4">
                    ⏱️ Limited Time Only
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 font-display">
                    Get 10% Off Your First Order
                  </h2>
                  <p className="text-white/90 max-w-md">
                    Sign up now and receive exclusive deals, early access to new arrivals, and special discounts.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/30 transition-all"
                  />
                  <button className="px-8 py-3.5 bg-white text-pink-500 rounded-full font-bold hover:bg-cream hover:shadow-lg transition-all whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  )
}
