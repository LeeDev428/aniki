'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface LoadingScreenProps {
  minDuration?: number
}

export default function LoadingScreen({ minDuration = 2000 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, minDuration / 20)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minDuration)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [minDuration])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.25 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-200 to-peach-200 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
              className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-pink-300 rounded-full blur-3xl"
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-10 mb-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="w-48 h-48 relative"
            >
              <Image
                src="/assets/img/aniki.png"
                alt="Aniki"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Loading Bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="relative z-10 h-1.5 bg-pink-100 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
              className="h-full bg-gradient-to-r from-pink-500 to-peach-500 rounded-full"
            />
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 mt-4 text-sm text-charcoal-500 font-medium"
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
