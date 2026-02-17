'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Grid, List, ChevronDown } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

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

// Demo products for the frontend
const demoProducts = [
  { id: 1, name: 'Naruto Uzumaki Figure', price: 89.99, image: '🦊', category: 'figures', isNew: true },
  { id: 2, name: 'Goku Super Saiyan', price: 129.99, image: '🐉', category: 'figures', featured: true },
  { id: 3, name: 'Luffy Gear 5', price: 149.99, image: '🏴‍☠️', category: 'figures', isNew: true },
  { id: 4, name: 'Demon Slayer - Tanjiro', price: 79.99, image: '⚔️', category: 'figures' },
  { id: 5, name: 'Funko Pop - Gojo', price: 14.99, image: '👁️', category: 'funko', isNew: true },
  { id: 6, name: 'Funko Pop - Eren Yeager', price: 12.99, image: '🔥', category: 'funko' },
  { id: 7, name: 'RX-78-2 Gundam Kit', price: 54.99, image: '🤖', category: 'model-kits' },
  { id: 8, name: 'Eva Unit-01 Kit', price: 69.99, image: '💜', category: 'model-kits' },
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
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Shop</h1>
          <p className="text-neutral-600">
            Discover our collection of premium anime figures and collectibles
          </p>
        </FadeIn>

        {/* Filters Bar */}
        <FadeIn delay={0.1} className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500/20 focus:border-honey-500"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey-500/20 focus:border-honey-500 cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-white border border-neutral-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-honey-100 text-honey-600' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-honey-100 text-honey-600' : 'text-neutral-400 hover:text-neutral-600'}`}
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
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100'
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
              <div className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${
                viewMode === 'list' ? 'flex items-center gap-4' : ''
              }`}>
                <div className={`relative bg-honey-50 flex items-center justify-center ${
                  viewMode === 'grid' ? 'aspect-square' : 'w-32 h-32 flex-shrink-0'
                }`}>
                  <span className="text-5xl">{product.image}</span>
                  {product.isNew && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-green-500 text-white rounded-full">
                      NEW
                    </span>
                  )}
                  {product.featured && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium bg-honey-500 text-white rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <h3 className="font-medium text-neutral-900 text-sm mb-1 group-hover:text-honey-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-neutral-900">
                    €{product.price.toFixed(2)}
                  </p>
                  <button className="mt-3 w-full py-2 text-sm font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">😔</p>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Products Found</h3>
            <p className="text-neutral-600">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Pagination */}
        <FadeIn delay={0.3} className="flex items-center justify-center gap-2 mt-12">
          <button className="px-4 py-2 text-sm bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            Previous
          </button>
          {[1, 2, 3].map(page => (
            <button
              key={page}
              className={`w-10 h-10 text-sm rounded-lg transition-colors ${
                page === 1 
                  ? 'bg-neutral-900 text-white' 
                  : 'bg-white border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-4 py-2 text-sm bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            Next
          </button>
        </FadeIn>
      </div>
    </PageLayout>
  )
}
