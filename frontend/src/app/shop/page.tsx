'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Grid, List, ChevronDown, Heart } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'figures', name: 'Anime Figures' },
  { id: 'funko', name: 'Funko Pop' },
  { id: 'model-kits', name: 'Model Kits' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'pre-orders', name: 'Pre-Orders' },
]

const sortOptions = [
  { id: 'newest', name: 'Newest' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'popular', name: 'Most Popular' },
]

// Demo products using real sample images
const demoProducts = [
  { id: 1, name: 'Satoru Gojo', series: 'Jujutsu Kaisen', price: 129.99, comparePrice: 162.99, image: '/assets/sample/1.png', category: 'figures', isNew: true },
  { id: 2, name: 'Hatsune Miku', series: 'Vocaloid', price: 76.99, comparePrice: 109.99, image: '/assets/sample/2.png', category: 'figures', featured: true },
  { id: 3, name: 'Monkey D. Luffy', series: 'One Piece', price: 119.99, comparePrice: 149.99, image: '/assets/sample/3.png', category: 'figures', isNew: true },
  { id: 4, name: 'Super Saiyan Goku', series: 'Dragon Ball Z', price: 189.99, comparePrice: 219.99, image: '/assets/sample/4.png', category: 'figures' },
  { id: 5, name: 'Sailor Moon', series: 'Sailor Moon', price: 99.99, comparePrice: 129.99, image: '/assets/sample/5.png', category: 'figures', isNew: true },
  { id: 6, name: 'Rem', series: 'Re:Zero', price: 149.99, comparePrice: 179.99, image: '/assets/sample/6.png', category: 'figures' },
  { id: 7, name: 'Levi Ackerman', series: 'Attack on Titan', price: 159.99, comparePrice: 189.99, image: '/assets/sample/7.png', category: 'figures' },
  { id: 8, name: 'Rem (Maid Ver.)', series: 'Re:Zero', price: 134.99, comparePrice: 164.99, image: '/assets/sample/8.png', category: 'figures' },
  { id: 9, name: 'Izuku Midoriya', series: 'My Hero Academia', price: 109.99, comparePrice: 139.99, image: '/assets/sample/9.png', category: 'figures', isNew: true },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = demoProducts.filter(
    p => activeCategory === 'all' || p.category === activeCategory
  )

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <FadeIn className="mb-8">
          <h1 className="text-3xl font-bold font-display text-charcoal mb-2">
            Shop <span className="text-gradient">Figures</span>
          </h1>
          <p className="text-charcoal-400">
            Discover our collection of premium anime figures and collectibles
          </p>
        </FadeIn>

        {/* Filters Bar */}
        <FadeIn delay={0.1} className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-pink-100 rounded-xl hover:bg-soft-pink transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 text-sm bg-white border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-white border border-pink-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-soft-pink text-pink-500' : 'text-charcoal-400 hover:text-charcoal-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-soft-pink text-pink-500' : 'text-charcoal-400 hover:text-charcoal-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Categories */}
        <FadeIn delay={0.2} className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 text-sm rounded-full transition-colors font-medium ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-pink-500 to-peach-500 text-white shadow-sm'
                  : 'bg-white text-charcoal-600 hover:bg-soft-pink border border-pink-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </FadeIn>

        {/* Products Grid */}
        <StaggerContainer 
          className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}
        >
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <Link href={`/product/${product.id}`}>
                <div className={`group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === 'list' ? 'flex items-center gap-4' : ''
                }`}>
                  {/* Image area */}
                  <div className={`relative bg-gradient-to-br from-soft-pink to-soft-peach overflow-hidden ${
                    viewMode === 'grid' ? 'aspect-[3/4]' : 'w-36 h-36 flex-shrink-0'
                  }`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Wishlist */}
                    <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-pink-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-pink-500 hover:text-white">
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                    {product.isNew && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-pink-500 text-white rounded-full">
                        NEW
                      </span>
                    )}
                    {product.featured && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-peach-500 text-white rounded-full">
                        HOT
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <p className="text-[10px] font-semibold text-pink-500 uppercase tracking-wider mb-0.5">{product.series}</p>
                    <h3 className="font-bold text-charcoal text-sm mb-2 group-hover:text-pink-500 transition-colors font-display line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-gradient">
                        €{product.price.toFixed(2)}
                      </span>
                      {product.comparePrice && (
                        <span className="text-xs text-charcoal-400 line-through">€{product.comparePrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button className="mt-3 w-full py-2 text-xs font-semibold bg-gradient-to-r from-pink-500 to-peach-500 text-white rounded-xl hover:shadow-md hover:shadow-pink-200/50 transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">💢</p>
            <h3 className="text-lg font-semibold text-charcoal mb-2">No Products Found</h3>
            <p className="text-charcoal-400">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Pagination */}
        <FadeIn delay={0.3} className="flex items-center justify-center gap-2 mt-12">
          <button className="px-4 py-2 text-sm bg-white border border-pink-100 rounded-lg hover:bg-soft-pink transition-colors text-charcoal-600">
            Previous
          </button>
          {[1, 2, 3].map(page => (
            <button
              key={page}
              className={`w-10 h-10 text-sm rounded-lg transition-colors font-medium ${
                page === 1 
                  ? 'bg-gradient-to-r from-pink-500 to-peach-500 text-white shadow-sm' 
                  : 'bg-white border border-pink-100 text-charcoal-600 hover:bg-soft-pink'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-4 py-2 text-sm bg-white border border-pink-100 rounded-lg hover:bg-soft-pink transition-colors text-charcoal-600">
            Next
          </button>
        </FadeIn>
      </div>
    </PageLayout>
  )
}
