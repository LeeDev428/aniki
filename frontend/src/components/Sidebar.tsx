'use client'

import { Sparkles, Package, Bookmark, Clock } from 'lucide-react'
import Link from 'next/link'

const sidebarItems = [
  { icon: Sparkles, href: '/shop?featured=true', label: 'Featured', active: true },
  { icon: Package, href: '/shop?isNew=true', label: 'New Arrivals', active: false },
  { icon: Clock, href: '/shop?category=pre-orders', label: 'Pre-Orders', active: false },
  { icon: Bookmark, href: '/wishlist', label: 'Wishlist', active: false },
]

export default function Sidebar() {
  return (
    <aside className="relative z-10 flex flex-col items-center gap-6 py-8 px-4 ml-4">
      {sidebarItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          title={item.label}
          className={`p-3 rounded-xl transition-all ${
            item.active
              ? 'bg-honey-400 text-white shadow-lg shadow-honey-400/30'
              : 'bg-white/60 text-neutral-500 hover:bg-white hover:text-neutral-700'
          }`}
        >
          <item.icon className="w-5 h-5" />
        </Link>
      ))}
    </aside>
  )
}
