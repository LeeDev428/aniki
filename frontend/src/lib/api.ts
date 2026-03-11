import type { Product, Order } from '@/types'

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

// Products endpoints
export const productsApi = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return api<{ products: Product[]; totalPages: number; currentPage: number; total: number }>(`/products${query}`)
  },
  getFeatured: () => api<Product[]>('/products/featured'),
  getNew: () => api<Product[]>('/products/new'),
  getPreOrders: () => api<Product[]>('/products/pre-orders'),
  getBySlug: (slug: string) => api<Product>(`/products/slug/${encodeURIComponent(slug)}`),
  getById: (id: string) => api<Product>(`/products/${encodeURIComponent(id)}`),
  create: (token: string, data: Record<string, unknown>) =>
    api<Product>('/products', { method: 'POST', body: data, token }),
  update: (token: string, id: string, data: Record<string, unknown>) =>
    api<Product>(`/products/${encodeURIComponent(id)}`, { method: 'PATCH', body: data, token }),
  delete: (token: string, id: string) =>
    api<{ message: string }>(`/products/${encodeURIComponent(id)}`, { method: 'DELETE', token }),
}

// Orders endpoints
export const ordersApi = {
  create: (orderData: Record<string, unknown>, token?: string) =>
    api<Order>('/orders', { method: 'POST', body: orderData, token }),
  getMyOrders: (token: string) =>
    api<Order[]>('/orders/my-orders', { token }),
  getById: (id: string, token?: string) => api<Order>(`/orders/${encodeURIComponent(id)}`, { token }),
  getAll: (token: string, params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return api<{ orders: Order[]; totalPages: number; currentPage: number; total: number }>(`/orders/all${query}`, { token })
  },
  updateStatus: (token: string, id: string, data: { status?: string; paymentStatus?: string }) =>
    api<Order>(`/orders/${encodeURIComponent(id)}/status`, { method: 'PATCH', body: data, token }),
}

// User endpoints
export const userApi = {
  getProfile: (token: string) => api('/user/me', { token }),
  updateProfile: (token: string, data: Record<string, unknown>) =>
    api('/user/me', { method: 'PATCH', body: data, token }),
  getWishlist: (token: string) => api('/user/wishlist', { token }),
  addToWishlist: (token: string, productId: string) =>
    api(`/user/wishlist/${productId}`, { method: 'POST', token }),
  removeFromWishlist: (token: string, productId: string) =>
    api(`/user/wishlist/${productId}`, { method: 'DELETE', token }),
  getCart: (token: string) => api('/user/cart', { token }),
  addToCart: (token: string, productId: string, quantity?: number) =>
    api('/user/cart', { method: 'POST', body: { productId, quantity }, token }),
  updateCartItem: (token: string, productId: string, quantity: number) =>
    api(`/user/cart/${productId}`, { method: 'PATCH', body: { quantity }, token }),
  removeFromCart: (token: string, productId: string) =>
    api(`/user/cart/${productId}`, { method: 'DELETE', token }),
  clearCart: (token: string) =>
    api('/user/cart', { method: 'DELETE', token }),
}
