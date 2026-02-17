'use client'

import { MessageCircle, Grid, Command, Volume2 } from 'lucide-react'

const sidebarItems = [
  { icon: MessageCircle, active: true },
  { icon: Grid, active: false },
  { icon: Command, active: false },
  { icon: Volume2, active: false },
]

export default function Sidebar() {
  return (
    <aside className="relative z-10 flex flex-col items-center gap-6 py-8 px-4 ml-4">
      {sidebarItems.map((item, index) => (
        <button
          key={index}
          className={`p-3 rounded-xl transition-all ${
            item.active
              ? 'bg-honey-400 text-white shadow-lg shadow-honey-400/30'
              : 'bg-white/60 text-neutral-500 hover:bg-white hover:text-neutral-700'
          }`}
        >
          <item.icon className="w-5 h-5" />
        </button>
      ))}
    </aside>
  )
}
