'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Package, ShoppingCart, ArrowRight, Clock } from 'lucide-react'
import { useAuthStore, useCartStore } from '@/lib/store'
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

export default function UserOverviewPage() {
  const { user, token } = useAuthStore()
  const itemCount = useCartStore((s) => s.getItemCount())
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

  const recentOrders = orders.slice(0, 4)

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-charcoal font-display">
          Hey, {user?.username}! 👋
        </h1>
        <p className="text-sm text-charcoal-400 mt-0.5">
          Here&apos;s an overview of your account.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-soft col-span-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-peach-500 flex items-center justify-center mb-3">
            <Package className="w-4.5 h-4.5 text-white" />
          </div>
          <p className="text-2xl font-bold text-charcoal">
            {loading ? <span className="inline-block w-6 h-6 bg-pink-50 rounded animate-pulse" /> : orders.length}
          </p>
          <p className="text-xs text-charcoal-400 mt-0.5">Total Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-soft col-span-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-peach-500 to-pink-400 flex items-center justify-center mb-3">
            <ShoppingCart className="w-4.5 h-4.5 text-white" />
          </div>
          <p className="text-2xl font-bold text-charcoal">{itemCount}</p>
          <p className="text-xs text-charcoal-400 mt-0.5">Cart Items</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-soft col-span-1">
          <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center mb-3">
            <Package className="w-4.5 h-4.5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-charcoal">
            {loading ? <span className="inline-block w-6 h-6 bg-pink-50 rounded animate-pulse" /> : orders.filter(o => o.status === 'delivered').length}
          </p>
          <p className="text-xs text-charcoal-400 mt-0.5">Delivered</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-soft col-span-1">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
            <Package className="w-4.5 h-4.5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-charcoal">
            {loading ? <span className="inline-block w-6 h-6 bg-pink-50 rounded animate-pulse" /> : orders.filter(o => ['confirmed', 'processing', 'shipped'].includes(o.status)).length}
          </p>
          <p className="text-xs text-charcoal-400 mt-0.5">In Progress</p>
        </div>
      </div>

      {/* Bottom grid: Recent Orders + Quick Actions */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-5">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="text-sm font-bold text-charcoal">Recent Orders</h2>
            <Link
              href="/user/orders"
              className="flex items-center gap-1 text-xs text-pink-500 hover:text-pink-600 font-medium"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="p-5 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded w-32" />
                    <div className="h-2.5 bg-gray-100 rounded w-20" />
                  </div>
                  <div className="h-5 bg-gray-100 rounded-full w-16" />
                </div>
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="p-10 text-center">
              <Package className="w-10 h-10 text-pink-100 mx-auto mb-3" />
              <p className="text-sm text-charcoal-400 mb-1">No orders yet</p>
              <Link href="/shop" className="text-xs text-pink-500 font-medium hover:text-pink-600">
                Start shopping →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <Link
                  key={order._id}
                  href={`/order-confirmation/${order._id}`}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/80 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-pink-50 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {order.items[0] &&
                    typeof order.items[0].product !== 'string' &&
                    (order.items[0].product as { images?: { url: string }[] }).images?.[0] ? (
                      <Image
                        src={(order.items[0].product as { images: { url: string }[] }).images[0].url}
                        alt={order.items[0].name}
                        width={36}
                        height={36}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Package className="w-4 h-4 text-pink-300" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">
                      {order.items.length === 1
                        ? order.items[0].name
                        : `${order.items.length} items`}
                    </p>
                    <p className="text-xs text-charcoal-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                        statusColors[order.status] || statusColors.pending
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-sm font-bold text-charcoal">
                      €{order.total.toFixed(2)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-pink-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Link
            href="/shop"
            className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-peach-500 rounded-2xl p-4 text-white hover:shadow-lg hover:shadow-pink-200/50 transition-all hover:-translate-y-0.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold">Browse Shop</p>
              <p className="text-xs text-white/70 mt-0.5">Discover new figures</p>
            </div>
            <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/user/orders"
            className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 hover:border-pink-200 hover:shadow-soft transition-all hover:-translate-y-0.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
              <Package className="w-4.5 h-4.5 text-pink-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-charcoal">My Orders</p>
              <p className="text-xs text-charcoal-400 mt-0.5">Track your purchases</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/user/cart"
            className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 hover:border-pink-200 hover:shadow-soft transition-all hover:-translate-y-0.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-peach-50 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-4.5 h-4.5 text-peach-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-charcoal">My Cart</p>
              <p className="text-xs text-charcoal-400 mt-0.5">
                {itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''} waiting` : 'Nothing here yet'}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  )
}
