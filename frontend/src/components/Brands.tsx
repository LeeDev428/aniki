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
    <section className="relative py-12 bg-white border-t border-primary-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-8">
          <p className="text-xs text-dark-400 uppercase tracking-wider mb-1.5">
            Trusted By
          </p>
          <h2 className="text-xl font-semibold text-dark-800">
            Official Brand Partners
          </h2>
        </FadeIn>

        <StaggerContainer className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
          {brands.map((brand, index) => (
            <StaggerItem key={index} direction="up">
              <div className="group flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-dark-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                  <span className="font-bold text-sm text-dark-600 group-hover:text-primary-500 transition-colors">
                    {brand.initial}
                  </span>
                </div>
                <span className="text-xs font-medium text-dark-700 hidden sm:inline">
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
