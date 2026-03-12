'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Package, ShoppingCart, ArrowRight, Clock } from 'lucide-react'
import { useAuthStore, useCartStore } from '@/lib/store'
import { ordersApi } from '@/lib/api'
import type { Order } from '@/types'

export default function DashboardPage() {
  const { user, token } = useAuthStore()
  const itemCount = useCartStore((s) => s.getItemCount())
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    ordersApi.getMyOrders(token)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [token])

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-indigo-100 text-indigo-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  const recentOrders = orders.slice(0, 3)

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal font-display">
          Hey, {user?.username}! 👋
        </h1>
        <p className="text-charcoal-400 text-sm mt-1">Here&apos;s what&apos;s happening with your account.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-peach-500 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-charcoal">
            {loading ? '—' : orders.length}
          </p>
          <p className="text-xs text-charcoal-400 mt-0.5">Total Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-peach-500 to-pink-500 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-charcoal">{itemCount}</p>
          <p className="text-xs text-charcoal-400 mt-0.5">Cart Items</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-soft mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-pink-50">
          <h2 className="font-bold text-charcoal font-display text-sm">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-1 text-xs text-pink-500 hover:text-pink-600 font-medium"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-50" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-pink-50 rounded w-32" />
                  <div className="h-2.5 bg-pink-50 rounded w-20" />
                </div>
                <div className="h-5 bg-pink-50 rounded-full w-16" />
              </div>
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-10 h-10 text-pink-200 mx-auto mb-2" />
            <p className="text-sm text-charcoal-400">No orders yet</p>
            <Link
              href="/shop"
              className="inline-block mt-3 text-xs text-pink-500 font-medium hover:text-pink-600"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-pink-50">
            {recentOrders.map((order) => (
              <Link
                key={order._id}
                href={`/order-confirmation/${order._id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-pink-50/50 transition-colors group"
              >
                {/* Product image from first item */}
                <div className="w-10 h-10 rounded-xl bg-soft-pink flex-shrink-0 overflow-hidden">
                  {order.items[0] && typeof order.items[0].product !== 'string' && (order.items[0].product as { images?: {url:string}[] }).images?.[0] ? (
                    <Image
                      src={(order.items[0].product as { images: {url:string}[] }).images[0].url}
                      alt={order.items[0].name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-pink-300" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal truncate">
                    {order.items.length === 1 ? order.items[0].name : `${order.items.length} items`}
                  </p>
                  <p className="text-xs text-charcoal-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${statusColors[order.status] || statusColors.pending}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-charcoal">€{order.total.toFixed(2)}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-charcoal-300 group-hover:text-pink-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/shop"
          className="flex items-center gap-4 bg-gradient-to-r from-pink-500 to-peach-500 rounded-2xl p-5 text-white hover:shadow-lg hover:shadow-pink-200/50 transition-all hover:-translate-y-0.5"
        >
          <ShoppingCart className="w-8 h-8 opacity-90" />
          <div>
            <p className="font-bold font-display">Browse Shop</p>
            <p className="text-xs text-white/70 mt-0.5">Discover new figures</p>
          </div>
          <ArrowRight className="w-5 h-5 ml-auto" />
        </Link>

        <Link
          href="/dashboard/orders"
          className="flex items-center gap-4 bg-white rounded-2xl p-5 border-2 border-pink-100 hover:border-pink-300 transition-all hover:-translate-y-0.5"
        >
          <Package className="w-8 h-8 text-pink-500" />
          <div>
            <p className="font-bold font-display text-charcoal">My Orders</p>
            <p className="text-xs text-charcoal-400 mt-0.5">Track your purchases</p>
          </div>
          <ArrowRight className="w-5 h-5 ml-auto text-charcoal-300" />
        </Link>
      </div>
    </div>
  )
}
