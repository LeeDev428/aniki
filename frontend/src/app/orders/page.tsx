'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, ChevronRight } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { FadeIn } from '@/components/animations'
import { useAuthStore } from '@/lib/store'
import { ordersApi } from '@/lib/api'
import type { Order } from '@/types'

export default function MyOrdersPage() {
  const router = useRouter()
  const { user, token } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token || !user) {
      router.push('/auth/login')
      return
    }
    ordersApi.getMyOrders(token)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [token, user, router])

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-indigo-100 text-indigo-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  const paymentColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-700',
  }

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-8">
        <FadeIn>
          <h1 className="text-2xl font-bold text-charcoal font-display mb-6">My Orders</h1>
        </FadeIn>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-soft p-5 animate-pulse">
                <div className="flex justify-between mb-3">
                  <div className="h-4 bg-pink-100 rounded w-32" />
                  <div className="h-5 bg-pink-100 rounded-full w-20" />
                </div>
                <div className="h-3 bg-pink-50 rounded w-48 mb-2" />
                <div className="h-3 bg-pink-50 rounded w-24" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <FadeIn delay={0.1}>
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-pink-200 mx-auto mb-3" />
              <h2 className="text-lg font-bold text-charcoal font-display mb-1">No orders yet</h2>
              <p className="text-charcoal-400 text-sm mb-4">Browse our collection and find something you love!</p>
              <Link
                href="/shop"
                className="inline-flex px-5 py-2.5 bg-gradient-to-r from-pink-500 to-peach-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all"
              >
                Shop Now
              </Link>
            </div>
          </FadeIn>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <FadeIn key={order._id} delay={idx * 0.05}>
                <Link
                  href={`/order-confirmation/${order._id}`}
                  className="block bg-white rounded-2xl shadow-soft p-5 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs text-charcoal-400 mb-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm font-mono text-charcoal-600">#{order._id.slice(-8)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${statusColors[order.status] || statusColors.pending}`}>
                        {order.status}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${paymentColors[order.paymentStatus] || paymentColors.pending}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-charcoal-400">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gradient">€{order.total.toFixed(2)}</span>
                      <ChevronRight className="w-4 h-4 text-charcoal-300 group-hover:text-pink-500 transition-colors" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
