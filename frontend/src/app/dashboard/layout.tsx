'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function DashboardLayoutRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  useEffect(() => { router.replace('/user') }, [router])
  return <>{children}</>
}


const sidebarLinks = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/orders', label: 'My Orders', icon: Package },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/cart', label: 'My Cart', icon: ShoppingCart },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const isActive = (link: typeof sidebarLinks[0]) =>
    link.exact ? pathname === link.href : pathname.startsWith(link.href)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
          <div className="w-20 h-10 relative">
            <Image src="/assets/img/aniki.png" alt="Aniki" fill className="object-contain brightness-0 invert" />
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-peach-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.username}</p>
            <p className="text-xs text-white/50 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const active = isActive(link)
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative ${
                active
                  ? 'bg-gradient-to-r from-pink-500 to-peach-500 text-white shadow-lg shadow-pink-500/30'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              <span>{link.label}</span>
              {link.href === '/cart' && itemCount > 0 && (
                <span className="ml-auto bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
              {active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          )
        })}

        {/* Divider */}
        <div className="border-t border-white/10 my-2" />

        <Link
          href="/shop"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <Store className="w-5 h-5 flex-shrink-0" />
          Browse Shop
        </Link>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8F6F9] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-charcoal-800 flex-col fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-charcoal-800 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-pink-100 flex items-center px-4 lg:px-8 gap-4 shadow-sm">
          {/* Mobile burger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-soft-pink transition-colors"
          >
            <Menu className="w-5 h-5 text-charcoal" />
          </button>

          {/* Page breadcrumb area */}
          <div className="flex-1">
            <p className="text-xs text-charcoal-400 hidden sm:block">
              Welcome back, <span className="text-pink-500 font-semibold">{user.username}</span> 👋
            </p>
          </div>

          {/* Top-right actions */}
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative p-2 rounded-lg hover:bg-soft-pink transition-colors">
              <ShoppingCart className="w-5 h-5 text-charcoal-600" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center bg-gradient-to-r from-pink-500 to-peach-500 text-white text-[9px] font-bold rounded-full px-1">
                  {itemCount}
                </span>
              )}
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-peach-500 flex items-center justify-center text-white text-sm font-bold">
              {user.username?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
