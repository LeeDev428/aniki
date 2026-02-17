'use client'

import { Truck, ShieldCheck, Headphones, RotateCcw, Zap } from 'lucide-react'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from './animations'

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free worldwide shipping on all orders over $50'
  },
  {
    icon: ShieldCheck,
    title: '100% Authentic',
    description: 'All products are officially licensed and verified'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Get help anytime with our dedicated support team'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy guaranteed'
  }
]

const categories = [
  { name: 'Anime Figures', count: '250+', emoji: '🎭' },
  { name: 'Funko Pop', count: '150+', emoji: '🎪' },
  { name: 'Model Kits', count: '80+', emoji: '🔧' },
  { name: 'Accessories', count: '100+', emoji: '✨' },
]

export default function Features() {
  return (
    <>
      {/* Features Section */}
      <section className="relative py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-3">
              Why Choose Us
            </h2>
            <p className="text-sm text-neutral-600 max-w-xl mx-auto">
              We&apos;re committed to providing the best experience for anime collectors worldwide.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="group p-5 bg-cream rounded-xl hover:bg-honey-50 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-honey-100 group-hover:bg-honey-200 flex items-center justify-center transition-colors">
                    <feature.icon className="w-6 h-6 text-honey-600" />
                  </div>
                  <h3 className="font-semibold text-base text-neutral-900 mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeIn className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-2">
                Browse Categories
              </h2>
              <p className="text-sm text-neutral-600 max-w-lg">
                Explore our wide range of collectibles from your favorite anime series and games.
              </p>
            </div>
            <Link 
              href="/shop" 
              className="px-5 py-2.5 bg-neutral-900 text-white text-sm rounded-full font-medium hover:bg-neutral-800 transition-colors"
            >
              View All Products
            </Link>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {categories.map((category, index) => (
              <StaggerItem key={index}>
                <Link
                  href={`/shop?category=${category.name.toLowerCase().replace(' ', '-')}`}
                  className="group relative p-5 lg:p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden block"
                >
                  <div className="absolute top-3 right-3 text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                    {category.emoji}
                  </div>
                  <div className="relative">
                    <span className="text-xs text-honey-600 font-medium">{category.count}</span>
                    <h3 className="text-base font-semibold text-neutral-900 mt-0.5 group-hover:text-honey-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <FadeIn>
        <section className="relative py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl p-6 lg:p-12">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-72 h-72 bg-honey-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-honey-400 rounded-full blur-3xl" />
              </div>

              <div className="relative text-center max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-honey-500/20 rounded-full mb-4">
                  <Zap className="w-3.5 h-3.5 text-honey-400" />
                  <span className="text-xs font-medium text-honey-400">Limited Time Offer</span>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Get 10% Off Your First Order
                </h2>
                <p className="text-sm text-neutral-400 mb-6">
                  Sign up now and receive exclusive deals, early access to new arrivals, and special discounts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-full text-white placeholder-neutral-400 focus:outline-none focus:border-honey-500"
                  />
                  <button className="px-5 py-2.5 text-sm bg-honey-500 text-white rounded-full font-medium hover:bg-honey-600 transition-colors">
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
