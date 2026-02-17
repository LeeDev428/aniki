'use client'

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
    <section className="relative py-16 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-neutral-500 uppercase tracking-wider mb-2">
            Trusted By
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900">
            Official Brand Partners
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-neutral-100 group-hover:bg-honey-100 flex items-center justify-center transition-colors">
                <span className="font-bold text-neutral-600 group-hover:text-honey-600 transition-colors">
                  {brand.initial}
                </span>
              </div>
              <span className="text-sm font-medium text-neutral-700 hidden sm:inline">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
