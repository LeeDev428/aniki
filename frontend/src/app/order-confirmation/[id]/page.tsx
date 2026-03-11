'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Package, ArrowLeft, Copy, Check } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { FadeIn, ScaleIn } from '@/components/animations'
import { ordersApi } from '@/lib/api'
import type { Order } from '@/types'

export default function OrderConfirmationPage() {
  const { id } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!id || typeof id !== 'string') return
    ordersApi.getById(id)
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false))
  }, [id])

  const copyOrderId = () => {
    if (!order) return
    navigator.clipboard.writeText(order._id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="animate-pulse space-y-4">
            <div className="w-16 h-16 rounded-full bg-pink-100 mx-auto" />
            <div className="h-6 bg-pink-100 rounded w-48 mx-auto" />
            <div className="h-4 bg-pink-50 rounded w-64 mx-auto" />
          </div>
        </div>
      </PageLayout>
    )
  }

  if (!order) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-bold text-charcoal font-display mb-2">Order Not Found</h1>
          <p className="text-charcoal-400 mb-4 text-sm">This order doesn&apos;t exist or has been removed.</p>
          <Link href="/shop" className="text-pink-500 hover:text-pink-600 text-sm font-medium">
            Go to Shop
          </Link>
        </div>
      </PageLayout>
    )
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-indigo-100 text-indigo-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-12">
        {/* Success Header */}
        <ScaleIn>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal font-display mb-1">Order Placed!</h1>
            <p className="text-charcoal-400 text-sm">Thank you for your purchase</p>
          </div>
        </ScaleIn>

        {/* Order Details Card */}
        <FadeIn delay={0.15}>
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-charcoal-400 mb-0.5">Order ID</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-charcoal">{order._id}</code>
                  <button onClick={copyOrderId} className="text-charcoal-300 hover:text-pink-500 transition-colors">
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status] || statusColors.pending}`}>
                {order.status}
              </span>
            </div>

            <div className="border-t border-pink-100 pt-4 space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="text-charcoal font-medium">{item.name}</p>
                    <p className="text-charcoal-400 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-charcoal font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-pink-100 mt-4 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-400">Subtotal</span>
                <span className="text-charcoal">€{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-400">Shipping</span>
                <span className="text-charcoal">{order.shipping === 0 ? <span className="text-green-500">Free</span> : `€${order.shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-pink-100 pt-1.5 flex justify-between">
                <span className="font-bold text-charcoal">Total</span>
                <span className="font-bold text-lg text-gradient">€{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Shipping Address */}
        <FadeIn delay={0.25}>
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-pink-500" />
              <h2 className="text-sm font-bold text-charcoal font-display">Shipping Address</h2>
            </div>
            <div className="text-sm text-charcoal-600 space-y-0.5">
              <p className="font-medium text-charcoal">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
              {order.shippingAddress.phone && <p>{order.shippingAddress.phone}</p>}
            </div>
          </div>
        </FadeIn>

        {/* Actions */}
        <FadeIn delay={0.35}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-500 to-peach-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-pink-200 text-charcoal font-semibold rounded-xl hover:bg-pink-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              My Orders
            </Link>
          </div>
        </FadeIn>
      </div>
    </PageLayout>
  )
}
