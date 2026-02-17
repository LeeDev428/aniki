'use client'

import { Search, ShoppingBag, Heart, User } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'

export default function Navbar() {
  const itemCount = useCartStore((state) => state.getItemCount())

  return (
    <nav className="relative z-20 flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="font-jp text-xl font-bold tracking-wide text-neutral-800">
          アニキフィギュア
        </span>
      </Link>

      {/* Center Nav */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/shop" className="text-sm font-medium text-neutral-600 hover:text-honey-600 transition-colors">
          Shop All
        </Link>
        <Link href="/shop?category=figures" className="text-sm font-medium text-neutral-600 hover:text-honey-600 transition-colors">
          Figures
        </Link>
        <Link href="/shop?category=funko" className="text-sm font-medium text-neutral-600 hover:text-honey-600 transition-colors">
          Funko Pop
        </Link>
        <Link href="/shop?category=pre-orders" className="text-sm font-medium text-neutral-600 hover:text-honey-600 transition-colors">
          Pre-Orders
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-neutral-200 hover:border-honey-400 transition-colors">
          <Search className="w-4 h-4 text-neutral-500" />
          <span className="text-sm text-neutral-500 hidden sm:inline">Search</span>
        </button>

        {/* Wishlist */}
        <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
          <Heart className="w-5 h-5 text-neutral-600" />
        </button>

        {/* Cart */}
        <Link href="/cart" className="relative p-2 hover:bg-white/50 rounded-full transition-colors">
          <ShoppingBag className="w-5 h-5 text-neutral-600" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-honey-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              {itemCount}
            </span>
          )}
        </Link>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-honey-300 to-honey-500 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </nav>
  )
}
