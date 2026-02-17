# アニキフィギュア | Aniki Figures

<div align="center">
  
  **Premium Anime Figure E-Commerce Platform**
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
  [![Express](https://img.shields.io/badge/Express-4.x-green?logo=express)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green?logo=mongodb)](https://mongodb.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-blue?logo=tailwindcss)](https://tailwindcss.com/)
</div>

---

## 📖 Overview

**Aniki Figures** is a full-stack e-commerce platform specialized in anime figures, Funko Pop collectibles, and model kits. Built with a modern tech stack featuring Next.js 14 for the frontend and Express.js with MongoDB for the backend.

### ✨ Key Features

- 🛍️ **Product Catalog** - Browse figures by category, brand, franchise, and character
- 🔍 **Advanced Search** - Filter products with multiple criteria
- 🛒 **Shopping Cart** - Persistent cart with Zustand state management
- ❤️ **Wishlist** - Save items for later
- 📦 **Pre-Orders** - Reserve upcoming releases
- 👤 **User Accounts** - Registration, authentication, order history
- 📱 **Responsive Design** - Mobile-first approach with beautiful UI
- 🎨 **Japanese Aesthetic** - Honey/gold color scheme with glass morphism

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **TailwindCSS** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **Zustand** | State management (cart, auth) |
| **Lucide Icons** | Modern icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Express.js** | REST API server |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **CORS** | Cross-origin resource sharing |

---

## 📁 Project Structure

```
aniki/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # MongoDB connection
│   │   ├── middleware/
│   │   │   └── auth.js        # JWT authentication
│   │   ├── models/
│   │   │   ├── User.js        # User schema
│   │   │   ├── Product.js     # Product schema
│   │   │   └── Order.js       # Order schema
│   │   ├── routes/
│   │   │   ├── auth.js        # Login/register
│   │   │   ├── users.js       # User management
│   │   │   ├── products.js    # Product CRUD
│   │   │   └── orders.js      # Order management
│   │   └── index.js           # Server entry point
│   ├── seed.js                # Database seeding
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # Next.js application
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   │   ├── layout.tsx     # Root layout
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── shop/          # Shop pages
│   │   │   ├── product/       # Product detail
│   │   │   ├── cart/          # Shopping cart
│   │   │   └── auth/          # Login/register
│   │   ├── components/        # React components
│   │   │   ├── Navbar.tsx     # Navigation
│   │   │   ├── Sidebar.tsx    # Mobile menu
│   │   │   ├── Hero.tsx       # Landing hero
│   │   │   ├── Features.tsx   # Trust signals
│   │   │   ├── Brands.tsx     # Brand partners
│   │   │   ├── ProductCard.tsx# Product listing card
│   │   │   └── Footer.tsx     # Site footer
│   │   ├── lib/
│   │   │   ├── api.ts         # API client
│   │   │   └── store.ts       # Zustand stores
│   │   └── types/
│   │       └── index.ts       # TypeScript types
│   ├── public/                # Static assets
│   ├── tailwind.config.ts     # Tailwind configuration
│   ├── package.json
│   └── .env.local.example
│
├── DEPLOYMENT.md              # Deployment guide
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aniki
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/aniki
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Seed Database (Optional)**
   ```bash
   cd ../backend
   node seed.js
   ```

### Running Development

**Start Backend:**
```bash
cd backend
npm run dev
```
Server runs at `http://localhost:5000`

**Start Frontend (new terminal):**
```bash
cd frontend
npm run dev
```
App runs at `http://localhost:3000`

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create new user |
| POST | `/auth/login` | Login and get token |
| GET | `/auth/me` | Get current user (protected) |

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | List all products (with filters) |
| GET | `/products/featured` | Get featured products |
| GET | `/products/new` | Get new arrivals |
| GET | `/products/pre-orders` | Get pre-order products |
| GET | `/products/slug/:slug` | Get product by slug |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create product (admin) |
| PATCH | `/products/:id` | Update product (admin) |
| DELETE | `/products/:id` | Delete product (admin) |

**Query Parameters for `/products`:**
- `category` - Filter by category (figures, funko, model-kits, accessories, pre-orders)
- `brand` - Filter by brand
- `franchise` - Filter by franchise/anime
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `status` - Product status (in-stock, out-of-stock, pre-order)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `sort` - Sort field (e.g., `-createdAt`, `price`, `-price`)

### Order Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create new order |
| GET | `/orders/my-orders` | Get user's orders (protected) |
| GET | `/orders/:id` | Get order by ID (protected) |
| PATCH | `/orders/:id/status` | Update order status (admin) |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/profile` | Get user profile (protected) |
| PATCH | `/users/profile` | Update profile (protected) |
| POST | `/users/cart` | Add to cart (protected) |
| DELETE | `/users/cart/:productId` | Remove from cart (protected) |
| POST | `/users/wishlist` | Add to wishlist (protected) |
| DELETE | `/users/wishlist/:productId` | Remove from wishlist (protected) |

---

## 📊 Database Models

### Product Schema
```javascript
{
  name: String,           // Product name
  nameJapanese: String,   // Japanese name (optional)
  slug: String,           // URL-friendly slug
  description: String,
  price: Number,
  comparePrice: Number,   // Original price for sales
  images: [{
    url: String,
    alt: String
  }],
  category: Enum,         // figures, funko, model-kits, accessories, pre-orders
  brand: Enum,            // banpresto, kotobukiya, good-smile, etc.
  franchise: String,      // Anime/game series
  character: String,
  height: String,         // Figure height (e.g., "18cm")
  stock: Number,
  status: Enum,           // in-stock, out-of-stock, pre-order, discontinued
  releaseDate: Date,
  featured: Boolean,
  isNew: Boolean
}
```

### Order Schema
```javascript
{
  user: ObjectId,         // Reference to User (optional for guest)
  orderNumber: String,    // Auto-generated (ANK-XXXXX)
  items: [{
    product: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  subtotal: Number,
  shippingCost: Number,
  total: Number,
  status: Enum,           // pending, processing, shipped, delivered, cancelled
  paymentStatus: Enum,    // pending, paid, failed, refunded
  shippingAddress: {
    fullName: String,
    street: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String
  },
  guestEmail: String      // For guest checkout
}
```

### User Schema
```javascript
{
  username: String,
  email: String,
  password: String,       // Hashed with bcrypt
  avatar: String,
  role: Enum,             // customer, admin
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  cart: [{
    product: ObjectId,
    quantity: Number
  }],
  wishlist: [ObjectId]
}
```

---

## 🎨 Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Honey 50** | `#fffbeb` | Light backgrounds |
| **Honey 100** | `#fef3c7` | Subtle highlights |
| **Honey 200** | `#fde68a` | Borders, accents |
| **Honey 300** | `#fcd34d` | Secondary accents |
| **Honey 400** | `#fbbf24` | Primary accent |
| **Honey 500** | `#f59e0b` | Buttons, CTAs |
| **Honey 600** | `#d97706` | Hover states |
| **Cream** | `#faf8f5` | Background |
| **Neutral 800** | `#1f2937` | Text primary |
| **Neutral 600** | `#4b5563` | Text secondary |

### Typography

- **Primary**: Inter (system font)
- **Japanese**: Noto Sans JP
- **Headings**: Bold, tracking-tight

### Components

- Glass morphism with `backdrop-blur-lg`
- Rounded corners (`rounded-2xl`, `rounded-3xl`)
- Subtle shadows with hover effects
- Smooth transitions (300ms)

---

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Frontend (Vercel):**
1. Connect GitHub repository to Vercel
2. Set environment variables
3. Deploy

**Backend (Render/Railway):**
1. Connect GitHub repository
2. Set environment variables
3. Deploy

**Database (MongoDB Atlas):**
1. Create free M0 cluster
2. Whitelist IPs (or allow all: `0.0.0.0/0`)
3. Get connection string

---

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm start       # Start production server
npm run dev     # Start with nodemon (hot reload)
```

**Frontend:**
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

### Adding New Features

1. **New Model**: Create in `backend/src/models/`
2. **New Route**: Create in `backend/src/routes/`, register in `index.js`
3. **New Component**: Create in `frontend/src/components/`
4. **New Page**: Create in `frontend/src/app/`

---

## 📝 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- Design inspiration from modern anime figure shops
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

<div align="center">
  <strong>アニキフィギュア</strong> - Your Premium Anime Figure Destination
  
  Built with ❤️ for anime collectors
</div>
