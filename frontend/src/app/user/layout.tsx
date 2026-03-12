'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Store,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore, useCartStore } from '@/lib/store'

const sidebarLinks = [
  { href: '/user', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/user/orders', label: 'My Orders', icon: Package },
  { href: '/user/profile', label: 'Profile', icon: User },
  { href: '/user/cart', label: 'My Cart', icon: ShoppingCart },
]

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, token, logout } = useAuthStore()
  const itemCount = useCartStore((s) => s.getItemCount())
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!token || !user) {
      router.replace('/auth/login')
    } else if (user.role === 'admin') {
      router.replace('/admin')
    }
  }, [token, user, router])

  if (!token || !user || user.role === 'admin') {
    return (
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const isActive = (link: (typeof sidebarLinks)[0]) =>
    link.exact ? pathname === link.href : pathname.startsWith(link.href)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/10">
        <Link href="/" onClick={() => setSidebarOpen(false)} className="block">
          <div className="w-20 h-10 relative">
            <Image
              src="/assets/img/aniki.png"
              alt="Aniki"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-4 pt-5 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-peach-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.username}</p>
            <p className="text-xs text-white/40 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const active = isActive(link)
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-gradient-to-r from-pink-500 to-peach-500 text-white shadow-lg shadow-pink-500/25'
                  : 'text-white/55 hover:bg-white/8 hover:text-white'
              }`}
            >
              <link.icon className="w-4.5 h-4.5 flex-shrink-0" />
              <span>{link.label}</span>
              {link.href === '/user/cart' && itemCount > 0 && (
                <span className="ml-auto bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {itemCount}
                </span>
              )}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />}
            </Link>
          )
        })}

        <div className="!mt-3 border-t border-white/10 pt-3">
          <Link
            href="/shop"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/55 hover:bg-white/8 hover:text-white transition-all"
          >
            <Store className="w-4.5 h-4.5 flex-shrink-0" />
            Browse Shop
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-white/40 hover:bg-red-500/15 hover:text-red-400 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 bg-charcoal-800 flex-col fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed left-0 top-0 h-full w-60 bg-charcoal-800 z-50 lg:hidden"
            >
              <div className="absolute right-3 top-3">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 h-14 bg-white border-b border-gray-100 flex items-center px-4 lg:px-6 gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-charcoal" />
          </button>

          <div className="flex-1">
            <p className="text-sm text-charcoal-400">
              Welcome back,{' '}
              <span className="text-pink-500 font-semibold">{user.username}</span> 👋
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/user/cart"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-charcoal-500" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center bg-gradient-to-r from-pink-500 to-peach-500 text-white text-[9px] font-bold rounded-full px-1">
                  {itemCount}
                </span>
              )}
            </Link>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-peach-500 flex items-center justify-center text-white text-xs font-bold">
              {user.username?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  )
}
