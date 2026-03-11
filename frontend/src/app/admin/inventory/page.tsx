'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Pencil, Trash2, Search, X, Save, Image as ImageIcon } from 'lucide-react'
import NextImage from 'next/image'
import { productsApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import type { Product } from '@/types'

type ProductForm = {
  name: string
  nameJapanese: string
  description: string
  price: string
  comparePrice: string
  images: { url: string; alt: string }[]
  category: string
  brand: string
  franchise: string
  character: string
  height: string
  material: string
  stock: string
  status: string
  featured: boolean
  isNew: boolean
  tags: string
}

const emptyForm: ProductForm = {
  name: '', nameJapanese: '', description: '', price: '', comparePrice: '',
  images: [{ url: '', alt: '' }], category: 'figures', brand: 'other',
  franchise: '', character: '', height: '', material: '', stock: '0',
  status: 'in-stock', featured: false, isNew: false, tags: '',
}

const categories = ['figures', 'funko', 'model-kits', 'accessories', 'pre-orders']
const brands = ['banpresto', 'kotobukiya', 'good-smile', 'megahouse', 'bandai', 'funko', 'other']
const statuses = ['in-stock', 'out-of-stock', 'pre-order', 'coming-soon']

export default function InventoryPage() {
  const { token } = useAuthStore()
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string> = { page: String(page), limit: '12' }
      if (search) params.search = search
      const res = await productsApi.getAll(params)
      setProducts(res.products)
      setTotal(res.total)
      setTotalPages(res.totalPages)
    } catch {
      // Products will remain empty
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (product: Product) => {
    setEditingId(product._id)
    setForm({
      name: product.name,
      nameJapanese: product.nameJapanese || '',
      description: product.description || '',
      price: String(product.price),
      comparePrice: product.comparePrice ? String(product.comparePrice) : '',
      images: product.images.length > 0 ? product.images : [{ url: '', alt: '' }],
      category: product.category,
      brand: product.brand,
      franchise: product.franchise || '',
      character: product.character || '',
      height: product.height || '',
      material: product.material || '',
      stock: String(product.stock),
      status: product.status,
      featured: product.featured,
      isNew: product.isNew,
      tags: product.tags.join(', '),
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!token || !form.name || !form.price) return
    setSaving(true)
    try {
      const data: Record<string, unknown> = {
        name: form.name.trim(),
        nameJapanese: form.nameJapanese.trim() || undefined,
        description: form.description.trim() || undefined,
        price: Number(form.price),
        comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
        images: form.images.filter(img => img.url.trim()),
        category: form.category,
        brand: form.brand,
        franchise: form.franchise.trim() || undefined,
        character: form.character.trim() || undefined,
        height: form.height.trim() || undefined,
        material: form.material.trim() || undefined,
        stock: Number(form.stock) || 0,
        status: form.status,
        featured: form.featured,
        isNew: form.isNew,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      }

      if (editingId) {
        await productsApi.update(token, editingId, data)
      } else {
        await productsApi.create(token, data)
      }
      setShowModal(false)
      fetchProducts()
    } catch {
      // Error silently handled
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!token) return
    try {
      await productsApi.delete(token, id)
      setDeleteConfirm(null)
      fetchProducts()
    } catch {
      // Silent
    }
  }

  const addImageField = () => {
    setForm(prev => ({ ...prev, images: [...prev.images, { url: '', alt: '' }] }))
  }

  const updateImage = (index: number, field: 'url' | 'alt', value: string) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? { ...img, [field]: value } : img),
    }))
  }

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoal font-display">Inventory</h1>
          <p className="text-sm text-charcoal-400">{total} products total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-peach-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pink-100">
                <th className="text-left px-6 py-4 font-semibold text-charcoal-600">Product</th>
                <th className="text-left px-4 py-4 font-semibold text-charcoal-600">Category</th>
                <th className="text-left px-4 py-4 font-semibold text-charcoal-600">Price</th>
                <th className="text-left px-4 py-4 font-semibold text-charcoal-600">Stock</th>
                <th className="text-left px-4 py-4 font-semibold text-charcoal-600">Status</th>
                <th className="text-left px-4 py-4 font-semibold text-charcoal-600">Flags</th>
                <th className="text-right px-6 py-4 font-semibold text-charcoal-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-charcoal-400">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-charcoal-400">No products found</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-pink-50 hover:bg-soft-pink/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-soft-pink to-soft-peach overflow-hidden relative flex-shrink-0">
                          {product.images[0]?.url ? (
                            <NextImage src={product.images[0].url} alt={product.name} fill className="object-cover" sizes="48px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-pink-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal">{product.name}</p>
                          <p className="text-xs text-charcoal-400">{product.franchise} {product.character ? `· ${product.character}` : ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-soft-pink rounded-full text-xs font-medium text-pink-500 capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-charcoal">€{product.price.toFixed(2)}</span>
                      {product.comparePrice && (
                        <span className="text-xs text-charcoal-400 line-through ml-1">€{product.comparePrice.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`font-medium ${product.stock <= 5 ? 'text-red-500' : 'text-charcoal'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                        product.status === 'in-stock' ? 'bg-green-50 text-green-600' :
                        product.status === 'out-of-stock' ? 'bg-red-50 text-red-500' :
                        product.status === 'pre-order' ? 'bg-blue-50 text-blue-500' :
                        'bg-yellow-50 text-yellow-600'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1">
                        {product.featured && <span className="px-2 py-0.5 bg-peach-50 text-peach-500 rounded-full text-[10px] font-bold">Featured</span>}
                        {product.isNew && <span className="px-2 py-0.5 bg-pink-50 text-pink-500 rounded-full text-[10px] font-bold">New</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 rounded-lg hover:bg-soft-pink text-charcoal-400 hover:text-pink-500 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deleteConfirm === product._id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(product._id)} className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg">Yes</button>
                            <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-charcoal-200 text-charcoal text-xs rounded-lg">No</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product._id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-charcoal-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 px-6 py-4 border-t border-pink-100">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? 'bg-gradient-to-r from-pink-500 to-peach-500 text-white'
                    : 'text-charcoal-500 hover:bg-soft-pink'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-pink-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="text-lg font-bold text-charcoal font-display">
                {editingId ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-soft-pink rounded-lg transition-colors">
                <X className="w-5 h-5 text-charcoal-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 space-y-4">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Satoru Gojo Figure"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Japanese Name</label>
                  <input
                    value={form.nameJapanese}
                    onChange={(e) => setForm(prev => ({ ...prev, nameJapanese: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="五条悟"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-charcoal-600 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
                  placeholder="Premium anime figure..."
                />
              </div>

              {/* Price & Stock Row */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Price (€) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Compare Price (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.comparePrice}
                    onChange={(e) => setForm(prev => ({ ...prev, comparePrice: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm(prev => ({ ...prev, stock: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                  />
                </div>
              </div>

              {/* Category, Brand, Status Row */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white"
                  >
                    {categories.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Brand</label>
                  <select
                    value={form.brand}
                    onChange={(e) => setForm(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white"
                  >
                    {brands.map(b => <option key={b} value={b} className="capitalize">{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white"
                  >
                    {statuses.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Franchise, Character Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Franchise</label>
                  <input
                    value={form.franchise}
                    onChange={(e) => setForm(prev => ({ ...prev, franchise: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Jujutsu Kaisen"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Character</label>
                  <input
                    value={form.character}
                    onChange={(e) => setForm(prev => ({ ...prev, character: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="Satoru Gojo"
                  />
                </div>
              </div>

              {/* Height, Material Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Height</label>
                  <input
                    value={form.height}
                    onChange={(e) => setForm(prev => ({ ...prev, height: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="21cm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-600 mb-1">Material</label>
                  <input
                    value={form.material}
                    onChange={(e) => setForm(prev => ({ ...prev, material: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                    placeholder="PVC, ABS"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-medium text-charcoal-600 mb-1">Tags (comma separated)</label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                  placeholder="anime, jjk, shonen"
                />
              </div>

              {/* Flags */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded border-pink-300 text-pink-500 focus:ring-pink-200"
                  />
                  <span className="text-sm text-charcoal-600">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isNew}
                    onChange={(e) => setForm(prev => ({ ...prev, isNew: e.target.checked }))}
                    className="w-4 h-4 rounded border-pink-300 text-pink-500 focus:ring-pink-200"
                  />
                  <span className="text-sm text-charcoal-600">New Arrival</span>
                </label>
              </div>

              {/* Images */}
              <div>
                <label className="block text-xs font-medium text-charcoal-600 mb-2">Images</label>
                {form.images.map((img, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      value={img.url}
                      onChange={(e) => updateImage(i, 'url', e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                      placeholder="Image URL (e.g. /assets/sample/1.png)"
                    />
                    <input
                      value={img.alt}
                      onChange={(e) => updateImage(i, 'alt', e.target.value)}
                      className="w-32 px-3 py-2 text-sm border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200"
                      placeholder="Alt text"
                    />
                    {form.images.length > 1 && (
                      <button onClick={() => removeImage(i)} className="p-2 hover:bg-red-50 rounded-lg text-charcoal-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addImageField}
                  className="text-xs text-pink-500 hover:text-pink-600 font-medium mt-1"
                >
                  + Add another image
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-pink-100 sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-charcoal-600 hover:bg-soft-pink rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.price}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-peach-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
