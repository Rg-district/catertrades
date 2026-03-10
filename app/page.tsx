'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Heart, Search, X, ChevronDown, ChevronRight, MapPin, User } from 'lucide-react'

const VEHICLE_TYPES = ['Any Type', 'Van', 'Truck', 'Trailer', 'Cart']
const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under £20k', min: 0, max: 20000 },
  { label: '£20k - £40k', min: 20000, max: 40000 },
  { label: '£40k - £60k', min: 40000, max: 60000 },
  { label: '£60k+', min: 60000, max: Infinity },
]

const CATEGORIES = [
  { name: 'Food Trucks', emoji: '🚚', count: 12 },
  { name: 'Vans', emoji: '🚐', count: 8 },
  { name: 'Trailers', emoji: '🚛', count: 5 },
  { name: 'Carts', emoji: '🛒', count: 3 },
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <button onClick={() => setMenuOpen(true)} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg md:hidden">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-6">
                <Link href="/browse" className="text-sm font-medium text-gray-600 hover:text-gray-900">Browse</Link>
                <Link href="/sell" className="text-sm font-medium text-gray-600 hover:text-gray-900">Sell</Link>
                <Link href="/guide" className="text-sm font-medium text-gray-600 hover:text-gray-900">Guide</Link>
              </div>
            </div>

            <Link href="/">
              <img src="/logo.png" alt="CaterTrades" className="h-7" />
            </Link>

            <div className="flex items-center gap-1">
              <Link href="/saved" className="p-2 hover:bg-gray-100 rounded-lg">
                <Heart className="w-5 h-5 text-gray-600" />
              </Link>
              <Link href="/search" className="p-2 hover:bg-gray-100 rounded-lg hidden md:flex">
                <Search className="w-5 h-5 text-gray-600" />
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
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setMenuOpen(false)}>
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

      {/* Hero Section */}
      <main className="px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Desktop: Two column layout */}
          <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
            
            {/* Left Column: Text + Search */}
            <div className="max-w-lg mx-auto md:mx-0 md:max-w-none">
              {/* Hero Text */}
              <div className="text-center md:text-left mb-6">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                  Find your catering vehicle
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                  The UK's marketplace for food trucks, vans & mobile kitchens
                </p>
              </div>

              {/* Search Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 mb-6">
                {/* Location */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter postcode or city"
                      value={filters.location}
                      onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
                      className="w-full pl-9 pr-4 py-2.5 md:py-3 border border-gray-200 rounded-lg text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* Type & Price */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Type</label>
                    <div className="relative">
                      <select
                        value={filters.type}
                        onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
                        className="w-full px-3 py-2.5 md:py-3 border border-gray-200 rounded-lg text-sm appearance-none bg-white focus:border-emerald-500 outline-none"
                      >
                        {VEHICLE_TYPES.map(t => <option key={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Price</label>
                    <div className="relative">
                      <select
                        value={filters.priceRange}
                        onChange={e => setFilters(f => ({ ...f, priceRange: Number(e.target.value) }))}
                        className="w-full px-3 py-2.5 md:py-3 border border-gray-200 rounded-lg text-sm appearance-none bg-white focus:border-emerald-500 outline-none"
                      >
                        {PRICE_RANGES.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <Link
                  href={`/browse?location=${filters.location}&type=${filters.type}&price=${filters.priceRange}`}
                  className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 md:py-3.5 rounded-lg font-semibold text-sm transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Search{listingCount > 0 ? ` ${listingCount} vehicles` : ' vehicles'}
                </Link>
              </div>

              {/* Category Pills - Desktop */}
              <div className="hidden md:block mb-6">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat.name}
                      href={`/browse?type=${cat.name}`}
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
                    >
                      <span>{cat.emoji}</span>
                      <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                      <span className="text-xs text-gray-400">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Featured Image - Desktop Only */}
            <div className="hidden md:block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800&q=80" 
                  alt="Food truck"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-semibold">Start your food business today</p>
                  <p className="text-white/70 text-sm">Verified sellers across the UK</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Featured Image */}
          <div className="md:hidden max-w-lg mx-auto">
            <div className="relative rounded-xl overflow-hidden mb-6 aspect-[16/9]">
              <img 
                src="https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800&q=80" 
                alt="Food truck"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">Start your food business today</p>
                <p className="text-white/70 text-xs">Verified sellers across the UK</p>
              </div>
            </div>

            {/* Quick Links - Mobile */}
            <div className="space-y-3 mb-8">
              <Link href="/sell" className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚐</span>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Sell your vehicle</div>
                    <div className="text-xs text-gray-500">Free to list · Reach buyers UK-wide</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/guide" className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📖</span>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">First-time buyer's guide</div>
                    <div className="text-xs text-gray-500">Everything you need to know</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>

              <Link href="/browse" className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔍</span>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Browse all vehicles</div>
                    <div className="text-xs text-gray-500">View our full inventory</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>

            {/* Trust Badges - Mobile */}
            <div className="flex justify-between text-center py-4 border-t border-gray-200">
              <div>
                <div className="text-lg mb-0.5">✅</div>
                <div className="text-xs font-medium text-gray-900">Verified</div>
              </div>
              <div>
                <div className="text-lg mb-0.5">🆓</div>
                <div className="text-xs font-medium text-gray-900">Free to List</div>
              </div>
              <div>
                <div className="text-lg mb-0.5">🇬🇧</div>
                <div className="text-xs font-medium text-gray-900">UK Only</div>
              </div>
            </div>
          </div>

          {/* Desktop: Quick Actions Row */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mt-12">
            <Link href="/sell" className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all">
              <span className="text-3xl">🚐</span>
              <div>
                <div className="font-semibold text-gray-900">Sell your vehicle</div>
                <div className="text-sm text-gray-500">Free to list · Reach buyers UK-wide</div>
              </div>
            </Link>

            <Link href="/guide" className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all">
              <span className="text-3xl">📖</span>
              <div>
                <div className="font-semibold text-gray-900">Buyer's guide</div>
                <div className="text-sm text-gray-500">Everything you need to know</div>
              </div>
            </Link>

            <Link href="/browse" className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all">
              <span className="text-3xl">🔍</span>
              <div>
                <div className="font-semibold text-gray-900">Browse all</div>
                <div className="text-sm text-gray-500">View our full inventory</div>
              </div>
            </Link>
          </div>

          {/* Desktop: Trust Badges */}
          <div className="hidden md:flex justify-center gap-16 mt-12 py-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-sm font-medium text-gray-900">Verified Sellers</div>
              <div className="text-xs text-gray-500">Every listing reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🆓</div>
              <div className="text-sm font-medium text-gray-900">Free to List</div>
              <div className="text-xs text-gray-500">No fees, no commission</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🇬🇧</div>
              <div className="text-sm font-medium text-gray-900">UK Specialist</div>
              <div className="text-xs text-gray-500">Catering vehicles only</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-6 text-xs text-gray-500">
            <Link href="/guide" className="hover:text-gray-700">Guide</Link>
            <Link href="/faq" className="hover:text-gray-700">FAQ</Link>
            <Link href="/contact" className="hover:text-gray-700">Contact</Link>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            © 2026 CaterTrades
          </p>
        </div>
      </footer>
    </div>
  )
}
