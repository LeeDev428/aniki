'use client'

import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import MangaCard from '@/components/MangaCard'
import { mangaApi } from '@/lib/api'
import type { Manga } from '@/types'

export default function MangaList() {
  const [manga, setManga] = useState<Manga[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadManga()
  }, [])

  async function loadManga() {
    try {
      const data = await mangaApi.getAll() as { manga: Manga[] }
      setManga(data.manga || [])
    } catch (err) {
      console.error('Failed to load manga:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredManga = manga.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-neutral-800">
            漫画
          </h1>
          <p className="text-neutral-500 mt-1">Explore our manga collection</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-200">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search manga..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-40"
            />
          </div>
          <button className="p-2 bg-white rounded-full border border-neutral-200 hover:border-honey-400 transition-colors">
            <Filter className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-neutral-200 rounded-2xl" />
              <div className="mt-3 h-4 bg-neutral-200 rounded w-3/4" />
              <div className="mt-2 h-3 bg-neutral-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredManga.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredManga.map((item) => (
            <MangaCard key={item._id} manga={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-jp text-6xl text-honey-200 mb-4">空</p>
          <p className="text-neutral-500">No manga found</p>
        </div>
      )}
    </div>
  )
}
