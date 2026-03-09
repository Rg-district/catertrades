'use client'

import { useState } from 'react'
import Link from 'next/link'

const EQUIPMENT_TAGS = [
  'LPG Kitchen', 'Electric Kitchen', 'Bain Marie', 'Griddle', 'Oven',
  'Fridge', 'Freezer', 'Generator', 'Inverter', 'Extraction',
  'Serving Hatch', 'Smart TV', 'Sound System', 'Water Tank',
]

export default function SellPage() {
  const [form, setForm] = useState({
    make: '', model: '', year: '', miles: '', price: '', location: '', description: '',
    seller_name: '', seller_email: '', seller_phone: '',
  })
  const [tags, setTags] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const toggleTag = (tag: string) =>
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          make: form.make,
          model: form.model,
          year: Number(form.year),
          miles: Number(form.miles),
          price: Number(form.price),
          location: form.location,
          description: form.description,
          tags,
          seller_name: form.seller_name,
          seller_email: form.seller_email,
          seller_phone: form.seller_phone,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Nav */}
      <nav className="flex justify-between items-center px-4 md:px-7 h-14 bg-white border-b border-gray-200 sticky top-0 z-10">
        <Link href="/">
          <img src="/logo.png" alt="CaterTrades" className="h-8 md:h-9" />
        </Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
          ← Back to listings
        </Link>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-8 md:py-12 pb-20">
        {status === 'success' ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-5">✅</div>
            <h2 className="text-2xl font-extrabold mb-3">Listing submitted</h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Your listing has been submitted. We&apos;ll review it within 24 hours.
            </p>
            <Link href="/" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-bold text-sm">
              Back to listings
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">List your vehicle</h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
              Free to list. Free to browse. Reach serious buyers across the UK.
            </p>

            <form onSubmit={submit} className="space-y-5">
              {/* Vehicle details */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                <div className="text-sm font-bold text-gray-900">Vehicle details</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Make</label>
                    <input
                      name="make" type="text" placeholder="Renault"
                      value={form.make} onChange={handle} required
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Model</label>
                    <input
                      name="model" type="text" placeholder="Master"
                      value={form.model} onChange={handle} required
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Year</label>
                    <input
                      name="year" type="number" placeholder="2017"
                      value={form.year} onChange={handle} required
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Mileage</label>
                    <input
                      name="miles" type="number" placeholder="88000"
                      value={form.miles} onChange={handle} required
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Asking Price (£)</label>
                  <input
                    name="price" type="number" placeholder="42000"
                    value={form.price} onChange={handle} required
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Location</label>
                  <input
                    name="location" type="text" placeholder="Epping, Essex"
                    value={form.location} onChange={handle} required
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Description</label>
                  <textarea
                    name="description" placeholder="Describe the build, equipment, condition, and any key features..."
                    value={form.description} onChange={handle} rows={4}
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-y focus:border-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Equipment tags */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-sm font-bold text-gray-900 mb-4">Equipment</div>
                <div className="flex gap-2 flex-wrap">
                  {EQUIPMENT_TAGS.map(tag => (
                    <label
                      key={tag}
                      className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-full cursor-pointer font-medium transition-all border-2
                        ${tags.includes(tag)
                          ? 'bg-amber-50 border-amber-400 text-gray-900'
                          : 'bg-gray-50 border-gray-200 text-gray-500'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={tags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="hidden"
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>

              {/* Seller contact */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                <div className="text-sm font-bold text-gray-900">Your contact details</div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Name</label>
                  <input
                    name="seller_name" type="text" placeholder="Jane Smith"
                    value={form.seller_name} onChange={handle} required
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
                  <input
                    name="seller_email" type="email" placeholder="jane@example.com"
                    value={form.seller_email} onChange={handle} required
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
                  <input
                    name="seller_phone" type="tel" placeholder="+44 7700 900000"
                    value={form.seller_phone} onChange={handle} required
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-4 rounded-xl font-bold text-base transition-colors
                  ${status === 'loading' ? 'bg-gray-400' : 'bg-gray-900 hover:bg-gray-800'}
                  text-white`}
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Listing (Free)'}
              </button>

              {status === 'error' && (
                <p className="text-red-600 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
