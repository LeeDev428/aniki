'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input, Button } from '@/components/ui'

const passwordRequirements = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /\d/.test(p) },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) return
    setIsLoading(true)
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/auth/login'
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-neutral-800 to-neutral-900 items-center justify-center p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          <div className="w-48 h-48 mx-auto mb-8 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
            <span className="text-8xl">✨</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Join the Community</h2>
          <p className="text-neutral-400 max-w-sm">
            Create an account and start building your ultimate anime figure collection.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Form */}
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
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Create Account</h1>
            <p className="text-sm text-neutral-600">
              Join thousands of collectors worldwide
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

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
                placeholder="Create a password"
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

            {/* Password Requirements */}
            {formData.password && (
              <div className="space-y-1.5 p-3 bg-neutral-50 rounded-lg">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      req.test(formData.password) ? 'bg-green-500' : 'bg-neutral-300'
                    }`}>
                      {req.test(formData.password) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={req.test(formData.password) ? 'text-green-600' : 'text-neutral-500'}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : undefined}
              required
            />

            {/* Terms Agreement */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-neutral-300 text-honey-500 focus:ring-honey-500" 
              />
              <span className="text-xs text-neutral-600">
                I agree to the{' '}
                <Link href="/terms" className="text-honey-600 hover:text-honey-700">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-honey-600 hover:text-honey-700">Privacy Policy</Link>
              </span>
            </label>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading || !agreedToTerms}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
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

          {/* Sign In Link */}
          <p className="text-center text-sm text-neutral-600 mt-8">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-honey-600 hover:text-honey-700 font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
