import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aniki | Premium Anime Figure Store',
  description: 'Discover authentic anime figures, Funko Pops, and premium collectibles. 100% official products from top brands worldwide.',
  keywords: ['anime figures', 'collectibles', 'funko pop', 'anime merchandise', 'figurines'],
  icons: {
    icon: '/assets/img/aniki.png',
    shortcut: '/assets/img/aniki.png',
    apple: '/assets/img/aniki.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-cream antialiased">
        {children}
      </body>
    </html>
  )
}
