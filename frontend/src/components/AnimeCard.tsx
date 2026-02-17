'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import type { Anime } from '@/types'

type Props = {
  anime: Anime
  onClick?: () => void
}

export default function AnimeCard({ anime, onClick }: Props) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {anime.coverImage ? (
          <Image
            src={anime.coverImage}
            alt={anime.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-honey-100 to-honey-200 flex items-center justify-center">
            <span className="font-jp text-4xl text-honey-400">
              {anime.titleJapanese?.[0] || anime.title[0]}
            </span>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
            anime.status === 'airing' 
              ? 'bg-green-500 text-white' 
              : anime.status === 'completed'
              ? 'bg-blue-500 text-white'
              : 'bg-neutral-500 text-white'
          }`}>
            {anime.status}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-neutral-800 truncate group-hover:text-honey-600 transition-colors">
          {anime.title}
        </h3>
        {anime.titleJapanese && (
          <p className="font-jp text-sm text-neutral-400 truncate">
            {anime.titleJapanese}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-honey-400 fill-honey-400" />
            <span className="text-sm font-medium text-neutral-700">{anime.rating}</span>
          </div>
          <span className="text-xs text-neutral-500">
            {anime.episodes} eps
          </span>
        </div>
      </div>
    </div>
  )
}
