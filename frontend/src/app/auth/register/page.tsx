'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Check, UserPlus } from 'lucide-react'
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
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-charcoal-800 to-charcoal-900 items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative accents */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-peach-500/10 rounded-full blur-3xl" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white relative z-10"
        >
          <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-pink-500/20 to-peach-500/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-pink-500/20">
            <UserPlus className="w-20 h-20 text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3 font-display">Join the Community</h2>
          <p className="text-charcoal-200 text-sm max-w-xs leading-relaxed">
            Create an account and start building your ultimate anime figure collection.
          </p>
        </motion.div>
      </div>

      {/* Right Side - Form */}
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
            <h1 className="text-xl font-bold text-dark-800 mb-1.5">Create Account</h1>
            <p className="text-xs text-dark-400">
              Join thousands of collectors worldwide
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
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
                className="absolute right-3 top-[34px] text-dark-400 hover:text-dark-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Requirements */}
            {formData.password && (
              <div className="space-y-1 p-2.5 bg-dark-50 rounded-lg">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-[11px]">)
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      req.test(formData.password) ? 'bg-green-500' : 'bg-dark-200'
                    }`}>
                      {req.test(formData.password) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={req.test(formData.password) ? 'text-green-600' : 'text-dark-400'}>
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
            <label className="flex items-start gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-dark-200 text-primary-400 focus:ring-primary-400" 
              />
              <span className="text-[11px] text-dark-500">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-500 hover:text-primary-600">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary-500 hover:text-primary-600">Privacy Policy</Link>
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
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-dark-200" />
            <span className="text-xs text-dark-400">or continue with</span>
            <div className="flex-1 h-px bg-dark-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-dark-200 rounded-xl hover:bg-primary-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#4285F4">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-xs font-medium text-dark-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-dark-200 rounded-xl hover:bg-primary-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-xs font-medium text-dark-700">Facebook</span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-xs text-dark-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-500 hover:text-primary-600 font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
