'use client'

import { ReactNode } from 'react'
import { FadeIn } from './animations'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  align?: 'left' | 'center' | 'right'
  children?: ReactNode
}

export default function SectionHeader({
  title,
  subtitle,
  badge,
  align = 'center',
  children,
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <FadeIn className={`mb-12 ${alignClasses[align]}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-honey-700 bg-honey-100 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-neutral-600 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      {children}
    </FadeIn>
  )
}
