'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { LISTINGS, type Listing } from '@/lib/listings'

const Map = dynamic(() => import('./components/Map'), { ssr: false })

const VEHICLE_TYPES = ['All', 'Catering Van', 'Food Truck', 'Trailer', 'Mobile Kitchen']
const BUDGETS = [
  { label: 'Any budget', min: 0, max: Infinity },
  { label: 'Under £30k', min: 0, max: 30000 },
  { label: '£30k – £60k', min: 30000, max: 60000 },
  { label: '£60k+', min: 60000, max: Infinity },
]
const LOCATIONS = ['Anywhere', 'London', 'Manchester', 'Birmingham', 'Bristol', 'Essex']
const SORT_OPTIONS = ['Recently listed', 'Price: Low–High', 'Price: High–Low']

export default function Home() {
  const [activeListing, setActiveListing] = useState<Listing | null>(LISTINGS[0])
  const [vehicleType, setVehicleType] = useState('All')
  const [budget, setBudget] = useState(0)
  const [location, setLocation] = useState('Anywhere')
  const [sort, setSort] = useState('Recently listed')

  const filtered = useMemo(() => {
    let result = [...LISTINGS]
    const budgetObj = BUDGETS[budget]

    if (vehicleType !== 'All') {
      // basic filter - expand later with real type field
    }
    result = result.filter(l => l.price >= budgetObj.min && l.price <= budgetObj.max)
    if (location !== 'Anywhere') {
      result = result.filter(l => l.location.includes(location))
    }
    if (sort === 'Price: Low–High') result.sort((a, b) => a.price - b.price)
    if (sort === 'Price: High–Low') result.sort((a, b) => b.price - a.price)
    // Featured always first
    result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

    return result
  }, [vehicleType, budget, location, sort])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#fafafa' }}>

      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', height: 58, background: '#fff',
        borderBottom: '1px solid #ebebeb', flexShrink: 0, gap: 24,
      }}>
        {/* Logo */}
        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.5px', flexShrink: 0 }}>
          <span style={{ color: '#f59e0b' }}>Cater</span>Trades
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex', flex: 1, maxWidth: 600,
          background: '#f5f5f5', border: '1.5px solid #e8e8e8',
          borderRadius: 10, overflow: 'hidden',
        }}>
          {[
            { label: 'Type', el: (
              <select value={vehicleType} onChange={e => setVehicleType(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: '#111', background: 'transparent', width: '100%', cursor: 'pointer', fontFamily: 'inherit' }}>
                {VEHICLE_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            )},
            { label: 'Budget', el: (
              <select value={budget} onChange={e => setBudget(Number(e.target.value))}
                style={{ border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: '#111', background: 'transparent', width: '100%', cursor: 'pointer', fontFamily: 'inherit' }}>
                {BUDGETS.map((b, i) => <option key={i} value={i}>{b.label}</option>)}
              </select>
            )},
            { label: 'Location', el: (
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: '#111', background: 'transparent', width: '100%', cursor: 'pointer', fontFamily: 'inherit' }}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            )},
          ].map((f, i, arr) => (
            <div key={f.label} style={{
              flex: 1, padding: '8px 14px',
              borderRight: i < arr.length - 1 ? '1px solid #e8e8e8' : 'none',
            }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1, color: '#bbb', fontWeight: 700, marginBottom: 2 }}>{f.label}</div>
              {f.el}
            </div>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 }}>
          <Link href="/sell" style={{ color: '#888', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>Sell</Link>
          <Link href="#" style={{ color: '#888', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>How it works</Link>
          <Link href="/sell" style={{
            background: '#111', color: '#fff', padding: '9px 20px',
            borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none',
          }}>+ List a Vehicle</Link>
        </div>
      </nav>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Feed */}
        <div className="feed" style={{
          width: 400, flexShrink: 0, overflowY: 'auto',
          borderRight: '1px solid #ebebeb', background: '#fff',
        }}>
          {/* Feed header */}
          <div style={{
            padding: '16px 16px 12px', borderBottom: '1px solid #f5f5f5',
            position: 'sticky', top: 0, background: '#fff', zIndex: 10,
          }}>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.3px' }}>
              {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} available
            </div>
            <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>
              UK · {vehicleType === 'All' ? 'All types' : vehicleType} · {BUDGETS[budget].label}
            </div>
            {/* Sort pills */}
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {SORT_OPTIONS.map(s => (
                <button key={s} onClick={() => setSort(s)} style={{
                  padding: '5px 12px', borderRadius: 100, fontSize: 11, fontWeight: 600,
                  cursor: 'pointer', border: '1.5px solid',
                  borderColor: sort === s ? '#111' : '#e8e8e8',
                  background: sort === s ? '#111' : 'transparent',
                  color: sort === s ? '#fff' : '#888',
                  fontFamily: 'inherit',
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div style={{ padding: 10 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#aaa', fontSize: 14 }}>
                No vehicles match your filters
              </div>
            ) : filtered.map(listing => (
              <div key={listing.id}
                onClick={() => setActiveListing(listing)}
                style={{
                  display: 'flex', background: '#fff', marginBottom: 8,
                  border: `1.5px solid ${activeListing?.id === listing.id ? '#f59e0b' : '#f0f0f0'}`,
                  borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                  boxShadow: activeListing?.id === listing.id ? '0 0 0 3px rgba(245,158,11,0.12)' : 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}>
                {/* Image */}
                <div style={{
                  width: 110, minWidth: 110, background: '#f8f8f8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 30, position: 'relative', flexShrink: 0,
                }}>
                  🚐
                  {listing.featured && (
                    <div style={{
                      position: 'absolute', top: 8, left: 8,
                      background: '#f59e0b', color: '#000', fontSize: 8,
                      fontWeight: 800, padding: '3px 7px', borderRadius: 4,
                      textTransform: 'uppercase', letterSpacing: 0.8,
                    }}>Featured</div>
                  )}
                </div>
                {/* Body */}
                <div style={{ padding: '12px 14px', flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>
                    {listing.title}
                  </div>
                  <div style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>
                    📍 {listing.location} · {(listing.miles / 1000).toFixed(0)}k miles · {listing.year}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.5px', color: '#111' }}>
                    {listing.priceLabel} <span style={{ fontSize: 11, color: '#ccc', fontWeight: 400 }}>ono</span>
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
                    {listing.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{ fontSize: 10, color: '#888', background: '#f5f5f5', padding: '3px 8px', borderRadius: 4, fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Sell CTA at bottom */}
            <div style={{
              margin: '8px 0 16px', background: '#111', borderRadius: 12,
              padding: '20px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Got a vehicle to sell?</div>
                <div style={{ fontSize: 11, color: '#555', marginTop: 3 }}>No upfront fees. 2–5% on completion.</div>
              </div>
              <Link href="/sell" style={{
                background: '#f59e0b', color: '#000', padding: '9px 16px',
                borderRadius: 8, fontWeight: 700, fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap',
              }}>List yours →</Link>
            </div>
          </div>
        </div>

        {/* Map + detail */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Map listings={filtered} activeListing={activeListing} onSelect={setActiveListing} />

          {/* Detail card */}
          {activeListing && (
            <div style={{
              position: 'absolute', bottom: 24, right: 24, width: 290, zIndex: 1000,
              background: '#fff', border: '1px solid #e8e8e8', borderRadius: 14,
              overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
            }}>
              <div style={{
                height: 130, background: '#f5f5f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 52, position: 'relative',
              }}>
                🚐
                {activeListing.featured && (
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    background: '#f59e0b', color: '#000', fontSize: 9,
                    fontWeight: 800, padding: '4px 10px', borderRadius: 4,
                    textTransform: 'uppercase', letterSpacing: 0.8,
                  }}>Featured</div>
                )}
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 2 }}>{activeListing.title}</div>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 10 }}>
                  📍 {activeListing.location} · {(activeListing.miles / 1000).toFixed(0)}k miles · {activeListing.year}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.8px', color: '#111', marginBottom: 14 }}>
                  {activeListing.priceLabel} <span style={{ fontSize: 12, color: '#ccc', fontWeight: 400 }}>ono</span>
                </div>
                <Link href="/buy" style={{
                  display: 'block', background: '#111', color: '#fff',
                  textAlign: 'center', padding: 12, borderRadius: 9,
                  fontWeight: 700, fontSize: 13, textDecoration: 'none',
                }}>Enquire about this vehicle →</Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
