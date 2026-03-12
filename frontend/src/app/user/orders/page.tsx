'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, Clock, ChevronRight } from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { ordersApi } from '@/lib/api'
import type { Order } from '@/types'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
  confirmed: 'bg-blue-50 text-blue-600 border border-blue-200',
  processing: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
  shipped: 'bg-purple-50 text-purple-600 border border-purple-200',
  delivered: 'bg-green-50 text-green-600 border border-green-200',
  cancelled: 'bg-red-50 text-red-600 border border-red-200',
}

const paymentColors: Record<string, string> = {
  pending: 'text-yellow-600',
  paid: 'text-green-600',
  failed: 'text-red-500',
  refunded: 'text-gray-500',
}

export default function UserOrdersPage() {
  const { token } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    ordersApi
      .getMyOrders(token)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-xl font-bold text-charcoal font-display">My Orders</h1>
        <p className="text-sm text-charcoal-400 mt-0.5">Track and review your purchases.</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-soft p-4 animate-pulse">
              <div className="flex justify-between mb-3">
                <div className="h-3.5 bg-gray-100 rounded w-36" />
                <div className="h-5 bg-gray-100 rounded-full w-20" />
              </div>
              <div className="h-3 bg-gray-100 rounded w-48 mb-1.5" />
              <div className="h-3 bg-gray-100 rounded w-24" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
          <Package className="w-12 h-12 text-pink-100 mx-auto mb-3" />
          <h2 className="text-base font-bold text-charcoal mb-1">No orders yet</h2>
          <p className="text-sm text-charcoal-400 mb-5">Start your anime figure collection!</p>
          <Link
            href="/shop"
            className="inline-flex px-5 py-2.5 bg-gradient-to-r from-pink-500 to-peach-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-2.5">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/order-confirmation/${order._id}`}
              className="block bg-white rounded-2xl shadow-soft hover:shadow-card-hover transition-all group"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs text-charcoal-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-xs font-mono text-charcoal-500 mt-0.5">
                      #{order._id.slice(-10).toUpperCase()}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${
                    statusColors[order.status] || statusColors.pending
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Body */}
              <div className="px-5 py-3">
                <p className="text-sm text-charcoal-700 truncate font-medium">
                  {order.items.map((i) => i.name).join(', ')}
                </p>
                <p className="text-xs text-charcoal-400 mt-0.5">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 pb-4">
                <span
                  className={`text-xs font-medium capitalize ${
                    paymentColors[order.paymentStatus] || paymentColors.pending
                  }`}
                >
                  Payment: {order.paymentStatus}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-charcoal">€{order.total.toFixed(2)}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-pink-500 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
