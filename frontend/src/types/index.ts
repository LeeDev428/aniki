export type Anime = {
  _id: string
  title: string
  titleJapanese?: string
  synopsis?: string
  coverImage?: string
  bannerImage?: string
  episodes: number
  status: 'airing' | 'completed' | 'upcoming'
  genres: string[]
  rating: number
  year?: number
  season?: 'winter' | 'spring' | 'summer' | 'fall'
  studio?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export type Manga = {
  _id: string
  title: string
  titleJapanese?: string
  synopsis?: string
  coverImage?: string
  chapters: number
  volumes: number
  status: 'ongoing' | 'completed' | 'hiatus'
  genres: string[]
  rating: number
  author?: string
  artist?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export type User = {
  id: string
  username: string
  email: string
  avatar?: string
  stats: {
    episodesWatched: number
    chaptersRead: number
    completedAnime: number
    completedManga: number
  }
  watchlist: Anime[]
  readlist: Manga[]
}
