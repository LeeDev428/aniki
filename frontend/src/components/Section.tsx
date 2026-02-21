'use client'

import { ReactNode } from 'react'
import { FadeIn } from './animations'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: 'cream' | 'white' | 'honey'
  animate?: boolean
}

export default function Section({
  children,
  className = '',
  id,
  background = 'cream',
  animate = true,
}: SectionProps) {
  const bgClasses = {
    cream: 'bg-cream',
    white: 'bg-white',
    honey: 'bg-primary-50',
  }

  const content = (
    <section id={id} className={`py-16 lg:py-24 ${bgClasses[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  )

  if (animate) {
    return <FadeIn>{content}</FadeIn>
  }

  return content
}
