'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Product } from '@/types'
import { useCartStore } from '@/lib/store'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setShowAddedFeedback(true)
    setTimeout(() => setShowAddedFeedback(false), 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-pink-500 to-peach-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      <div className="absolute inset-[2px] bg-white rounded-[22px] -z-10" />

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-soft-pink to-soft-peach">
        {product.images?.[0]?.url ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt || product.name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-5xl text-pink-300">
              {product.nameJapanese?.[0] || product.name[0]}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1.5 text-xs rounded-full font-semibold bg-pink-500 text-white shadow-sm">
              NEW
            </span>
          )}
          {product.status === 'pre-order' && (
            <span className="px-3 py-1.5 text-xs rounded-full font-semibold bg-peach-500 text-white shadow-sm">
              PRE-ORDER
            </span>
          )}
          {product.status === 'out-of-stock' && (
            <span className="px-3 py-1.5 text-xs rounded-full font-semibold bg-charcoal text-white shadow-sm">
              SOLD OUT
            </span>
          )}
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="px-3 py-1.5 text-xs rounded-full font-semibold bg-gradient-to-r from-pink-500 to-peach-500 text-white shadow-sm">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Heart - Always visible on mobile, hover on desktop */}
        <motion.button 
          onClick={handleWishlist}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md transition-all duration-300 ${
            isWishlisted 
              ? 'bg-pink-500 text-white' 
              : 'bg-white/90 text-charcoal-500 md:opacity-0 md:group-hover:opacity-100'
          } hover:bg-pink-500 hover:text-white`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-charcoal shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </motion.div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {product.franchise && (
          <p className="text-xs text-pink-500 font-semibold mb-1.5 uppercase tracking-wider">
            {product.franchise}
          </p>
        )}
        <h3 className="font-semibold text-charcoal text-sm leading-tight line-clamp-2 group-hover:text-pink-500 transition-colors font-display">
          {product.name}
        </h3>
        {product.character && (
          <p className="text-xs text-charcoal-500 mt-1">
            {product.character}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gradient">
              €{product.price.toFixed(2)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm text-charcoal-400 line-through">
                €{product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.height && (
            <span className="text-xs text-charcoal-400 bg-soft-pink px-2 py-0.5 rounded-full">
              {product.height}
            </span>
          )}
        </div>

        {/* Add to Cart - Slides up on hover */}
        {product.status === 'in-stock' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            className="mt-3 overflow-hidden max-h-0 group-hover:max-h-12 transition-all duration-300"
          >
            <button 
              onClick={handleAddToCart}
              className="w-full py-2.5 bg-charcoal text-white rounded-full text-sm font-semibold hover:bg-charcoal-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {showAddedFeedback ? 'Added!' : 'Add to Cart'}
            </button>
          </motion.div>
        )}
      </div>
    </Link>
  )
}
