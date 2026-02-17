'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 px-8 py-12 relative">
      {/* Left Content */}
      <div className="flex-1 max-w-xl z-10">
        {/* Main Heading */}
        <div className="mb-12">
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight">
            <span className="block">IMMERSE IN</span>
            <span className="block flex items-center gap-4">
              ANIME
              <span className="font-jp text-4xl lg:text-5xl text-honey-600">軍</span>
            </span>
            <span className="block text-neutral-600">MANGA</span>
          </h1>
        </div>

        {/* Bottom Cards Section */}
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          {/* Explore Card */}
          <div className="glass rounded-3xl p-6 flex-1">
            <p className="text-sm text-neutral-500 mb-1">Explore, Read, and</p>
            <h3 className="font-display text-3xl font-bold text-neutral-800 tracking-wide">
              ENJOY
            </h3>
            <button className="mt-4 flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-neutral-200 hover:border-honey-400 hover:shadow-md transition-all group">
              <span className="text-sm font-medium">Let's Explore</span>
              <div className="w-6 h-6 rounded-full bg-honey-400 flex items-center justify-center group-hover:bg-honey-500 transition-colors">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-3">
            {/* Complete Episodes */}
            <div className="glass rounded-2xl p-4 flex flex-col justify-between min-w-[100px]">
              <span className="text-xs text-neutral-500">Complete</span>
              <div>
                <span className="text-3xl font-bold text-neutral-800">120</span>
                <span className="text-xs text-neutral-500 ml-1">Episodes</span>
              </div>
              <div className="w-5 h-5 rounded-full bg-honey-400 flex items-center justify-center self-end">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Chapters Read */}
            <div className="glass rounded-2xl p-4 flex flex-col justify-between min-w-[100px]">
              <span className="text-3xl font-bold text-neutral-800">350</span>
              <span className="text-xs text-neutral-500">Chapters Read</span>
              <div className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center self-end">
                <ArrowUpRight className="w-3 h-3 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center - Anime Character */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* Placeholder for anime character image */}
        <div className="relative w-80 h-96 lg:w-96 lg:h-[500px]">
          {/* You can replace this with an actual anime character image */}
          <div className="absolute inset-0 bg-gradient-to-b from-honey-200/20 to-transparent rounded-3xl" />
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-neutral-400">
              <div className="w-48 h-64 mx-auto bg-gradient-to-br from-honey-100 to-honey-200 rounded-3xl flex items-center justify-center">
                <span className="font-jp text-6xl text-honey-400">姫</span>
              </div>
              <p className="mt-4 text-sm">Add your anime character image</p>
              <p className="text-xs">/public/hero-character.png</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 max-w-xs z-10">
        <div className="glass rounded-3xl p-6">
          <p className="text-sm text-neutral-500 mb-1">Stream Anime and</p>
          <h3 className="font-display text-3xl font-bold text-neutral-800 tracking-wide mb-4">
            ENJOY
          </h3>
          <button className="flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-neutral-200 hover:border-honey-400 hover:shadow-md transition-all group">
            <span className="text-sm font-medium">Watch</span>
            <div className="w-6 h-6 rounded-full bg-honey-400 flex items-center justify-center group-hover:bg-honey-500 transition-colors">
              <ArrowUpRight className="w-3 h-3 text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
