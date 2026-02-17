'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, ArrowRight, Shield, Sparkles } from 'lucide-react'
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
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md scale-90"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 relative">
              <Image
                src="/assets/img/aniki.png"
                alt="Aniki"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-neutral-900 mb-1.5">Welcome Back</h1>
            <p className="text-xs text-neutral-600">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
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
                {/* <input type="checkbox" className="rounded border-neutral-300 text-honey-500 focus:ring-honey-500" /> */}
                {/* <span className="text-neutral-600">Remember me</span> */}
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
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400">or continue with</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#4285F4">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-xs font-medium text-neutral-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-xs font-medium text-neutral-700">Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-neutral-600 mt-6">
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
          <div className="w-40 h-40 mx-auto mb-6 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
            <Shield className="w-20 h-20 text-white/90" />
          </div>
          <h2 className="text-xl font-bold mb-2">Start Collecting</h2>
          <p className="text-honey-100 text-sm max-w-sm">
            Access your wishlist, track orders, and discover exclusive deals.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
