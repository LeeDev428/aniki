'use client'

import { useEffect, useState, useCallback } from 'react'
import { Eye, ChevronDown } from 'lucide-react'
import { ordersApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import type { Order } from '@/types'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  confirmed: 'bg-blue-50 text-blue-500',
  processing: 'bg-purple-50 text-purple-500',
  shipped: 'bg-indigo-50 text-indigo-500',
  delivered: 'bg-green-50 text-green-600',
  cancelled: 'bg-red-50 text-red-500',
}

const paymentColors: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  paid: 'bg-green-50 text-green-600',
  failed: 'bg-red-50 text-red-500',
  refunded: 'bg-charcoal-100 text-charcoal-500',
}

const orderStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
const paymentStatuses = ['pending', 'paid', 'failed', 'refunded']

export default function AdminOrdersPage() {
  const { token } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const params: Record<string, string> = { page: String(page), limit: '15' }
      if (filterStatus) params.status = filterStatus
      const res = await ordersApi.getAll(token, params)
      setOrders(res.orders)
      setTotal(res.total)
      setTotalPages(res.totalPages)
    } catch {
      // Silent
    } finally {
      setLoading(false)
    }
  }, [token, page, filterStatus])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const updateOrderStatus = async (orderId: string, field: 'status' | 'paymentStatus', value: string) => {
    if (!token) return
    try {
      await ordersApi.updateStatus(token, orderId, { [field]: value })
      fetchOrders()
    } catch {
      // Silent
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoal font-display">Orders</h1>
          <p className="text-sm text-charcoal-400">{total} orders total</p>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setPage(1) }}
          className="px-4 py-2.5 text-sm bg-white border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
        >
          <option value="">All Statuses</option>
          {orderStatuses.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pink-100">
                <th className="text-left px-6 py-4 font-semibold text-charcoal-600">Order</th>
                <th className="text-left px-4 py-4 font-semibold text-charcoal-600">Customer</th>
                <th className="text-left px-4 py-4 font-semibold text-charcoal-600">Total</th>
                <th className="text-left px-4 py-4 font-semibold text-charcoal-600">Status</th>
                <th className="text-left px-4 py-4 font-semibold text-charcoal-600">Payment</th>
                <th className="text-left px-4 py-4 font-semibold text-charcoal-600">Date</th>
                <th className="text-right px-6 py-4 font-semibold text-charcoal-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-charcoal-400">Loading...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-charcoal-400">No orders found</td></tr>
              ) : (
                orders.map((order) => (
                  <>
                    <tr key={order._id} className="border-b border-pink-50 hover:bg-soft-pink/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-charcoal-500">#{order._id.slice(-8)}</span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-charcoal">
                          {order.shippingAddress?.fullName || order.guestName || 'N/A'}
                        </p>
                        <p className="text-xs text-charcoal-400">{order.guestEmail || ''}</p>
                      </td>
                      <td className="px-4 py-4 font-semibold text-charcoal">€{order.total.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, 'status', e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize border-0 cursor-pointer ${statusColors[order.status] || ''}`}
                        >
                          {orderStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => updateOrderStatus(order._id, 'paymentStatus', e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize border-0 cursor-pointer ${paymentColors[order.paymentStatus] || ''}`}
                        >
                          {paymentStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-4 text-charcoal-400 text-xs">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                          className="p-2 rounded-lg hover:bg-soft-pink text-charcoal-400 hover:text-pink-500 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    {expandedId === order._id && (
                      <tr key={`${order._id}-detail`} className="bg-cream/50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-xs font-semibold text-charcoal-600 uppercase mb-2">Items</h4>
                              {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm py-1">
                                  <span className="text-charcoal">{item.name} × {item.quantity}</span>
                                  <span className="text-charcoal-500">€{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                              <div className="border-t border-pink-100 mt-2 pt-2 flex justify-between text-sm font-semibold">
                                <span>Shipping</span>
                                <span>{order.shipping === 0 ? 'Free' : `€${order.shipping.toFixed(2)}`}</span>
                              </div>
                              <div className="flex justify-between text-sm font-bold text-pink-500">
                                <span>Total</span>
                                <span>€{order.total.toFixed(2)}</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-charcoal-600 uppercase mb-2">Shipping Address</h4>
                              {order.shippingAddress ? (
                                <div className="text-sm text-charcoal-500 space-y-0.5">
                                  <p>{order.shippingAddress.fullName}</p>
                                  <p>{order.shippingAddress.address}</p>
                                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                  <p>{order.shippingAddress.country}</p>
                                  <p>{order.shippingAddress.phone}</p>
                                </div>
                              ) : (
                                <p className="text-sm text-charcoal-400">No address provided</p>
                              )}
                              {order.notes && (
                                <>
                                  <h4 className="text-xs font-semibold text-charcoal-600 uppercase mt-4 mb-1">Notes</h4>
                                  <p className="text-sm text-charcoal-400">{order.notes}</p>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 px-6 py-4 border-t border-pink-100">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? 'bg-gradient-to-r from-pink-500 to-peach-500 text-white'
                    : 'text-charcoal-500 hover:bg-soft-pink'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
