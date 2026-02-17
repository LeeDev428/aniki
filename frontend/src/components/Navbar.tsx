'use client'

import { Search, Bell, User } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="font-jp text-xl font-bold tracking-wide text-neutral-800">
          アニマンガヘブン
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white/60 rounded-full border border-neutral-200">
          <Search className="w-4 h-4 text-neutral-500" />
          <span className="text-sm text-neutral-500">Search</span>
        </div>

        {/* Notifications */}
        <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-neutral-600" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-600">Hi, Liza</span>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-honey-300 to-honey-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </nav>
  )
}
