'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { FadeIn } from '@/components/animations'
import { useCartStore, useAuthStore } from '@/lib/store'
import { ordersApi } from '@/lib/api'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const { user, token } = useAuthStore()
  const total = getTotal()
  const shipping = total >= 50 ? 0 : 5.99
  const grandTotal = total + shipping

  const [form, setForm] = useState({
    fullName: '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 text-center">
          <h1 className="text-2xl font-bold text-charcoal font-display mb-2">No items to checkout</h1>
          <Link href="/shop" className="text-pink-500 hover:text-pink-600 text-sm font-medium">
            Go to Shop
          </Link>
        </div>
      </PageLayout>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const orderData: Record<string, unknown> = {
        items: items.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: form.fullName.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          postalCode: form.postalCode.trim(),
          country: form.country.trim(),
          phone: form.phone.trim(),
        },
        paymentMethod: 'cod',
        notes: form.notes.trim() || undefined,
      }

      // Guest checkout info
      if (!token) {
        orderData.guestEmail = form.email.trim()
        orderData.guestName = form.fullName.trim()
      }

      const order = await ordersApi.create(orderData, token || undefined)
      clearCart()
      router.push(`/order-confirmation/${order._id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order')
    } finally {
      setSubmitting(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <FadeIn>
          <Link href="/cart" className="flex items-center gap-2 text-sm text-charcoal-400 hover:text-pink-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-2xl font-bold text-charcoal font-display mb-6">Checkout</h1>
        </FadeIn>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Shipping Form */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h2 className="text-lg font-bold text-charcoal font-display mb-4">Shipping Information</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal-600 mb-1">Full Name *</label>
                      <input
                        required
                        value={form.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-charcoal-600 mb-1">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-600 mb-1">Address *</label>
                    <input
                      required
                      value={form.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal-600 mb-1">City *</label>
                      <input
                        required
                        value={form.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-charcoal-600 mb-1">Postal Code *</label>
                      <input
                        required
                        value={form.postalCode}
                        onChange={(e) => updateField('postalCode', e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-charcoal-600 mb-1">Country *</label>
                      <input
                        required
                        value={form.country}
                        onChange={(e) => updateField('country', e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-600 mb-1">Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                      placeholder="+1 234 567 890"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-600 mb-1">Order Notes</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2.5 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Order Summary */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
                <h2 className="text-lg font-bold text-charcoal font-display mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product._id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-soft-pink overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.url || '/assets/sample/1.png'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal truncate">{item.product.name}</p>
                        <p className="text-xs text-charcoal-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-charcoal">€{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-pink-100 pt-3 space-y-2 text-sm">
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
                  <div className="border-t border-pink-100 pt-2 flex justify-between">
                    <span className="font-bold text-charcoal">Total</span>
                    <span className="text-lg font-bold text-gradient">€{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {error && (
                  <p className="mt-3 text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-pink-500 to-peach-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  {submitting ? 'Placing Order...' : 'Place Order'}
                </button>

                <p className="mt-3 text-[10px] text-charcoal-400 text-center">
                  Cash on Delivery — Pay when you receive your order
                </p>
              </div>
            </FadeIn>
          </div>
        </form>
      </div>
    </PageLayout>
  )
}
