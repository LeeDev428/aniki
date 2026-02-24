'use client'

import { ArrowRight, ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FadeIn, StaggerContainer, StaggerItem } from './animations'

const hotDrops = [
  {
    id: 1,
    name: 'Satoru Gojo',
    series: 'Jujutsu Kaisen',
    price: 129.99,
    comparePrice: 162.99,
    image: '/assets/sample/1.png',
    badge: '-20% OFF',
    badgeColor: 'bg-peach-500',
    tag: 'Limitdik Kaisen',
  },
  {
    id: 2,
    name: 'Hatsune Miku',
    series: 'Vocaloid',
    price: 76.99,
    comparePrice: 109.99,
    image: '/assets/sample/2.png',
    badge: '-30% OFF',
    badgeColor: 'bg-pink-500',
    tag: 'Non OFF Stock',
  },
  {
    id: 3,
    name: 'Monkey D. Luffy',
    series: 'One Piece',
    price: 119.99,
    comparePrice: 149.99,
    image: '/assets/sample/3.png',
    badge: '-20% OFF',
    badgeColor: 'bg-peach-500',
    tag: 'Hot ITEM',
  },
  {
    id: 4,
    name: 'Super Saiyan Goku',
    series: 'Dragon Ball Z',
    price: 189.99,
    comparePrice: 219.99,
    image: '/assets/sample/4.png',
    badge: 'Limited',
    badgeColor: 'bg-charcoal',
    tag: 'Hot ITEM',
  },
  {
    id: 5,
    name: 'Sailor Moon',
    series: 'Sailor Moon',
    price: 99.99,
    comparePrice: 129.99,
    image: '/assets/sample/5.png',
    badge: '-23% OFF',
    badgeColor: 'bg-pink-500',
    tag: 'New',
  },
  {
    id: 6,
    name: 'Rem',
    series: 'Re:Zero',
    price: 149.99,
    comparePrice: 179.99,
    image: '/assets/sample/6.png',
    badge: '-17% OFF',
    badgeColor: 'bg-pink-500',
    tag: 'Fan Fav',
  },
  {
    id: 7,
    name: 'Levi Ackerman',
    series: 'Attack on Titan',
    price: 159.99,
    comparePrice: 189.99,
    image: '/assets/sample/7.png',
    badge: '-16% OFF',
    badgeColor: 'bg-charcoal',
    tag: 'Best Seller',
  },
  {
    id: 8,
    name: 'Rem (Maid Ver.)',
    series: 'Re:Zero',
    price: 134.99,
    comparePrice: 164.99,
    image: '/assets/sample/8.png',
    badge: '-18% OFF',
    badgeColor: 'bg-pink-500',
    tag: 'Popular',
  },
  {
    id: 9,
    name: 'Izuku Midoriya',
    series: 'My Hero Academia',
    price: 109.99,
    comparePrice: 139.99,
    image: '/assets/sample/9.png',
    badge: '-21% OFF',
    badgeColor: 'bg-peach-500',
    tag: 'New Arrival',
  },
]

