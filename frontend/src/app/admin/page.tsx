'use client'

import { useEffect, useState } from 'react'
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { productsApi, ordersApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

export default function AdminDashboard() {
  const { token } = useAuthStore()
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          productsApi.getAll({ limit: '1' }),
          ordersApi.getAll(token, { limit: '1' }),
        ])
        const revenue = ordersRes.total > 0
          ? (await ordersApi.getAll(token, { limit: '100' })).orders.reduce((sum, o) => sum + o.total, 0)
          : 0
        setStats({ products: productsRes.total, orders: ordersRes.total, revenue })
      } catch {
        // Stats will remain 0
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [token])

  const cards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'from-pink-500 to-peach-500', href: '/admin/inventory' },
    { label: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'from-peach-500 to-pink-500', href: '/admin/orders' },
    { label: 'Revenue', value: `€${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'from-pink-500 to-pink-600', href: '/admin/orders' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-charcoal font-display mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-card-hover transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-charcoal-400 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-charcoal">
                {loading ? '...' : card.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/inventory">
          <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-card-hover transition-all group">
            <h2 className="text-lg font-bold text-charcoal font-display mb-2 group-hover:text-pink-500 transition-colors">
              Manage Inventory
            </h2>
            <p className="text-sm text-charcoal-400">Add, edit, and manage your product catalog</p>
          </div>
        </Link>
        <Link href="/admin/orders">
          <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-card-hover transition-all group">
            <h2 className="text-lg font-bold text-charcoal font-display mb-2 group-hover:text-pink-500 transition-colors">
              Manage Orders
            </h2>
            <p className="text-sm text-charcoal-400">View and update customer orders</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
