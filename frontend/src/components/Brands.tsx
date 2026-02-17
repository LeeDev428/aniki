'use client'

const brands = [
  { name: 'Banpresto', logo: 'バンプレスト' },
  { name: 'Kotobukiya', logo: '壽屋' },
  { name: 'Good Smile', logo: 'グッスマ' },
  { name: 'Bandai', logo: 'バンダイ' },
  { name: 'MegaHouse', logo: 'メガハウス' },
  { name: 'Funko', logo: 'FUNKO' },
]

export default function Brands() {
  return (
    <section className="relative z-10 px-8 py-16 bg-warm-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-neutral-800 mb-2">
            Official Partners
          </h2>
          <p className="text-neutral-500">
            We only sell authentic products from trusted brands
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="font-jp text-xl text-honey-600 mb-2">
                {brand.logo}
              </span>
              <span className="text-xs text-neutral-500">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
