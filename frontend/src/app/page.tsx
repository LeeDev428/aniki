import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-honey-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-honey-100/40 rounded-full blur-2xl" />
      
      {/* Gold decorative swirls */}
      <svg className="absolute top-10 right-40 w-32 h-32 text-honey-300 opacity-60" viewBox="0 0 100 100">
        <path d="M50 10 Q70 30, 90 50 Q70 70, 50 90 Q30 70, 10 50 Q30 30, 50 10" 
              fill="none" stroke="currentColor" strokeWidth="1"/>
      </svg>
      <svg className="absolute bottom-40 right-20 w-24 h-24 text-honey-400 opacity-40" viewBox="0 0 100 100">
        <path d="M50 10 Q70 30, 90 50 Q70 70, 50 90 Q30 70, 10 50 Q30 30, 50 10" 
              fill="none" stroke="currentColor" strokeWidth="1"/>
      </svg>
      
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        <Hero />
      </div>
    </main>
  )
}
