'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { type Listing } from '@/lib/listings'

const Map = dynamic(() => import('./components/Map'), { ssr: false })

const VEHICLE_TYPES = ['All', 'Van', 'Truck', 'Trailer', 'Cart']
const BUDGETS = [
  { label: 'Any budget', min: 0, max: Infinity },
  { label: 'Under £30k', min: 0, max: 30000 },
  { label: '£30k – £60k', min: 30000, max: 60000 },
  { label: '£60k+', min: 60000, max: Infinity },
]
const LOCATIONS = ['Anywhere', 'London', 'Manchester', 'Birmingham', 'Bristol', 'Essex']
const SORT_OPTIONS = ['Recently listed', 'Price: Low–High', 'Price: High–Low']

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([])
  const [activeListing, setActiveListing] = useState<Listing | null>(null)
  const [vehicleType, setVehicleType] = useState('All')
  const [budget, setBudget] = useState(0)
  const [location, setLocation] = useState('Anywhere')
  const [sort, setSort] = useState('Recently listed')
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function fetchListings() {
      try {
        const params = new URLSearchParams()
        if (location !== 'Anywhere') params.set('location', location)
        const budgetObj = BUDGETS[budget]
        if (budgetObj.min > 0) params.set('min_price', String(budgetObj.min))
        if (budgetObj.max < Infinity) params.set('max_price', String(budgetObj.max))
        if (vehicleType !== 'All') params.set('vehicle_type', vehicleType)

        const res = await fetch(`/api/listings?${params.toString()}`)
        const data = await res.json()
        const fetched: Listing[] = (data.listings || []).map((l: Record<string, unknown>) => ({
          ...l,
          priceLabel: l.price_label as string,
          tags: (l.tags as string[]) || [],
        }))
        setListings(fetched)
        if (fetched.length > 0 && !activeListing) setActiveListing(fetched[0])
      } catch (e) {
        console.error('Failed to fetch listings:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleType, budget, location])

  const filtered = useMemo(() => {
    let result = [...listings]
    if (sort === 'Price: Low–High') result.sort((a, b) => a.price - b.price)
    if (sort === 'Price: High–Low') result.sort((a, b) => b.price - a.price)
    result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    return result
  }, [listings, sort])

  const selectStyle: React.CSSProperties = {
    border: 'none', outline: 'none', fontSize: 13, fontWeight: 600,
    color: '#111', background: 'transparent', width: '100%',
    cursor: 'pointer', fontFamily: 'inherit',
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">

      {/* Nav - Desktop */}
      <nav className="hidden md:flex items-center justify-between px-7 h-14 bg-white border-b border-gray-200 shrink-0 gap-6">
        <a href="/" className="shrink-0">
          <img src="/logo.png" alt="CaterTrades" className="h-9" />
        </a>

        {/* Filters - Desktop */}
        <div className="flex flex-1 max-w-xl bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
          {[
            { label: 'Type', value: vehicleType, onChange: setVehicleType, options: VEHICLE_TYPES },
            { label: 'Budget', value: budget, onChange: (v: string) => setBudget(Number(v)), options: BUDGETS.map((b, i) => ({ label: b.label, value: i })) },
            { label: 'Location', value: location, onChange: setLocation, options: LOCATIONS },
          ].map((f, i, arr) => (
            <div key={f.label} className={`flex-1 px-3 py-2 ${i < arr.length - 1 ? 'border-r border-gray-200' : ''}`}>
              <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">{f.label}</div>
              <select
                value={f.value}
                onChange={e => f.onChange(e.target.value)}
                style={selectStyle}
              >
                {Array.isArray(f.options) && f.options.map((opt: string | { label: string; value: number }) =>
                  typeof opt === 'string'
                    ? <option key={opt}>{opt}</option>
                    : <option key={opt.value} value={opt.value}>{opt.label}</option>
                )}
              </select>
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-center shrink-0">
          <Link href="/sell" className="text-gray-500 text-sm font-medium hover:text-gray-900">Sell</Link>
          <Link href="/guide" className="text-gray-500 text-sm font-medium hover:text-gray-900">Guide</Link>
          <Link href="/sell" className="bg-gray-900 text-white px-5 py-2 rounded-lg font-bold text-sm">
            + List a Vehicle
          </Link>
        </div>
      </nav>

      {/* Nav - Mobile */}
      <nav className="md:hidden bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-between px-4 h-14">
          <a href="/">
            <img src="/logo.png" alt="CaterTrades" className="h-8" />
          </a>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium"
            >
              <span>Filters</span>
              <span className="text-xs">{showFilters ? '▲' : '▼'}</span>
            </button>
            <Link href="/sell" className="bg-gray-900 text-white px-4 py-1.5 rounded-lg font-bold text-sm">
              + List
            </Link>
          </div>
        </div>

        {/* Mobile Filters Dropdown */}
        {showFilters && (
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50 space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Type</label>
              <select
                value={vehicleType}
                onChange={e => setVehicleType(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg bg-white text-sm font-medium"
              >
                {VEHICLE_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Budget</label>
              <select
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full p-2.5 border border-gray-200 rounded-lg bg-white text-sm font-medium"
              >
                {BUDGETS.map((b, i) => <option key={i} value={i}>{b.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Location</label>
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full p-2.5 border border-gray-200 rounded-lg bg-white text-sm font-medium"
              >
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        )}
      </nav>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Feed - Full width on mobile, fixed width on desktop */}
        <div className="w-full md:w-[400px] md:shrink-0 overflow-y-auto border-r border-gray-200 bg-white">
          {/* List free CTA */}
          <Link href="/sell" className="flex items-center justify-between px-4 py-3 bg-amber-100 border-b border-amber-200 text-amber-800 text-sm font-bold">
            <span>List your vehicle free →</span>
            <span className="text-xs font-medium text-amber-700">No fees</span>
          </Link>

          {/* Feed header */}
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div className="text-base font-extrabold tracking-tight">
              {loading ? 'Loading...' : `${filtered.length} vehicle${filtered.length !== 1 ? 's' : ''} available`}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              UK · {vehicleType === 'All' ? 'All types' : vehicleType} · {BUDGETS[budget].label}
            </div>
            {/* Sort pills */}
            <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1 -mx-4 px-4">
              {SORT_OPTIONS.map(s => (
                <button key={s} onClick={() => setSort(s)} className={`
                  px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                  border transition-colors shrink-0
                  ${sort === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}
                `}>{s}</button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="p-2.5">
            {loading ? (
              <div className="py-10 text-center text-gray-400 text-sm">
                Loading vehicles...
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-5xl mb-4">🚐</div>
                <div className="text-lg font-bold text-gray-900 mb-2">No vehicles listed yet</div>
                <p className="text-gray-500 text-sm mb-5">Be the first to list your catering vehicle!</p>
                <Link href="/sell" className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold text-sm">
                  List Your Vehicle — Free
                </Link>
              </div>
            ) : filtered.map(listing => (
              <Link key={listing.id} href={`/listings/${listing.id}`} className="block mb-2">
                <div
                  onClick={(e) => { e.preventDefault(); setActiveListing(listing) }}
                  className={`
                    flex bg-white rounded-xl overflow-hidden cursor-pointer transition-all
                    border-2 ${activeListing?.id === listing.id ? 'border-amber-400 shadow-md' : 'border-gray-100'}
                  `}
                >
                  {/* Image */}
                  <div className="w-24 md:w-28 shrink-0 bg-gray-100 flex items-center justify-center text-3xl relative">
                    🚐
                    {listing.featured && (
                      <div className="absolute top-2 left-2 bg-amber-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                        Featured
                      </div>
                    )}
                  </div>
                  {/* Body */}
                  <div className="p-3 flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900 truncate mb-1">
                      {listing.title}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                      📍 {listing.location} · {(listing.miles / 1000).toFixed(0)}k mi · {listing.year}
                    </div>
                    <div className="text-lg font-extrabold tracking-tight text-gray-900">
                      {listing.priceLabel || listing.price_label}
                      <span className="text-xs text-gray-300 font-normal ml-1">ono</span>
                    </div>
                    <div className="flex gap-1 flex-wrap mt-2">
                      {listing.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Sell CTA at bottom */}
            <div className="my-2 bg-gray-900 rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-white">Got a vehicle to sell?</div>
                <div className="text-xs text-gray-500 mt-1">Free to list. Reach buyers across the UK.</div>
              </div>
              <Link href="/sell" className="bg-amber-500 text-black px-4 py-2 rounded-lg font-bold text-xs whitespace-nowrap">
                List yours →
              </Link>
            </div>
          </div>
        </div>

        {/* Map + detail - Hidden on mobile */}
        <div className="hidden md:block flex-1 relative overflow-hidden">
          <Map listings={filtered} activeListing={activeListing} onSelect={setActiveListing} />

          {/* Detail card */}
          {activeListing && (
            <div className="absolute bottom-6 right-6 w-72 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl z-50">
              <div className="h-32 bg-gray-100 flex items-center justify-center text-5xl relative">
                🚐
                {activeListing.featured && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-black text-[9px] font-bold px-2.5 py-1 rounded uppercase tracking-wide">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-sm font-bold text-gray-900 mb-0.5">{activeListing.title}</div>
                <div className="text-xs text-gray-400 mb-2">
                  📍 {activeListing.location} · {(activeListing.miles / 1000).toFixed(0)}k mi · {activeListing.year}
                </div>
                <div className="text-xl font-extrabold tracking-tight text-gray-900 mb-3">
                  {activeListing.priceLabel || activeListing.price_label}
                  <span className="text-xs text-gray-300 font-normal ml-1">ono</span>
                </div>
                <Link href={`/listings/${activeListing.id}`} className="block bg-gray-900 text-white text-center py-2.5 rounded-lg font-bold text-sm">
                  Enquire about this vehicle →
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
