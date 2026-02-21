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
            <h2 className="text-2xl lg:text-3xl font-bold text-dark-800 mb-3">
              Why Choose Us
            </h2>
            <p className="text-sm text-dark-400 max-w-xl mx-auto">
              We&apos;re committed to providing the best experience for anime collectors worldwide.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="group p-5 bg-cream rounded-xl hover:bg-primary-50 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center transition-colors">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-base text-dark-800 mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-dark-400 leading-relaxed">
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
              <h2 className="text-2xl lg:text-3xl font-bold text-dark-800 mb-2">
                Browse Categories
              </h2>
              <p className="text-sm text-dark-400 max-w-lg">
                Explore our wide range of collectibles from your favorite anime series and games.
              </p>
            </div>
            <Link 
              href="/shop" 
              className="px-5 py-2.5 bg-dark-800 text-white text-sm rounded-full font-medium hover:bg-dark-700 transition-colors"
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
                    <span className="text-xs text-primary-500 font-medium">{category.count}</span>
                    <h3 className="text-base font-semibold text-dark-800 mt-0.5 group-hover:text-primary-500 transition-colors">
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
            <div className="relative overflow-hidden bg-gradient-dark rounded-2xl p-6 lg:p-12">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent2-400 rounded-full blur-3xl" />
              </div>

              <div className="relative text-center max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-400/20 rounded-full mb-4">
                  <Zap className="w-3.5 h-3.5 text-accent-400" />
                  <span className="text-xs font-medium text-accent-300">Limited Time Offer</span>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Get 10% Off Your First Order
                </h2>
                <p className="text-sm text-dark-300 mb-6">
                  Sign up now and receive exclusive deals, early access to new arrivals, and special discounts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-full text-white placeholder-dark-300 focus:outline-none focus:border-primary-400"
                  />
                  <button className="px-5 py-2.5 text-sm bg-primary-400 text-dark-800 rounded-full font-semibold hover:bg-primary-300 transition-colors">
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
