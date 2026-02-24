'use client'

import { Star, ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from './animations'

// Sample fan favorites data - replace with actual product data
const favorites = [
  {
    id: 1,
    name: 'Levi Ackerman',
    series: 'Attack on Titan',
    price: 159.99,
    image: '/products/levi.jpg',
    rating: 4.9,
    reviews: 234,
  },
  {
    id: 2,
    name: 'Rem',
    series: 'Re:Zero',
    price: 129.99,
    image: '/products/rem.jpg',
    rating: 4.8,
    reviews: 189,
  },
  {
    id: 3,
    name: 'Naruto Sage Mode',
    series: 'Naruto Shippuden',
    price: 199.99,
    image: '/products/naruto.jpg',
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 4,
    name: 'Miku Hatsune',
    series: 'Vocaloid',
    price: 89.99,
    image: '/products/miku.jpg',
    rating: 4.7,
    reviews: 156,
  },
]

export default function FanFavorites() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Decorative backgrounds */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-soft-pink rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-soft-peach rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <FadeIn className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-soft-pink rounded-full text-pink-500 text-sm font-semibold mb-4">
              <Heart className="w-4 h-4 fill-pink-500" />
              Community Picks
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal font-display mb-2">
              Fan <span className="text-gradient">Favorites</span>
            </h2>
            <p className="text-charcoal-500 max-w-lg">
              The most loved figures by our collector community. See what everyone&apos;s adding to their collection.
            </p>
          </div>
          <Link 
            href="/shop?sort=popular" 
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-peach-500 text-white text-sm rounded-full font-semibold hover:shadow-lg hover:shadow-pink-200/50 transition-all hover:-translate-y-0.5"
          >
            View All Favorites
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((product, index) => (
            <StaggerItem key={product.id}>
              <Link href={`/product/${product.id}`}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-soft-pink to-soft-peach overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      {/* Placeholder - replace with actual image */}
                      <div className="w-full h-full bg-white/30 rounded-2xl flex items-center justify-center">
                        <span className="text-5xl">🎭</span>
                      </div>
                    </div>
                    
                    {/* Rank badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-peach-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      #{index + 1}
                    </div>
                    
                    {/* Wishlist */}
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-pink-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-pink-500 hover:text-white">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-pink-500 font-semibold uppercase tracking-wider mb-1">
                      {product.series}
                    </p>
                    <h3 className="font-bold text-charcoal text-base mb-2 group-hover:text-pink-500 transition-colors font-display line-clamp-1">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-peach-500 fill-peach-500" />
                        <span className="text-sm font-semibold text-charcoal">{product.rating}</span>
                      </div>
                      <span className="text-xs text-charcoal-400">({product.reviews} reviews)</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gradient">
                        €{product.price.toFixed(2)}
                      </span>
                      <span className="text-xs px-3 py-1 bg-soft-pink rounded-full text-pink-500 font-medium">
                        Best Seller
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
