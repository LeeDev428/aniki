'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-dark-800 text-white hover:bg-dark-700 hover:shadow-lg hover:shadow-dark/20',
    secondary: 'bg-primary-400 text-dark-800 hover:bg-primary-300 hover:shadow-lg hover:shadow-primary-400/20',
    outline: 'border-2 border-dark-800 text-dark-800 hover:bg-dark-800 hover:text-white',
    ghost: 'text-dark-600 hover:text-primary-500 hover:bg-primary-50',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const classes = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim()

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  )
}

// Arrow button variant
export function ArrowButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}) {
  return (
    <Button
      href={href}
      onClick={onClick}
      variant={variant}
      size="lg"
      icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
      className={`group ${className}`}
    >
      {children}
    </Button>
  )
}
