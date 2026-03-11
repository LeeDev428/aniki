'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Minus, Plus, ArrowLeft, Package, Truck, Shield } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { FadeIn } from '@/components/animations'
import { productsApi } from '@/lib/api'
import { useCartStore } from '@/lib/store'
import type { Product } from '@/types'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore(s => s.addItem)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    productsApi.getBySlug(slug).then(setProduct).catch(() => {
      // Not found
    }).finally(() => setLoading(false))
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-soft-pink rounded-3xl" />
            <div className="space-y-4 py-8">
              <div className="h-4 bg-pink-100 rounded w-1/4" />
              <div className="h-8 bg-pink-100 rounded w-3/4" />
              <div className="h-6 bg-pink-100 rounded w-1/3" />
              <div className="h-20 bg-pink-100 rounded" />
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  if (!product) {
    return (
      <PageLayout>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 text-center">
          <p className="text-5xl mb-4">😢</p>
          <h1 className="text-2xl font-bold text-charcoal mb-2">Product Not Found</h1>
          <p className="text-charcoal-400 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-peach-500 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all">
            Back to Shop
          </Link>
        </div>
      </PageLayout>
    )
  }

  const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0
  const mainImage = product.images[selectedImage]?.url || '/assets/sample/1.png'

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <FadeIn className="mb-6">
          <Link href="/shop" className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-pink-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <FadeIn>
            <div className="space-y-4">
              <div className="relative aspect-square bg-gradient-to-br from-soft-pink to-soft-peach rounded-3xl overflow-hidden">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {discount > 0 && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-pink-500 text-white text-sm font-bold rounded-full">
                    -{discount}%
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-peach-500 text-white text-sm font-bold rounded-full">
                    NEW
                  </span>
                )}
              </div>
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        i === selectedImage ? 'border-pink-500' : 'border-transparent hover:border-pink-200'
                      }`}
                    >
                      <Image src={img.url} alt={img.alt || product.name} fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Product Info */}
          <FadeIn delay={0.15}>
            <div className="py-4">
              <p className="text-sm font-semibold text-pink-500 uppercase tracking-wider mb-2">
                {product.franchise || product.category}
              </p>
              <h1 className="text-3xl font-bold text-charcoal font-display mb-1">{product.name}</h1>
              {product.nameJapanese && (
                <p className="text-lg text-charcoal-400 mb-4">{product.nameJapanese}</p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gradient">€{product.price.toFixed(2)}</span>
                {product.comparePrice && (
                  <span className="text-lg text-charcoal-400 line-through">€{product.comparePrice.toFixed(2)}</span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-charcoal-500 leading-relaxed mb-6">{product.description}</p>
              )}

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {product.brand && product.brand !== 'other' && (
                  <div className="px-4 py-3 bg-soft-pink rounded-xl">
                    <p className="text-xs text-charcoal-400">Brand</p>
                    <p className="text-sm font-medium text-charcoal capitalize">{product.brand}</p>
                  </div>
                )}
                {product.character && (
                  <div className="px-4 py-3 bg-soft-pink rounded-xl">
                    <p className="text-xs text-charcoal-400">Character</p>
                    <p className="text-sm font-medium text-charcoal">{product.character}</p>
                  </div>
                )}
                {product.height && (
                  <div className="px-4 py-3 bg-soft-pink rounded-xl">
                    <p className="text-xs text-charcoal-400">Height</p>
                    <p className="text-sm font-medium text-charcoal">{product.height}</p>
                  </div>
                )}
                {product.material && (
                  <div className="px-4 py-3 bg-soft-pink rounded-xl">
                    <p className="text-xs text-charcoal-400">Material</p>
                    <p className="text-sm font-medium text-charcoal">{product.material}</p>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  product.status === 'in-stock' ? 'bg-green-50 text-green-600' :
                  product.status === 'pre-order' ? 'bg-blue-50 text-blue-500' :
                  'bg-red-50 text-red-500'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    product.status === 'in-stock' ? 'bg-green-500' :
                    product.status === 'pre-order' ? 'bg-blue-500' :
                    'bg-red-500'
                  }`} />
                  {product.status === 'in-stock' ? `In Stock (${product.stock} left)` :
                   product.status === 'pre-order' ? 'Pre-Order' :
                   product.status === 'coming-soon' ? 'Coming Soon' : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              {(product.status === 'in-stock' || product.status === 'pre-order') && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border border-pink-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-3 hover:bg-soft-pink transition-colors"
                    >
                      <Minus className="w-4 h-4 text-charcoal-500" />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold text-charcoal">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                      className="p-3 hover:bg-soft-pink transition-colors"
                    >
                      <Plus className="w-4 h-4 text-charcoal-500" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-pink-500 to-peach-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {added ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-pink-100">
                <div className="flex items-center gap-2 text-xs text-charcoal-400">
                  <Package className="w-4 h-4 text-pink-400" />
                  <span>100% Official</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal-400">
                  <Truck className="w-4 h-4 text-pink-400" />
                  <span>Free Ship €50+</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal-400">
                  <Shield className="w-4 h-4 text-pink-400" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageLayout>
  )
}
