'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GuidePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/guide-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      if (res.ok) {
        setSubmitted(true)
        // Trigger download
        window.location.href = '/downloads/CaterTrades-Buyers-Guide-2026.pdf'
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const chapters = [
    { num: '01', title: 'Before You Start Trading', desc: 'Complete checklist with timeline and costs' },
    { num: '02', title: 'Food Business Registration', desc: 'Free registration process explained' },
    { num: '03', title: 'Food Hygiene Certificate', desc: 'Where to get certified for £10–25' },
    { num: '04', title: 'Food Safety Management', desc: 'Free SFBB pack from the FSA' },
    { num: '05', title: 'Gas Safety Certificate', desc: 'CP44 requirements and how to find engineers' },
    { num: '06', title: 'Street Trading Licence', desc: 'Council rules and alternatives' },
    { num: '07', title: 'Insurance Requirements', desc: 'What you need and where to get it' },
    { num: '08', title: 'Finding Pitch Locations', desc: 'Industrial estates, pubs, private land' },
    { num: '09', title: 'Events & Festivals', desc: 'Where to find them and how to apply' },
    { num: '10', title: 'Useful Resources', desc: 'Official links, apps, and communities' },
  ]

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <img src="/logo.png" alt="CaterTrades" className="h-10" />
          </Link>
          <Link href="/browse" className="text-sm text-gray-600 hover:text-gray-900">
            Browse Vehicles →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                FREE GUIDE • 2026 EDITION
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                The Complete Buyer&apos;s Guide to Catering Vehicles
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Everything you need to know after purchasing your first food van — from registration to trading. 
                <strong className="text-white"> Save hours of research</strong> with our comprehensive guide.
              </p>

              <ul className="space-y-3 mb-8">
                {['10 chapters covering all requirements', 'Costs and timelines for each step', 'Provider recommendations', 'Quick reference card for your van'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-xs">✓</span>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Download Free Guide
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Enter your email to get instant access to the PDF
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                        required
                      />
                    </div>
                    
                    {error && (
                      <p className="text-red-600 text-sm">{error}</p>
                    )}
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Download Free Guide →'}
                    </button>
                  </form>
                  
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    We&apos;ll occasionally send you updates about new vans and tips. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Download Started!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your PDF should download automatically. If not, click below.
                  </p>
                  <a
                    href="/downloads/CaterTrades-Buyers-Guide-2026.pdf"
                    className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s Inside</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              10 comprehensive chapters covering everything from legal requirements to finding your first pitch
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {chapters.map((chapter) => (
              <div key={chapter.num} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold shrink-0">
                    {chapter.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{chapter.title}</h3>
                    <p className="text-sm text-gray-600">{chapter.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="text-2xl">⭐</span>
            ))}
          </div>
          <blockquote className="text-xl text-gray-700 italic mb-4">
            &quot;This guide saved me weeks of research. Everything I needed to know about getting started was in one place.&quot;
          </blockquote>
          <p className="text-gray-500">— First-time van owner, Birmingham</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Van?</h2>
          <p className="text-gray-300 mb-8">
            Browse verified catering vehicles from trusted sellers across the UK
          </p>
          <Link
            href="/browse"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg transition-colors"
          >
            Browse Vehicles →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 text-center text-sm text-gray-500">
        <p>© 2026 CaterTrades. All rights reserved.</p>
        <p className="mt-2">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          {' · '}
          <Link href="/browse" className="hover:text-gray-900">Browse</Link>
          {' · '}
          <Link href="/list" className="hover:text-gray-900">List Your Vehicle</Link>
        </p>
      </footer>
    </main>
  )
}
