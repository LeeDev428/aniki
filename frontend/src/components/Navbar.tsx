'use client'

import { useState } from 'react'
import { Menu, X, ShoppingBag, Heart, Search, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/new-arrivals', label: 'New Arrivals' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = 3 // Replace with actual cart state

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-soft">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="w-24 h-16 relative">
              <Image
                src="/assets/img/aniki.png"
                alt="Aniki"
                fill
                className="object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal-600 hover:text-pink-500 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-peach-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Section - Icons & Auth */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <button className="p-2 rounded-full hover:bg-soft-pink transition-colors group">
              <Search className="w-5 h-5 text-charcoal-500 group-hover:text-pink-500 transition-colors" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 rounded-full hover:bg-soft-pink transition-colors group relative">
              <Heart className="w-5 h-5 text-charcoal-500 group-hover:text-pink-500 transition-colors" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 rounded-full hover:bg-soft-peach transition-colors group relative">
              <ShoppingBag className="w-5 h-5 text-charcoal-500 group-hover:text-peach-500 transition-colors" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-peach-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-pink-100 mx-2" />

            {/* Auth */}
            <Link
              href="/auth/login"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-charcoal-600 hover:text-pink-500 transition-colors"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-peach-500 rounded-full hover:shadow-lg hover:shadow-pink-200/50 transition-all hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Cart */}
            <Link href="/cart" className="p-2 relative">
              <ShoppingBag className="w-5 h-5 text-charcoal-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-peach-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-soft-pink transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-charcoal-600" />
              ) : (
                <Menu className="w-6 h-6 text-charcoal-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-pink-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-charcoal-700 hover:text-pink-500 font-medium transition-colors border-b border-pink-50"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile extras */}
              <div className="py-3 flex items-center gap-4">
                <Link href="/wishlist" className="flex items-center gap-2 text-charcoal-600 hover:text-pink-500">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </Link>
              </div>
              
              <div className="pt-4 border-t border-pink-100 space-y-3">
                <Link
                  href="/auth/login"
                  className="block w-full py-3 text-center text-charcoal-700 hover:text-pink-500 font-medium transition-colors border border-pink-200 rounded-full"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block w-full py-3 text-center text-white bg-gradient-to-r from-pink-500 to-peach-500 rounded-full font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
