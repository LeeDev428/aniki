import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
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
}

type AuthState = {
  user: User | null
  token: string | null
  isLoading: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'aniki-auth',
    }
  )
)
