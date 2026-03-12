'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function DashboardProfileRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/user/profile') }, [router])
  return null
}

type ProfileForm = {
  username: string
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
}

export default function DashboardProfilePage() {
  const { user, token, setAuth } = useAuthStore()
  const [form, setForm] = useState<ProfileForm>({
    username: '',
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!user) return
    setForm({
      username: user.username || '',
      fullName: user.address?.fullName || '',
      address: user.address?.address || '',
      city: user.address?.city || '',
      postalCode: user.address?.postalCode || '',
      country: user.address?.country || '',
      phone: user.address?.phone || '',
    })
  }, [user])

  const set = (field: keyof ProfileForm, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || !user) return
    setSaving(true)
    setMessage(null)
    try {
      const updated = await userApi.updateProfile(token, {
        username: form.username.trim(),
        address: {
          fullName: form.fullName.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          postalCode: form.postalCode.trim(),
          country: form.country.trim(),
          phone: form.phone.trim(),
        },
      }) as { username: string; email: string; avatar?: string; role: 'customer' | 'admin'; address?: ProfileForm & { fullName: string } }

      // Update auth store with new username
      setAuth(
        { ...user, username: updated.username },
        token
      )
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full px-3 py-2.5 text-sm bg-white border border-pink-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 text-charcoal placeholder-charcoal-300"

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-charcoal font-display">Profile</h1>
        <p className="text-charcoal-400 text-sm mt-1">Manage your account information and delivery address.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Account Info */}
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-pink-500" />
            <h2 className="text-sm font-bold text-charcoal font-display">Account</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-600 mb-1.5">Username</label>
              <input
                value={form.username}
                onChange={(e) => set('username', e.target.value)}
                className={inputClass}
                placeholder="Your username"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-600 mb-1.5">Email</label>
              <input
                value={user?.email || ''}
                disabled
                className="w-full px-3 py-2.5 text-sm bg-pink-50 border border-pink-100 rounded-xl text-charcoal-400 cursor-not-allowed"
              />
              <p className="text-[10px] text-charcoal-400 mt-1">Email cannot be changed</p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-pink-500" />
            <h2 className="text-sm font-bold text-charcoal font-display">Delivery Address</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-600 mb-1.5">Full Name</label>
              <input
                value={form.fullName}
                onChange={(e) => set('fullName', e.target.value)}
                className={inputClass}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-600 mb-1.5">Address</label>
              <input
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                className={inputClass}
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-charcoal-600 mb-1.5">City</label>
                <input
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-600 mb-1.5">Postal Code</label>
                <input
                  value={form.postalCode}
                  onChange={(e) => set('postalCode', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-600 mb-1.5">Country</label>
                <input
                  value={form.country}
                  onChange={(e) => set('country', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-600 mb-1.5">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className={inputClass}
                placeholder="+1 234 567 890"
              />
            </div>
          </div>
        </div>

        {/* Feedback */}
        {message && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-600 border border-red-200'
          }`}>
            {message.type === 'success'
              ? <Check className="w-4 h-4 flex-shrink-0" />
              : <AlertCircle className="w-4 h-4 flex-shrink-0" />
            }
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-peach-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200/50 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
