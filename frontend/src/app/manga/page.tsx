import Navbar from '@/components/Navbar'
import MangaList from './MangaList'

export const metadata = {
  title: 'Manga | アニマンガヘブン',
  description: 'Browse our manga collection',
}

export default function MangaPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MangaList />
    </main>
  )
}
