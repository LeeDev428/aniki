const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

type RequestOptions = {
  method?: string
  body?: unknown
  token?: string
}

export async function api<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_URL}${endpoint}`, config)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || 'Something went wrong')
  }

  return response.json()
}

// Auth endpoints
export const authApi = {
  login: (email: string, password: string) =>
    api('/auth/login', { method: 'POST', body: { email, password } }),
  
  register: (username: string, email: string, password: string) =>
    api('/auth/register', { method: 'POST', body: { username, email, password } }),
}

// Anime endpoints
export const animeApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return api(`/anime${query}`)
  },
  getFeatured: () => api('/anime/featured'),
  getById: (id: string) => api(`/anime/${id}`),
}

// Manga endpoints
export const mangaApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return api(`/manga${query}`)
  },
  getFeatured: () => api('/manga/featured'),
  getById: (id: string) => api(`/manga/${id}`),
}

// User endpoints
export const userApi = {
  getProfile: (token: string) => api('/user/me', { token }),
  updateProfile: (token: string, data: Record<string, unknown>) =>
    api('/user/me', { method: 'PATCH', body: data, token }),
  updateStats: (token: string, stats: Record<string, number>) =>
    api('/user/stats', { method: 'PATCH', body: stats, token }),
  addToWatchlist: (token: string, animeId: string) =>
    api(`/user/watchlist/${animeId}`, { method: 'POST', token }),
  removeFromWatchlist: (token: string, animeId: string) =>
    api(`/user/watchlist/${animeId}`, { method: 'DELETE', token }),
}
