'use client'

import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import PageTransition from './PageTransition'

interface PageLayoutProps {
  children: ReactNode
  showNavbar?: boolean
  showFooter?: boolean
  className?: string
}

export default function PageLayout({
  children,
  showNavbar = true,
  showFooter = true,
  className = '',
}: PageLayoutProps) {
  return (
    <PageTransition>
      <div className={`min-h-screen bg-cream ${className}`}>
        {showNavbar && <Navbar />}
        <main className="pt-20">
          {children}
        </main>
        {showFooter && <Footer />}
      </div>
    </PageTransition>
  )
}
