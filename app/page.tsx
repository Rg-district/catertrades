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
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [listingCount, setListingCount] = useState(0)
  const [filters, setFilters] = useState({
    location: '',
    type: 'Any Type',
    priceRange: 0,
  })

  useEffect(() => {
    // Fetch listing count
    fetch('/api/listings')
      .then(r => r.json())
      .then(d => setListingCount(d.listings?.length || 0))
      .catch(() => setListingCount(0))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button onClick={() => setMenuOpen(true)} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
              <Link href="/sell" className="text-sm font-semibold text-gray-700 hover:text-emerald-600">
                Sell
              </Link>
            </div>

            {/* Center - Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <img src="/logo.png" alt="CaterTrades" className="h-8" />
            </Link>

            {/* Right */}
            <div className="flex items-center gap-3">
              <Link href="/saved" className="p-2 hover:bg-gray-100 rounded-lg">
                <Heart className="w-5 h-5 text-gray-700" />
              </Link>
              <Link href="/search" className="p-2 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5 text-gray-700" />
              </Link>
              <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-5 h-5 text-gray-700" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMenuOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMenuOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-2">
              <Link href="/" className="block py-3 px-4 rounded-lg hover:bg-gray-100 font-medium">Browse Vehicles</Link>
              <Link href="/sell" className="block py-3 px-4 rounded-lg hover:bg-gray-100 font-medium">Sell Your Vehicle</Link>
              <Link href="/guide" className="block py-3 px-4 rounded-lg hover:bg-gray-100 font-medium">Buyer's Guide</Link>
              <Link href="/account" className="block py-3 px-4 rounded-lg hover:bg-gray-100 font-medium">My Account</Link>
              <hr className="my-4" />
              <Link href="/account/register" className="block py-3 px-4 rounded-lg bg-emerald-500 text-white text-center font-semibold">
                Create Account
              </Link>
              <Link href="/account/login" className="block py-3 px-4 rounded-lg border border-gray-200 text-center font-medium">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-14">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1600&q=80)',
            height: '420px',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-10 pb-8 text-center" style={{ minHeight: '340px' }}>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Find your <span className="text-emerald-400">perfect</span> catering vehicle
          </h1>
          <p className="text-white/80 text-base mb-8">
            The UK's specialist marketplace for food trucks, vans & mobile kitchens
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-xl p-5 text-left">
            {/* Location */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter postcode or city"
                  value={filters.location}
                  onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
              </div>
            </div>

            {/* Type & Price */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Type</label>
                <div className="relative">
                  <select
                    value={filters.type}
                    onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base appearance-none bg-white focus:border-emerald-500 outline-none"
                  >
                    {VEHICLE_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Price</label>
                <div className="relative">
                  <select
                    value={filters.priceRange}
                    onChange={e => setFilters(f => ({ ...f, priceRange: Number(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base appearance-none bg-white focus:border-emerald-500 outline-none"
                  >
                    {PRICE_RANGES.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* More Options */}
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="text-emerald-600 text-sm font-semibold mb-4 hover:underline"
            >
              {showMoreFilters ? 'Less options' : 'More options'}
            </button>

            {showMoreFilters && (
              <div className="grid grid-cols-2 gap-3 mb-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Min Year</label>
                  <input type="number" placeholder="2015" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Max Miles</label>
                  <input type="number" placeholder="100,000" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" />
                </div>
              </div>
            )}

            {/* Search Button */}
            <Link
              href={`/browse?location=${filters.location}&type=${filters.type}&price=${filters.priceRange}`}
              className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white text-center py-4 rounded-xl font-bold text-base transition-colors"
            >
              <Search className="inline w-5 h-5 mr-2 -mt-0.5" />
              Search {listingCount > 0 ? `${listingCount} vehicles` : 'vehicles'}
            </Link>
          </div>
        </div>
      </section>

      {/* Sign In / Create Account */}
      <section className="max-w-3xl mx-auto px-4 py-6 mt-4">
        <Link href="/account" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <span className="font-semibold text-gray-900">Sign in or create an account</span>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90" />
        </Link>
      </section>

      {/* Quick Actions */}
      <section className="max-w-3xl mx-auto px-4 py-4 space-y-3">
        <Link href="/sell" className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚐</div>
            <div>
              <div className="font-semibold text-gray-900">Sell your vehicle</div>
              <div className="text-sm text-gray-500">Free to list • Reach buyers across the UK</div>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90" />
        </Link>

        <Link href="/guide" className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📖</div>
            <div>
              <div className="font-semibold text-gray-900">First-time buyer's guide</div>
              <div className="text-sm text-gray-500">Everything you need to know before buying</div>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90" />
        </Link>

        <Link href="/browse" className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔍</div>
            <div>
              <div className="font-semibold text-gray-900">Browse all vehicles</div>
              <div className="text-sm text-gray-500">View our full inventory with photos</div>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90" />
        </Link>
      </section>

      {/* Why CaterTrades */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Why CaterTrades?</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold text-sm text-gray-900">Verified Sellers</div>
            <div className="text-xs text-gray-500 mt-1">Every listing reviewed</div>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🆓</div>
            <div className="font-semibold text-sm text-gray-900">Free to List</div>
            <div className="text-xs text-gray-500 mt-1">No fees, no commission</div>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🇬🇧</div>
            <div className="font-semibold text-sm text-gray-900">UK Specialist</div>
            <div className="text-xs text-gray-500 mt-1">Catering vehicles only</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="CaterTrades" className="h-8 brightness-0 invert" />
          </div>
          <div className="flex justify-center gap-6 text-sm text-gray-400 mb-6">
            <Link href="/browse" className="hover:text-white">Browse</Link>
            <Link href="/sell" className="hover:text-white">Sell</Link>
            <Link href="/guide" className="hover:text-white">Guide</Link>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
          <p className="text-center text-xs text-gray-500">
            © 2026 CaterTrades. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
