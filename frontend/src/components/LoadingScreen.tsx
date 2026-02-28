'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  minDuration?: number
}

export default function LoadingScreen({ minDuration = 2500 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minDuration)

    return () => clearTimeout(timer)
  }, [minDuration])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
        >
          {/* Desktop video — landscape */}
          <video
            key="landscape"
            autoPlay
            muted
            playsInline
            loop
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/vid/Landscape.mp4" type="video/mp4" />
          </video>

          {/* Mobile video — portrait */}
          <video
            key="portrait"
            autoPlay
            muted
            playsInline
            loop
            className="block md:hidden absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/vid/Portrait.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


