'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input, Button } from '@/components/ui'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/'
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center mb-8">
            <div className="w-14 h-14 relative">
              <Image
                src="/assets/img/aniki.png"
                alt="Aniki"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Welcome Back</h1>
            <p className="text-sm text-neutral-600">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-neutral-300 text-honey-500 focus:ring-honey-500" />
                <span className="text-neutral-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-honey-600 hover:text-honey-700">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-sm text-neutral-400">or continue with</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
              <span className="text-lg">🔵</span>
              <span className="text-sm font-medium text-neutral-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
              <span className="text-lg">🍎</span>
              <span className="text-sm font-medium text-neutral-700">Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-neutral-600 mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-honey-600 hover:text-honey-700 font-medium">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-honey-400 to-honey-500 items-center justify-center p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-white"
        >
          <div className="w-48 h-48 mx-auto mb-8 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-8xl">🎭</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Start Collecting</h2>
          <p className="text-honey-100 max-w-sm">
            Access your wishlist, track orders, and discover exclusive deals.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
