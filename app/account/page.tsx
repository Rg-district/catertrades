'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Truck, Mail, Phone, Building, ChevronRight, Check } from 'lucide-react'

type AccountType = 'buyer' | 'seller' | null

export default function AccountPage() {
  const [step, setStep] = useState<'choose' | 'buyer' | 'seller' | 'success'>('choose')
  const [accountType, setAccountType] = useState<AccountType>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: 'individual', // 'individual' or 'trade'
    businessName: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/account/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          accountType: accountType,
        }),
      })

      if (res.ok) {
        setStep('success')
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold text-lg ml-2">
            {step === 'choose' && 'Create Account'}
            {step === 'buyer' && 'Buyer Account'}
            {step === 'seller' && 'Seller Account'}
            {step === 'success' && 'Success'}
          </h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8">
        {/* Step 1: Choose Account Type */}
        {step === 'choose' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Join CaterTrades</h2>
              <p className="text-gray-500">What would you like to do?</p>
            </div>

            <button
              onClick={() => { setAccountType('buyer'); setStep('buyer'); }}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-emerald-500 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <User className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">I'm looking to buy</h3>
                  <p className="text-gray-500 text-sm">Browse vehicles, save favorites, and contact sellers directly</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-4" />
              </div>
            </button>

            <button
              onClick={() => { setAccountType('seller'); setStep('seller'); }}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 text-left hover:border-emerald-500 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <Truck className="w-7 h-7 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">I want to sell</h3>
                  <p className="text-gray-500 text-sm">List your catering vehicle for free and reach buyers across the UK</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-4" />
              </div>
            </button>

            <div className="text-center pt-4">
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <Link href="/account/login" className="text-emerald-600 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Buyer Registration */}
        {step === 'buyer' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Create Buyer Account</h2>
              <p className="text-gray-500 text-sm mt-1">Save vehicles and contact sellers</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">We'll send a verification link to this email</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-bold text-base transition-colors"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <button
              type="button"
              onClick={() => { setStep('choose'); setAccountType(null); }}
              className="w-full text-gray-500 py-2 text-sm hover:text-gray-700"
            >
              ← Back to options
            </button>
          </form>
        )}

        {/* Step 2: Seller Registration */}
        {step === 'seller' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Create Seller Account</h2>
              <p className="text-gray-500 text-sm mt-1">List your vehicles for free</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                />
              </div>

              {/* Individual or Trade */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Seller Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, businessType: 'individual' }))}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      form.businessType === 'individual'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <User className={`w-5 h-5 mb-2 ${form.businessType === 'individual' ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <div className="font-semibold text-sm">Individual</div>
                    <div className="text-xs text-gray-500">Private seller</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, businessType: 'trade' }))}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      form.businessType === 'trade'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building className={`w-5 h-5 mb-2 ${form.businessType === 'trade' ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <div className="font-semibold text-sm">Trade</div>
                    <div className="text-xs text-gray-500">Business seller</div>
                  </button>
                </div>
              </div>

              {form.businessType === 'trade' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Name</label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                    placeholder="Your Company Ltd"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+44 7700 900000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5">Buyers will contact you on this number</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-bold text-base transition-colors"
            >
              {loading ? 'Creating account...' : 'Create Seller Account'}
            </button>

            <button
              type="button"
              onClick={() => { setStep('choose'); setAccountType(null); }}
              className="w-full text-gray-500 py-2 text-sm hover:text-gray-700"
            >
              ← Back to options
            </button>
          </form>
        )}

        {/* Success */}
        {step === 'success' && (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Check your email</h2>
            <p className="text-gray-500 mb-8">
              We've sent a verification link to<br />
              <strong className="text-gray-900">{form.email}</strong>
            </p>
            <Link
              href="/"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
