'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function UserCartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const shipping = total >= 50 ? 0 : 5.99
  const grandTotal = total + shipping

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-xl font-bold text-charcoal font-display">My Cart</h1>
        <p className="text-sm text-charcoal-400 mt-0.5">
          {items.length > 0
            ? `${items.length} item${items.length !== 1 ? 's' : ''} in your cart`
            : 'Your cart is empty'}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
          <ShoppingCart className="w-12 h-12 text-pink-100 mx-auto mb-3" />
          <h2 className="text-base font-bold text-charcoal mb-1">Nothing here yet</h2>
          <p className="text-sm text-charcoal-400 mb-5">Browse the shop and add some figures!</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-peach-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all"
          >
            Browse Shop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_300px] gap-5">
          {/* Cart Items */}
          <div className="space-y-2.5">
            <div className="bg-white rounded-2xl shadow-soft divide-y divide-gray-50">
              {items.map((item) => (
                <div key={item.product._id} className="flex items-center gap-4 p-4">
                  {/* Image */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="relative w-16 h-16 rounded-xl bg-pink-50 overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={item.product.images[0]?.url || '/assets/sample/1.png'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.product.slug}`}>
                      <h3 className="font-semibold text-charcoal text-sm hover:text-pink-500 transition-colors truncate">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-charcoal-400 mt-0.5">
                      {item.product.franchise || item.product.category}
                    </p>
                    <p className="text-sm font-bold text-pink-500 mt-1">
                      €{item.product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-charcoal-500" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-charcoal">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-charcoal-500" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="text-sm font-bold text-charcoal w-16 text-right hidden sm:block">
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="text-xs text-charcoal-400 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-soft p-5 h-fit sticky top-20">
            <h2 className="text-sm font-bold text-charcoal mb-4">Order Summary</h2>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-400">Subtotal</span>
                <span className="font-medium text-charcoal">€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-400">Shipping</span>
                <span className="font-medium text-charcoal">
                  {shipping === 0 ? (
                    <span className="text-green-500">Free</span>
                  ) : (
                    `€${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-pink-500">Free shipping on orders over €50</p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-bold text-charcoal">Total</span>
                <span className="text-base font-bold text-pink-500">€{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-5 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-500 to-peach-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop"
              className="mt-3 w-full flex items-center justify-center py-2.5 text-xs text-charcoal-400 hover:text-pink-500 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
