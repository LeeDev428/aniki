'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import type { Product } from '@/types'
import { useCartStore } from '@/lib/store'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        {product.images?.[0]?.url ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt || product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-jp text-4xl text-honey-300">
              {product.nameJapanese?.[0] || product.name[0]}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 text-xs rounded-full font-medium bg-green-500 text-white">
              NEW
            </span>
          )}
          {product.status === 'pre-order' && (
            <span className="px-2 py-1 text-xs rounded-full font-medium bg-purple-500 text-white">
              PRE-ORDER
            </span>
          )}
          {product.status === 'out-of-stock' && (
            <span className="px-2 py-1 text-xs rounded-full font-medium bg-red-500 text-white">
              SOLD OUT
            </span>
          )}
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="px-2 py-1 text-xs rounded-full font-medium bg-honey-500 text-white">
              SALE
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-honey-50 transition-colors"
          >
            <Heart className="w-4 h-4 text-neutral-600" />
          </button>
          {product.status === 'in-stock' && (
            <button 
              onClick={handleAddToCart}
              className="p-2 bg-honey-500 rounded-full shadow-md hover:bg-honey-600 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {product.franchise && (
          <p className="text-xs text-honey-600 font-medium mb-1 uppercase tracking-wide">
            {product.franchise}
          </p>
        )}
        <h3 className="font-medium text-neutral-800 text-sm leading-tight line-clamp-2 group-hover:text-honey-600 transition-colors">
          {product.name}
        </h3>
        {product.character && (
          <p className="text-xs text-neutral-400 mt-1">
            {product.character}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-neutral-800">
              €{product.price.toFixed(2)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm text-neutral-400 line-through">
                €{product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.height && (
            <span className="text-xs text-neutral-400">
              {product.height}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
