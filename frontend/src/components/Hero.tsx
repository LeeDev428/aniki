'use client'

import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-honey-50/50 to-cream" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-honey-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-honey-100/40 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-honey-100 rounded-full mb-6">
              <span className="w-2 h-2 bg-honey-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-honey-700">
                Premium Anime Collectibles
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tight mb-6">
              Your Ultimate
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-honey-500 to-honey-600">
                Anime Figure
              </span>
              Destination
            </h1>

            {/* Description */}
            <p className="text-lg text-neutral-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Discover authentic anime figures, Funko Pops, and collectibles from 
              your favorite series. 100% official, premium quality guaranteed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/shop"
                className="group flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all hover:shadow-lg hover:shadow-neutral-900/20"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center gap-2 px-6 py-4 text-neutral-700 hover:text-honey-600 font-medium transition-colors">
                <div className="w-10 h-10 rounded-full bg-honey-100 flex items-center justify-center">
                  <Play className="w-4 h-4 text-honey-600 ml-0.5" />
                </div>
                Watch Story
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-neutral-200">
              <div>
                <p className="text-3xl font-bold text-neutral-900">500+</p>
                <p className="text-sm text-neutral-500 mt-1">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900">20+</p>
                <p className="text-sm text-neutral-500 mt-1">Brands</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900">10K+</p>
                <p className="text-sm text-neutral-500 mt-1">Happy Collectors</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background Shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-honey-200 to-honey-300 rounded-[3rem] rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-br from-honey-100 to-honey-200 rounded-[3rem] -rotate-3" />
              
              {/* Image Container */}
              <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-honey-200/50 h-full flex items-center justify-center">
                {/* Placeholder - Replace with actual figure image */}
                <div className="text-center p-8">
                  <div className="w-48 h-64 mx-auto bg-gradient-to-br from-honey-50 to-honey-100 rounded-3xl flex items-center justify-center mb-4">
                    <span className="text-6xl">🎭</span>
                  </div>
                  <p className="text-sm text-neutral-400">Add your hero image</p>
                  <p className="text-xs text-neutral-300">/public/hero-figure.png</p>
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-honey-100 flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">Trending Now</p>
                  <p className="text-xs text-neutral-500">500+ items this week</p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-2 -right-2 bg-honey-500 text-white rounded-full px-4 py-2 shadow-lg">
                <p className="text-sm font-bold">NEW</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
