'use client'

import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from './animations'

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-primary-50/30 to-cream" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      
      {/* Decorative Elements */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-400/30 rounded-full blur-3xl" 
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent2-400/20 rounded-full blur-3xl" 
      />
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }}
        className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent-400/20 rounded-full blur-3xl" 
      />
      
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <StaggerContainer className="text-center lg:text-left">
            {/* Badge */}
            <StaggerItem>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 rounded-full mb-5">
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-dark-700">
                  Premium Anime Collectibles
                </span>
              </div>
            </StaggerItem>

            {/* Main Heading */}
            <StaggerItem>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-dark-800 leading-[1.1] tracking-tight mb-5">
                Your Ultimate
                <span className="block text-gradient">
                  Anime Figure
                </span>
                Destination
              </h1>
            </StaggerItem>

            {/* Description */}
            <StaggerItem>
              <p className="text-base text-dark-400 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6">
                Discover authentic anime figures, Funko Pops, and collectibles from 
                your favorite series. 100% official, premium quality guaranteed.
              </p>
            </StaggerItem>

            {/* CTA Buttons */}
            <StaggerItem>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <Link
                  href="/shop"
                  className="group flex items-center gap-2 px-6 py-3 bg-dark-800 text-white rounded-full text-sm font-medium hover:bg-dark-700 transition-all hover:shadow-lg hover:shadow-dark/20"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/story"
                  className="flex items-center gap-2 px-4 py-3 text-dark-600 hover:text-primary-500 text-sm font-medium transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-accent-100 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-accent-400 ml-0.5" />
                  </div>
                  Watch Story
                </Link>
              </div>
            </StaggerItem>

            {/* Stats */}
            <StaggerItem>
              <div className="grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-dark-200">
                <div>
                  <p className="text-2xl font-bold text-dark-800">500+</p>
                  <p className="text-xs text-dark-400 mt-0.5">Products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark-800">20+</p>
                  <p className="text-xs text-dark-400 mt-0.5">Brands</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark-800">10K+</p>
                  <p className="text-xs text-dark-400 mt-0.5">Happy Collectors</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right Content - Hero Image */}
          <FadeIn direction="left" delay={0.3} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background Shape */}
              <motion.div 
                initial={{ rotate: 0, scale: 0.9 }}
                animate={{ rotate: 6, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-300 rounded-[2.5rem]" 
              />
              <motion.div 
                initial={{ rotate: 0, scale: 0.9 }}
                animate={{ rotate: -3, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-accent2-100 to-primary-100 rounded-[2.5rem]" 
              />
              
              {/* Image Container */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-primary-200/50 h-full flex items-center justify-center"
              >
                {/* Placeholder - Replace with actual figure image */}
                <div className="text-center p-6">
                  <div className="w-40 h-56 mx-auto bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center mb-3">
                    <span className="text-5xl">🎭</span>
                  </div>
                  <p className="text-xs text-dark-400">Add your hero image</p>
                  <p className="text-[10px] text-dark-300">/public/hero-figure.png</p>
                </div>
              </motion.div>

              {/* Floating Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2"
              >
                <div className="w-10 h-10 rounded-lg bg-accent2-100 flex items-center justify-center">
                  <span className="text-xl">⭐</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-dark-800">Trending Now</p>
                  <p className="text-[10px] text-dark-400">500+ items this week</p>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="absolute -top-2 -right-2 bg-accent-400 text-white rounded-full px-3 py-1.5 shadow-lg"
              >
                <p className="text-xs font-bold">NEW</p>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
