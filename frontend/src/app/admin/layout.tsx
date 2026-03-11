'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Package, ShoppingCart, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/inventory', label: 'Inventory', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, token, logout } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!token || !user || user.role !== 'admin') {
      router.replace('/auth/login')
    }
  }, [token, user, router])

  if (!token || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-pulse text-charcoal-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-pink-100 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-pink-100">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-20 h-12 relative">
              <Image src="/assets/img/aniki.png" alt="Aniki" fill className="object-contain" />
            </div>
            <span className="text-xs font-semibold text-pink-500 bg-soft-pink px-2 py-0.5 rounded-full">Admin</span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-peach-500 text-white shadow-md shadow-pink-200/50'
                    : 'text-charcoal-600 hover:bg-soft-pink hover:text-pink-500'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* User & Logout */}
        <div className="px-4 py-4 border-t border-pink-100">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-peach-500 flex items-center justify-center text-white text-sm font-bold">
              {user.username[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-charcoal truncate">{user.username}</p>
              <p className="text-xs text-charcoal-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.replace('/auth/login') }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-charcoal-500 hover:text-pink-500 hover:bg-soft-pink rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
