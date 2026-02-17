import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'アニマンガヘブン | Anime & Manga Hub',
  description: 'Explore, read, and stream your favorite anime and manga.',
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
