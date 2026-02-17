'use client'

import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'
import { useState } from 'react'
import PageLayout from '@/components/PageLayout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

const storyMilestones = [
  { year: '2019', title: 'The Beginning', description: 'Started as a personal collection in a small apartment.' },
  { year: '2020', title: 'First Online Store', description: 'Launched our first e-commerce platform.' },
  { year: '2021', title: 'Brand Partnerships', description: 'Partnered with major manufacturers like Banpresto.' },
  { year: '2022', title: 'Global Expansion', description: 'Started shipping to over 50 countries.' },
  { year: '2023', title: 'Community Growth', description: 'Reached 10,000+ happy collectors worldwide.' },
  { year: '2024', title: 'New Horizons', description: 'Expanding product lines and exclusive releases.' },
]

const testimonials = [
  {
    quote: "Aniki has the best selection of figures I've ever seen. Fast shipping and excellent packaging!",
    author: 'Sarah T.',
    location: 'USA',
    avatar: '👩'
  },
  {
    quote: "Finally found a reliable source for authentic anime figures. Highly recommended!",
    author: 'Mike K.',
    location: 'Canada',
    avatar: '👨'
  },
  {
    quote: "The customer service is top-notch. They helped me track down a rare figure I've been looking for.",
    author: 'Yuki M.',
    location: 'Japan',
    avatar: '👩‍🦰'
  },
]

export default function StoryPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  return (
    <PageLayout>
      {/* Hero Video Section */}
      <section className="relative py-16 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium text-honey-400 bg-honey-500/20 rounded-full">
              Our Journey
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              The Aniki Story
            </h1>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              From a passionate collector&apos;s dream to a global destination for anime enthusiasts.
            </p>
          </FadeIn>

          {/* Video Player Placeholder */}
          <FadeIn delay={0.2}>
            <div className="relative aspect-video bg-neutral-800 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-honey-500/20 flex items-center justify-center cursor-pointer hover:bg-honey-500/30 transition-colors"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-honey-400" />
                    ) : (
                      <Play className="w-8 h-8 text-honey-400 ml-1" />
                    )}
                  </div>
                  <p className="text-neutral-400 text-sm">Watch Our Story</p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-honey-400 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:text-honey-400 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <span className="text-xs text-neutral-400">0:00 / 3:24</span>
                  </div>
                  <button className="text-white hover:text-honey-400 transition-colors">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Our Timeline</h2>
            <p className="text-neutral-600 text-sm">Key milestones in our journey</p>
          </FadeIn>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-honey-200 -translate-x-1/2" />

            <StaggerContainer className="space-y-8">
              {storyMilestones.map((milestone, index) => (
                <StaggerItem key={index}>
                  <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} hidden lg:block`}>
                      <div className="p-5 bg-cream rounded-xl inline-block max-w-sm">
                        <span className="text-honey-600 font-bold">{milestone.year}</span>
                        <h3 className="font-semibold text-neutral-900 mt-1">{milestone.title}</h3>
                        <p className="text-sm text-neutral-600 mt-1">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="relative z-10 w-8 h-8 rounded-full bg-honey-500 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>

                    <div className="flex-1 lg:hidden">
                      <div className="p-5 bg-cream rounded-xl">
                        <span className="text-honey-600 font-bold">{milestone.year}</span>
                        <h3 className="font-semibold text-neutral-900 mt-1">{milestone.title}</h3>
                        <p className="text-sm text-neutral-600 mt-1">{milestone.description}</p>
                      </div>
                    </div>

                    <div className="flex-1 hidden lg:block" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">What Collectors Say</h2>
            <p className="text-neutral-600 text-sm">Stories from our community</p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <div className="p-6 bg-white rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-honey-100 flex items-center justify-center">
                      <span className="text-xl">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 text-sm">{testimonial.author}</p>
                      <p className="text-xs text-neutral-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <FadeIn>
        <section className="py-16 bg-gradient-to-r from-honey-500 to-honey-600">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Be Part of Our Story
            </h2>
            <p className="text-honey-100 text-sm mb-6 max-w-lg mx-auto">
              Join our growing community of collectors and discover amazing figures.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-honey-600 rounded-full font-medium hover:bg-neutral-100 transition-colors"
            >
              Start Collecting
            </a>
          </div>
        </section>
      </FadeIn>
    </PageLayout>
  )
}
