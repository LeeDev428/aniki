'use client'

import { FadeIn, StaggerContainer, StaggerItem } from './animations'

const brands = [
  { name: 'Banpresto', initial: 'B' },
  { name: 'Kotobukiya', initial: 'K' },
  { name: 'Good Smile Company', initial: 'G' },
  { name: 'Bandai Namco', initial: 'BN' },
  { name: 'MegaHouse', initial: 'M' },
  { name: 'Funko', initial: 'F' },
]

export default function Brands() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-white to-cream border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-10">
          <p className="text-sm text-pink-500 uppercase tracking-wider mb-2 font-semibold">
            Trusted By
          </p>
          <h2 className="text-2xl font-bold text-charcoal font-display">
            Official Brand Partners
          </h2>
        </FadeIn>

        <StaggerContainer className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
          {brands.map((brand, index) => (
            <StaggerItem key={index} direction="up">
              <div className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-soft-pink group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-peach-500 flex items-center justify-center transition-all duration-300 shadow-sm">
                  <span className="font-bold text-base text-pink-500 group-hover:text-white transition-colors font-display">
                    {brand.initial}
                  </span>
                </div>
                <span className="text-sm font-medium text-charcoal-600 hidden sm:inline">
                  {brand.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
