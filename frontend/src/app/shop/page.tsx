'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, SlidersHorizontal, Grid, List, ChevronDown, Heart, ShoppingCart } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import Image from 'next/image'
import Link from 'next/link'
import { productsApi } from '@/lib/api'
import { useCartStore } from '@/lib/store'
import type { Product } from '@/types'

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'figures', name: 'Anime Figures' },
  { id: 'funko', name: 'Funko Pop' },
  { id: 'model-kits', name: 'Model Kits' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'pre-orders', name: 'Pre-Orders' },
]

const sortOptions = [
  { id: '-createdAt', name: 'Newest' },
  { id: 'price', name: 'Price: Low to High' },
  { id: '-price', name: 'Price: High to Low' },
  { id: '-featured', name: 'Most Popular' },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('-createdAt')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const addItem = useCartStore(s => s.addItem)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string> = {
        page: String(page),
        limit: '12',
        sort: sortBy,
      }
      if (activeCategory !== 'all') params.category = activeCategory
      if (search) params.search = search
      const res = await productsApi.getAll(params)
      setProducts(res.products)
      setTotalPages(res.totalPages)
    } catch {
      // Products will be empty
    } finally {
      setLoading(false)
    }
  }, [page, sortBy, activeCategory, search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setPage(1)
  }

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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
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
                onChange={(e) => { setSortBy(e.target.value); setPage(1) }}
                className="appearance-none px-4 py-2.5 pr-10 text-sm bg-white border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none" />
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
              onClick={() => handleCategoryChange(category.id)}
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
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <StaggerItem key={i}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-soft animate-pulse">
                  <div className="aspect-[3/4] bg-soft-pink" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-pink-100 rounded w-1/3" />
                    <div className="h-4 bg-pink-100 rounded w-2/3" />
                    <div className="h-4 bg-pink-100 rounded w-1/4" />
                  </div>
                </div>
              </StaggerItem>
            ))
          ) : (
            products.map((product) => (
              <StaggerItem key={product._id}>
                <div className={`group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === 'list' ? 'flex items-center gap-4' : ''
                }`}>
                  {/* Image area */}
                  <Link href={`/product/${product.slug}`}>
                    <div className={`relative bg-gradient-to-br from-soft-pink to-soft-peach overflow-hidden ${
                      viewMode === 'grid' ? 'aspect-[3/4]' : 'w-36 h-36 flex-shrink-0'
                    }`}>
                      <Image
                        src={product.images[0]?.url || '/assets/sample/1.png'}
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
                      {product.featured && !product.isNew && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-peach-500 text-white rounded-full">
                          HOT
                        </span>
                      )}
                    </div>
                  </Link>
                  {/* Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <p className="text-[10px] font-semibold text-pink-500 uppercase tracking-wider mb-0.5">{product.franchise || product.category}</p>
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
                    <button
                      onClick={() => addItem(product, 1)}
                      className="mt-3 w-full py-2 text-xs font-semibold bg-gradient-to-r from-pink-500 to-peach-500 text-white rounded-xl hover:shadow-md hover:shadow-pink-200/50 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))
          )}
        </StaggerContainer>

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">💢</p>
            <h3 className="text-lg font-semibold text-charcoal mb-2">No Products Found</h3>
            <p className="text-charcoal-400">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <FadeIn delay={0.3} className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm bg-white border border-pink-100 rounded-lg hover:bg-soft-pink transition-colors text-charcoal-600 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 text-sm rounded-lg transition-colors font-medium ${
                  p === page
                    ? 'bg-gradient-to-r from-pink-500 to-peach-500 text-white shadow-sm' 
                    : 'bg-white border border-pink-100 text-charcoal-600 hover:bg-soft-pink'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm bg-white border border-pink-100 rounded-lg hover:bg-soft-pink transition-colors text-charcoal-600 disabled:opacity-50"
            >
              Next
            </button>
          </FadeIn>
        )}
      </div>
    </PageLayout>
  )
}
