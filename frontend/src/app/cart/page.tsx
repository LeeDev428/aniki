'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { FadeIn } from '@/components/animations'
import { useCartStore } from '@/lib/store'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const shipping = total >= 50 ? 0 : 5.99
  const grandTotal = total + shipping

  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 text-center">
          <ShoppingCart className="w-16 h-16 text-pink-200 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-charcoal font-display mb-2">Your Cart is Empty</h1>
          <p className="text-charcoal-400 mb-6">Looks like you haven&apos;t added any figures yet.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-peach-500 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all"
          >
            Browse Shop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <FadeIn>
          <h1 className="text-2xl font-bold text-charcoal font-display mb-6">
            Shopping Cart <span className="text-charcoal-400 text-lg font-normal">({items.length} items)</span>
          </h1>
        </FadeIn>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Cart Items */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl shadow-soft divide-y divide-pink-50">
              {items.map((item) => (
                <div key={item.product._id} className="flex items-center gap-4 p-4">
                  {/* Image */}
                  <Link href={`/product/${item.product.slug}`} className="relative w-20 h-20 rounded-xl bg-gradient-to-br from-soft-pink to-soft-peach overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]?.url || '/assets/sample/1.png'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.product.slug}`}>
                      <h3 className="font-semibold text-charcoal text-sm hover:text-pink-500 transition-colors truncate">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-charcoal-400">{item.product.franchise || item.product.category}</p>
                    <p className="text-sm font-bold text-gradient mt-1">€{item.product.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-pink-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="p-2 hover:bg-soft-pink transition-colors"
                    >
                      <Minus className="w-3 h-3 text-charcoal-500" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-charcoal">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="p-2 hover:bg-soft-pink transition-colors"
                    >
                      <Plus className="w-3 h-3 text-charcoal-500" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="text-sm font-bold text-charcoal w-20 text-right">
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-charcoal-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-xs text-charcoal-400 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </FadeIn>

          {/* Order Summary */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
              <h2 className="text-lg font-bold text-charcoal font-display mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Subtotal</span>
                  <span className="font-medium text-charcoal">€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Shipping</span>
                  <span className="font-medium text-charcoal">
                    {shipping === 0 ? <span className="text-green-500">Free</span> : `€${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-pink-500">Free shipping on orders over €50</p>
                )}
                <div className="border-t border-pink-100 pt-3 flex justify-between">
                  <span className="font-bold text-charcoal">Total</span>
                  <span className="text-lg font-bold text-gradient">€{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-pink-500 to-peach-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop"
                className="mt-3 w-full flex items-center justify-center py-3 text-sm text-charcoal-500 hover:text-pink-500 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageLayout>
  )
}