export default function Hero() {
  const [startIdx, setStartIdx] = useState(0)
  const VISIBLE = 3

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % hotDrops.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const next = () => setStartIdx((prev) => (prev + 1) % hotDrops.length)
  const prev = () => setStartIdx((prev) => (prev - 1 + hotDrops.length) % hotDrops.length)

  // Get 3 visible items with wrapping
  const visibleCards = Array.from({ length: VISIBLE }, (_, i) =>
    hotDrops[(startIdx + i) % hotDrops.length]
  )

  return (
    <section className="relative lg:h-screen lg:max-h-[780px] lg:min-h-[640px] flex items-center pt-20 pb-10 lg:pt-16 lg:pb-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-pink-50/60 to-peach-50/40" />
      <div className="absolute inset-0 bg-gradient-mesh" />

      {/* Soft decorative blobs */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-peach-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 xl:gap-12 items-center">

          {/* ── LEFT: Brand Statement ── */}
          <StaggerContainer className="space-y-5">
            <StaggerItem>
              <p className="text-sm font-semibold text-charcoal-500 tracking-wide uppercase">
                Discover &amp; Collect
              </p>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-4xl xl:text-5xl font-bold text-charcoal leading-[1.1] tracking-tight font-display">
                Where Every
                <br />
                <span className="text-pink-500">Collector</span> Finds
                <br />
                Their{' '}
                <span className="text-peach-500">Hero</span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-sm text-charcoal-500 leading-relaxed max-w-sm">
                Discover authentic and exclusive anime figures from your
                favorite series. 100% official, premium quality guaranteed.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-center gap-3 pt-1">
                <Link
                  href="/shop"
                  className="group flex items-center gap-2 px-7 py-3 bg-pink-500 text-white rounded-full text-sm font-semibold hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-200/60 transition-all duration-300"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/new-arrivals"
                  className="flex items-center gap-2 px-5 py-3 bg-white text-charcoal rounded-full text-sm font-medium border border-pink-100 hover:border-pink-300 transition-all"
                >
                  <span className="w-5 h-5 rounded-full bg-peach-100 flex items-center justify-center text-xs">🌟</span>
                  New Drops
                </Link>
              </div>
            </StaggerItem>

            {/* Small stats row */}
            <StaggerItem>
              <div className="flex items-center gap-6 pt-3 border-t border-pink-100">
                <div>
                  <p className="text-xl font-bold text-charcoal">500+</p>
                  <p className="text-xs text-charcoal-400">Figures</p>
                </div>
                <div className="w-px h-8 bg-pink-100" />
                <div>
                  <p className="text-xl font-bold text-charcoal">20+</p>
                  <p className="text-xs text-charcoal-400">Brands</p>
                </div>
                <div className="w-px h-8 bg-pink-100" />
                <div>
                  <p className="text-xl font-bold text-charcoal">10K+</p>
                  <p className="text-xs text-charcoal-400">Collectors</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* ── RIGHT: Hot Drops Panel ── */}
          <FadeIn direction="left" delay={0.25}>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 shadow-card">
              {/* Panel header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-peach-500" />
                  <span className="text-lg font-bold text-charcoal font-display">Hot Drops</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/shop?sort=hot"
                    className="text-xs text-charcoal-400 hover:text-pink-500 transition-colors mr-2"
                  >
                    See All Texts →
                  </Link>
                  <button
                    onClick={prev}
                    className="w-8 h-8 rounded-full bg-white shadow-soft border border-pink-100 flex items-center justify-center hover:bg-pink-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-charcoal-600" />
                  </button>
                  <button
                    onClick={next}
                    className="w-8 h-8 rounded-full bg-white shadow-soft border border-pink-100 flex items-center justify-center hover:bg-pink-50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-charcoal-600" />
                  </button>
                </div>
              </div>

              {/* 3-card grid — 1 col on mobile, 3 col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {visibleCards.map((card, i) => (
                  <motion.div
                    key={`${card.id}-${startIdx}-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className={i > 0 ? 'hidden sm:block' : ''}
                  >
                    <Link href={`/product/${card.id}`} className="group block">
                      {/* Card image */}
                      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-soft-pink to-soft-peach aspect-[3/4] mb-2">
                        <Image
                          src={card.image}
                          alt={card.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 33vw, 200px"
                        />
                        {/* Discount badge */}
                        <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${card.badgeColor}`}>
                          {card.badge}
                        </span>
                        {/* Tag chip */}
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                          <span className="text-[9px] font-semibold text-charcoal truncate max-w-[60px]">
                            {card.tag}
                          </span>
                        </div>
                      </div>

                      {/* Card info */}
                      <div className="px-0.5">
                        <p className="text-sm font-bold text-charcoal font-display leading-tight truncate group-hover:text-pink-500 transition-colors">
                          {card.name}
                        </p>
                        <p className="text-xs text-charcoal-400 truncate mt-0.5">{card.series}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="text-sm font-bold text-pink-500">
                              €{card.price.toFixed(2)}
                            </span>
                            {card.comparePrice && (
                              <span className="text-[10px] text-charcoal-400 line-through ml-1">
                                €{card.comparePrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {/* Shop Now button – shown on hover */}
                          <motion.button
                            whileTap={{ scale: 0.93 }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-pink-500 text-white rounded-full text-[10px] font-bold hover:bg-pink-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            Shop
                            <ArrowRight className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-1.5 mt-4">
                {hotDrops.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setStartIdx(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === startIdx
                        ? 'w-6 h-2 bg-pink-500'
                        : 'w-2 h-2 bg-pink-200 hover:bg-pink-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
