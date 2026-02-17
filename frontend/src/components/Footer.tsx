'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'New Arrivals', href: '/shop?sort=new' },
    { label: 'Best Sellers', href: '/shop?sort=popular' },
    { label: 'Pre-Orders', href: '/shop?category=pre-orders' },
    { label: 'Sale', href: '/shop?sale=true' },
  ],
  categories: [
    { label: 'Anime Figures', href: '/shop?category=figures' },
    { label: 'Funko Pop', href: '/shop?category=funko' },
    { label: 'Model Kits', href: '/shop?category=model-kits' },
    { label: 'Accessories', href: '/shop?category=accessories' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Track Order', href: '/track-order' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/assets/img/aniki.png"
                  alt="Aniki"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-neutral-400 text-xs leading-relaxed mb-4 max-w-xs">
              Your ultimate destination for premium anime figures and collectibles. 
              100% authentic products from top brands worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>support@aniki.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Netherlands</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-honey-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-honey-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-honey-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-honey-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} Aniki. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-honey-500 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <Link href="/privacy" className="hover:text-honey-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-honey-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
