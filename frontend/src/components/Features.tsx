'use client'

import { Truck, ShieldCheck, MessageCircle, RefreshCw } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Free shipping on orders over €50'
  },
  {
    icon: ShieldCheck,
    title: '100% Authentic',
    description: 'Official licensed products only'
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    description: 'Quick response within 24 hours'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns'
  }
]

export default function Features() {
  return (
    <section className="relative z-10 px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-honey-100 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-honey-600" />
              </div>
              <h3 className="font-medium text-neutral-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
