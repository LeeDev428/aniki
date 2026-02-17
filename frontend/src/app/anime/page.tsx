import Navbar from '@/components/Navbar'
import AnimeList from './AnimeList'

export const metadata = {
  title: 'Anime | アニマンガヘブン',
  description: 'Browse our anime collection',
}

export default function AnimePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <AnimeList />
    </main>
  )
}
