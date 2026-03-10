'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Heart, Search, X, ChevronDown, MapPin, User } from 'lucide-react'

const VEHICLE_TYPES = ['Any Type', 'Van', 'Truck', 'Trailer', 'Cart']
const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under £20k', min: 0, max: 20000 },
  { label: '£20k - £40k', min: 20000, max: 40000 },
  { label: '£40k - £60k', min: 40000, max: 60000 },
  { label: '£60k+', min: 60000, max: Infinity },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [listingCount, setListingCount] = useState(0)
  const [filters, setFilters] = useState({
    location: '',
    type: 'Any Type',
    priceRange: 0,
  })

  useEffect(() => {
    fetch('/api/listings')
      .then(r => r.json())
      .then(d => setListingCount(d.listings?.length || 0))
      .catch(() => setListingCount(0))
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <button onClick={() => setMenuOpen(true)} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg md:hidden">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
              <Link href="/sell" className="text-sm font-medium text-gray-600 hover:text-gray-900 hidden md:block">
                Sell
              </Link>
            </div>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <img src="/logo.png" alt="CaterTrades" className="h-7" />
            </Link>

            <div className="flex items-center gap-1">
              <Link href="/saved" className="p-2 hover:bg-gray-100 rounded-lg hidden md:flex">
                <Heart className="w-5 h-5 text-gray-600" />
              </Link>
              <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-5 h-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMenuOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold">Menu</span>
              <button onClick={() => setMenuOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-1">
              <Link href="/browse" className="block py-3 px-4 rounded-lg hover:bg-gray-100">Browse</Link>
              <Link href="/sell" className="block py-3 px-4 rounded-lg hover:bg-gray-100">Sell</Link>
              <Link href="/guide" className="block py-3 px-4 rounded-lg hover:bg-gray-100">Buyer's Guide</Link>
              <Link href="/account" className="block py-3 px-4 rounded-lg hover:bg-gray-100">Account</Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero - Clean & Minimal */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col justify-center px-4 py-12 md:py-20">
          <div className="max-w-md mx-auto w-full">
            {/* Headline */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
              Find your catering vehicle
            </h1>
            <p className="text-gray-500 text-center text-sm mb-8">
              Food trucks, vans & mobile kitchens across the UK
            </p>

            {/* Search Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-4">
              {/* Location */}
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Postcode or city"
                    value={filters.location}
                    onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:bg-white focus:border-emerald-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Type & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select
                    value={filters.type}
                    onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:bg-white focus:border-emerald-500 outline-none transition-colors"
                  >
                    {VEHICLE_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={filters.priceRange}
                    onChange={e => setFilters(f => ({ ...f, priceRange: Number(e.target.value) }))}
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:bg-white focus:border-emerald-500 outline-none transition-colors"
                  >
                    {PRICE_RANGES.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Search Button */}
              <Link
                href={`/browse?location=${filters.location}&type=${filters.type}&price=${filters.priceRange}`}
                className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-semibold text-base transition-colors"
              >
                <Search className="w-5 h-5" />
                Search{listingCount > 0 ? ` ${listingCount} vehicles` : ''}
              </Link>
            </div>

            {/* Quick Links */}
            <div className="flex justify-center gap-6 mt-8 text-sm">
              <Link href="/sell" className="text-emerald-600 font-medium hover:underline">
                Sell your vehicle
              </Link>
              <Link href="/browse" className="text-gray-500 hover:text-gray-700">
                Browse all
              </Link>
            </div>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className="border-t border-gray-100 py-6">
          <div className="max-w-md mx-auto px-4">
            <div className="flex justify-center gap-6 text-xs text-gray-400">
              <Link href="/guide" className="hover:text-gray-600">Guide</Link>
              <Link href="/faq" className="hover:text-gray-600">FAQ</Link>
              <Link href="/contact" className="hover:text-gray-600">Contact</Link>
            </div>
            <p className="text-center text-xs text-gray-300 mt-3">
              © 2026 CaterTrades
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
