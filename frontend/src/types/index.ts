export type Product = {
  _id: string
  name: string
  nameJapanese?: string
  slug: string
  description?: string
  price: number
  comparePrice?: number
  images: { url: string; alt: string }[]
  category: 'figures' | 'funko' | 'model-kits' | 'accessories' | 'pre-orders'
  brand: 'banpresto' | 'kotobukiya' | 'good-smile' | 'megahouse' | 'bandai' | 'funko' | 'other'
  franchise?: string
  character?: string
  height?: string
  material?: string
  stock: number
  status: 'in-stock' | 'out-of-stock' | 'pre-order' | 'coming-soon'
  releaseDate?: string
  featured: boolean
  isNew: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type CartItem = {
  product: Product
  quantity: number
}

export type OrderItem = {
  product: string | Product
  name: string
  price: number
  quantity: number
}

export type Order = {
  _id: string
  user?: string
  guestEmail?: string
  guestName?: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  shippingAddress: {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
    phone: string
  }
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type User = {
  id: string
  username: string
  email: string
  avatar?: string
  role: 'customer' | 'admin'
  wishlist: Product[]
  cart: CartItem[]
  address?: {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
    phone: string
  }
}
