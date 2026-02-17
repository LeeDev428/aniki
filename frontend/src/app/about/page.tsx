'use client'

import Image from 'next/image'
import { Users, Globe, Award, Heart, Target, Sparkles } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

const stats = [
  { icon: Users, value: '10K+', label: 'Happy Collectors' },
  { icon: Globe, value: '50+', label: 'Countries Shipped' },
  { icon: Award, value: '20+', label: 'Brand Partners' },
  { icon: Heart, value: '500+', label: 'Products Available' },
]

const values = [
  {
    icon: Target,
    title: 'Authenticity',
    description: 'Every product we sell is 100% officially licensed and verified authentic.'
  },
  {
    icon: Sparkles,
    title: 'Quality',
    description: 'We only partner with premium brands known for exceptional craftsmanship.'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Run by collectors, for collectors. We understand what you love.'
  },
]

const team = [
  { name: 'Alex Chen', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Yuki Tanaka', role: 'Product Manager', emoji: '👩‍💻' },
  { name: 'Mike Johnson', role: 'Operations Lead', emoji: '📦' },
  { name: 'Sarah Kim', role: 'Customer Support', emoji: '💬' },
]

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-honey-50 to-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium text-honey-700 bg-honey-100 rounded-full">
              Our Story
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Bringing Anime Dreams to Life
            </h1>
            <p className="text-neutral-600 leading-relaxed">
              Founded by passionate anime enthusiasts, Aniki has grown from a small hobby 
              into one of the most trusted destinations for premium anime figures and collectibles.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="text-center p-6 bg-cream rounded-xl">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-honey-100 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-honey-600" />
                  </div>
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="aspect-square bg-gradient-to-br from-honey-100 to-honey-200 rounded-2xl flex items-center justify-center">
                <span className="text-8xl">🎭</span>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                From Collectors, For Collectors
              </h2>
              <div className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  What started as a personal collection in 2019 quickly became a mission to share 
                  our passion with fellow anime enthusiasts around the world.
                </p>
                <p>
                  We noticed that finding authentic, high-quality anime figures was often difficult 
                  and expensive. That&apos;s why we built Aniki – to make premium collectibles 
                  accessible to everyone.
                </p>
                <p>
                  Today, we work directly with top manufacturers like Banpresto, Kotobukiya, and 
                  Good Smile Company to bring you the best figures at the best prices.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Our Values</h2>
            <p className="text-neutral-600 text-sm">What drives us every day</p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <div className="p-6 bg-cream rounded-xl text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-honey-100 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-honey-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-neutral-600">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Meet the Team</h2>
            <p className="text-neutral-600 text-sm">The people behind Aniki</p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-honey-100 to-honey-200 flex items-center justify-center">
                    <span className="text-3xl">{member.emoji}</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900">{member.name}</h3>
                  <p className="text-sm text-neutral-500">{member.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <FadeIn>
        <section className="py-16 bg-neutral-900">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Start Your Collection?
            </h2>
            <p className="text-neutral-400 text-sm mb-6 max-w-lg mx-auto">
              Join thousands of happy collectors and discover your next favorite figure.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-honey-500 text-white rounded-full font-medium hover:bg-honey-600 transition-colors"
            >
              Browse Collection
            </a>
          </div>
        </section>
      </FadeIn>
    </PageLayout>
  )
}
