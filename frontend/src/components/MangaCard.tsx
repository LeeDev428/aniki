'use client'

import Image from 'next/image'
import { Star, BookOpen } from 'lucide-react'
import type { Manga } from '@/types'

type Props = {
  manga: Manga
  onClick?: () => void
}

export default function MangaCard({ manga, onClick }: Props) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {manga.coverImage ? (
          <Image
            src={manga.coverImage}
            alt={manga.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-honey-100 to-honey-200 flex items-center justify-center">
            <span className="font-jp text-4xl text-honey-400">
              {manga.titleJapanese?.[0] || manga.title[0]}
            </span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
            manga.status === 'ongoing' 
              ? 'bg-green-500 text-white' 
              : manga.status === 'completed'
              ? 'bg-blue-500 text-white'
              : 'bg-orange-500 text-white'
          }`}>
            {manga.status}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-neutral-800 truncate group-hover:text-honey-600 transition-colors">
          {manga.title}
        </h3>
        {manga.author && (
          <p className="text-sm text-neutral-400 truncate">
            by {manga.author}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-honey-400 fill-honey-400" />
            <span className="text-sm font-medium text-neutral-700">{manga.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500">
            <BookOpen className="w-3 h-3" />
            <span className="text-xs">{manga.chapters} ch</span>
          </div>
        </div>
      </div>
    </div>
  )
}
