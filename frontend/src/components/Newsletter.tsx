'use client'

import { Mail, Gift, Sparkles, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FadeIn } from './animations'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setEmail('')
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-800 to-charcoal-900" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-peach-500 rounded-full blur-3xl" />
      </div>
      
      {/* Floating decorations */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-20 text-4xl opacity-60"
      >
        💌
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-20 text-3xl opacity-60"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [-5, 5, -5], x: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-10 text-2xl opacity-40"
      >
        🎁
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
        <FadeIn className="text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-pink-500 to-peach-500 flex items-center justify-center shadow-lg shadow-pink-500/30"
          >
            <Mail className="w-10 h-10 text-white" />
          </motion.div>

          {/* Content */}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-pink-300 text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            Exclusive Collector Perks
          </span>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 font-display">
            Join the <span className="text-gradient">Aniki</span> Family
          </h2>
          
          <p className="text-lg text-charcoal-300 mb-8 max-w-xl mx-auto">
            Subscribe for exclusive deals, early access to limited editions, and be the first to know about new arrivals.
          </p>

          {/* Perks */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm text-charcoal-300">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>10% off first order</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-charcoal-300">
              <Sparkles className="w-4 h-4 text-peach-400" />
              <span>Early access to drops</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-charcoal-300">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Exclusive member deals</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-6 py-4 pr-36 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-charcoal-400 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-peach-500 text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-pink-500/30 transition-all flex items-center gap-2 group"
              >
                {isSubmitted ? (
                  <>
                    <span>Subscribed!</span>
                    <span>✓</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-xs text-charcoal-500 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
