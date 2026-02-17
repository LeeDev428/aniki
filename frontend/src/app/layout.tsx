import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'アニキフィギュア | Anime Figure Store',
  description: 'Premium anime figures, Funko Pops, and collectibles. 100% official products from top brands.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-cream antialiased">
        {children}
      </body>
    </html>
  )
}
