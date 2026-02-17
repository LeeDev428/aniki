'use client'

import { Truck, ShieldCheck, Headphones, RotateCcw, Star, Zap } from 'lucide-react'

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
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We&apos;re committed to providing the best experience for anime collectors worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-cream rounded-2xl hover:bg-honey-50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 mb-5 rounded-xl bg-honey-100 group-hover:bg-honey-200 flex items-center justify-center transition-colors">
                  <feature.icon className="w-7 h-7 text-honey-600" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Browse Categories
              </h2>
              <p className="text-neutral-600 max-w-xl">
                Explore our wide range of collectibles from your favorite anime series and games.
              </p>
            </div>
            <a 
              href="/shop" 
              className="px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
            >
              View All Products
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <a
                key={index}
                href={`/shop?category=${category.name.toLowerCase().replace(' ', '-')}`}
                className="group relative p-6 lg:p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
                  {category.emoji}
                </div>
                <div className="relative">
                  <span className="text-sm text-honey-600 font-medium">{category.count}</span>
                  <h3 className="text-lg font-semibold text-neutral-900 mt-1 group-hover:text-honey-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-3xl p-8 lg:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-honey-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-honey-400 rounded-full blur-3xl" />
            </div>

            <div className="relative text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-honey-500/20 rounded-full mb-6">
                <Zap className="w-4 h-4 text-honey-400" />
                <span className="text-sm font-medium text-honey-400">Limited Time Offer</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Get 10% Off Your First Order
              </h2>
              <p className="text-neutral-400 mb-8">
                Sign up now and receive exclusive deals, early access to new arrivals, and special discounts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-neutral-400 focus:outline-none focus:border-honey-500"
                />
                <button className="px-6 py-3 bg-honey-500 text-white rounded-full font-medium hover:bg-honey-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
