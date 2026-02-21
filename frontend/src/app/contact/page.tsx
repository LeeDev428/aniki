'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Package } from 'lucide-react'
import PageLayout from '@/components/PageLayout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { Input, Textarea, Button } from '@/components/ui'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'www.tiktok.com/@anikiofficial.nl',
    subtitle: 'We reply within 24 hours'
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+1 (555) 123-4567',
    subtitle: 'Mon-Fri 9AM-6PM EST'
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'Netherlands',
    subtitle: 'Shipping worldwide'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: '9AM - 6PM EST',
    subtitle: 'Monday to Friday'
  },
]

const quickHelp = [
  { icon: Package, title: 'Track Order', description: 'Check your shipment status', href: '/track-order' },
  { icon: HelpCircle, title: 'FAQ', description: 'Common questions', href: '/faq' },
  { icon: MessageSquare, title: 'Live Chat', description: 'Chat with support', href: '#' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-primary-50 to-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium text-dark-700 bg-primary-100 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-dark-800 mb-4">
              Contact Us
            </h1>
            <p className="text-dark-500">
              Have a question or need help? We&apos;re here for you. 
              Reach out and we&apos;ll get back to you as soon as possible.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <StaggerItem key={index}>
                <div className="p-5 bg-cream rounded-xl text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary-100 flex items-center justify-center">
                    <info.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <h3 className="font-medium text-dark-800 text-sm">{info.title}</h3>
                  <p className="font-semibold text-dark-800 mt-1">{info.content}</p>
                  <p className="text-xs text-dark-400 mt-0.5">{info.subtitle}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeIn direction="right">
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-dark-800 mb-2">Send us a Message</h2>
                <p className="text-sm text-dark-500 mb-6">
                  Fill out the form below and we&apos;ll get back to you shortly.
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-3xl">✓</span>
                    </div>
                    <h3 className="font-semibold text-dark-800 mb-1">Message Sent!</h3>
                    <p className="text-sm text-dark-500">We&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <Input
                      label="Subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                    <Textarea
                      label="Message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={<Send className="w-4 h-4" />}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Quick Help */}
            <FadeIn direction="left" delay={0.2}>
              <div>
                <h2 className="text-xl font-bold text-dark-800 mb-2">Quick Help</h2>
                <p className="text-sm text-dark-500 mb-6">
                  Need immediate assistance? Try these options:
                </p>

                <div className="space-y-3 mb-8">
                  {quickHelp.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                        <item.icon className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-dark-800 text-sm">{item.title}</h3>
                        <p className="text-xs text-dark-400">{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">🗺️</span>
                    <p className="text-sm text-dark-700">Map coming soon</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
