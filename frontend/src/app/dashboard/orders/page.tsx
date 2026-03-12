'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function DashboardOrdersRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/user/orders') }, [router])
  return null
}

export default function DashboardOrdersPage() {
  const { token } = useAuthStore()
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
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
    processing: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    shipped: 'bg-purple-100 text-purple-700 border-purple-200',
    delivered: 'bg-green-100 text-green-700 border-green-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  }

  const paymentColors: Record<string, string> = {
    pending: 'text-yellow-600',
    paid: 'text-green-600',
    failed: 'text-red-600',
    refunded: 'text-gray-500',
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-charcoal font-display">My Orders</h1>
        <p className="text-charcoal-400 text-sm mt-1">Track and review your purchases.</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-2xl shadow-soft p-5 animate-pulse">
              <div className="flex justify-between mb-3">
                <div className="h-4 bg-pink-50 rounded w-36" />
                <div className="h-5 bg-pink-50 rounded-full w-20" />
              </div>
              <div className="h-3 bg-pink-50 rounded w-52 mb-1.5" />
              <div className="h-3 bg-pink-50 rounded w-24" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
          <Package className="w-12 h-12 text-pink-200 mx-auto mb-3" />
          <h2 className="text-base font-bold text-charcoal font-display mb-1">No orders yet</h2>
          <p className="text-charcoal-400 text-sm mb-4">Time to start your collection!</p>
          <Link
            href="/shop"
            className="inline-flex px-5 py-2.5 bg-gradient-to-r from-pink-500 to-peach-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/order-confirmation/${order._id}`}
              className="block bg-white rounded-2xl shadow-soft hover:shadow-card-hover transition-all group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-pink-50">
                <div>
                  <p className="text-xs text-charcoal-400 mb-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                  <p className="text-xs font-mono text-charcoal-500">#{order._id.slice(-10).toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize border ${statusColors[order.status] || statusColors.pending}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items Preview */}
              <div className="px-5 py-3">
                <p className="text-sm text-charcoal-600 truncate">
                  {order.items.map(i => i.name).join(', ')}
                </p>
                <p className="text-xs text-charcoal-400 mt-0.5">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between px-5 pb-4">
                <div>
                  <span className={`text-xs font-medium capitalize ${paymentColors[order.paymentStatus] || paymentColors.pending}`}>
                    Payment: {order.paymentStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-charcoal">€{order.total.toFixed(2)}</span>
                  <ChevronRight className="w-4 h-4 text-charcoal-300 group-hover:text-pink-500 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
