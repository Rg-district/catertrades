'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Listing {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  price_label: string
  location: string
  miles: number
  tags: string[]
  featured: boolean
  status: string
  description: string
  images: string[]
}

export default function ListingPage() {
  const params = useParams()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ buyer_name: '', buyer_email: '', buyer_phone: '', message: '' })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    async function fetchListing() {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', params.id)
        .single()
      if (!error && data) setListing(data)
      setLoading(false)
    }
    fetchListing()
  }, [params.id])

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')
    try {
      const res = await fetch('/api/buyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, listing_id: params.id }),
      })
      setSubmitStatus(res.ok ? 'success' : 'error')
    } catch {
      setSubmitStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', border: '1.5px solid #e8e8e8',
    borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none',
    background: '#fff', color: '#111', transition: 'border-color 0.15s',
  }
  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6, display: 'block' }

  const statusColor = (s: string) => {
    if (s === 'available') return { bg: '#dcfce7', text: '#166534' }
    if (s === 'under_offer') return { bg: '#fef9c3', text: '#854d0e' }
    return { bg: '#fee2e2', text: '#991b1b' }
  }

  const statusLabel = (s: string) => {
    if (s === 'available') return 'Available'
    if (s === 'under_offer') return 'Under Offer'
    return 'Sold'
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 28px', height: 58, background: '#fff', borderBottom: '1px solid #ebebeb' }}>
          <Link href="/">
            <img src="/logo.png" alt="CaterTrades" style={{ height: 36 }} />
          </Link>
        </nav>
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#aaa', fontSize: 15 }}>Loading...</div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 28px', height: 58, background: '#fff', borderBottom: '1px solid #ebebeb' }}>
          <Link href="/">
            <img src="/logo.png" alt="CaterTrades" style={{ height: 36 }} />
          </Link>
        </nav>
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Listing not found</div>
          <Link href="/" style={{ color: '#f59e0b', fontWeight: 600, textDecoration: 'none' }}>Back to listings</Link>
        </div>
      </div>
    )
  }

  const sc = statusColor(listing.status)

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 28px', height: 58, background: '#fff', borderBottom: '1px solid #ebebeb' }}>
        <Link href="/">
          <img src="/logo.png" alt="CaterTrades" style={{ height: 36 }} />
        </Link>
        <Link href="/" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Back to listings</Link>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px' }}>
        {/* Photo gallery / placeholder */}
        <div style={{
          height: 340, background: '#f5f5f5', borderRadius: 16, marginBottom: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 80, border: '1px solid #ebebeb', overflow: 'hidden', position: 'relative',
        }}>
          {listing.images && listing.images.length > 0 ? (
            <img src={listing.images[0]} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <>🚐</>
          )}
          {listing.featured && (
            <div style={{
              position: 'absolute', top: 16, left: 16,
              background: '#f59e0b', color: '#000', fontSize: 11,
              fontWeight: 800, padding: '5px 12px', borderRadius: 6,
              textTransform: 'uppercase', letterSpacing: 0.8,
            }}>Featured</div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }}>
          {/* Left — details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.8px', margin: 0 }}>{listing.title}</h1>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6,
                background: sc.bg, color: sc.text, whiteSpace: 'nowrap',
              }}>{statusLabel(listing.status)}</span>
            </div>

            <div style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>
              {listing.make} {listing.model} · {listing.year} · {(listing.miles / 1000).toFixed(0)}k miles · {listing.location}
            </div>

            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', color: '#111', marginBottom: 28 }}>
              {listing.price_label} <span style={{ fontSize: 14, color: '#ccc', fontWeight: 400 }}>ono</span>
            </div>

            {listing.description && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Description</div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', margin: 0 }}>{listing.description}</p>
              </div>
            )}

            {listing.tags && listing.tags.length > 0 && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Equipment</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {listing.tags.map((tag: string) => (
                    <span key={tag} style={{
                      fontSize: 12, color: '#555', background: '#f0f0f0',
                      padding: '6px 14px', borderRadius: 100, fontWeight: 500,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — enquiry form */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: 24, height: 'fit-content' }}>
            {submitStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>✅</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Enquiry sent</div>
                <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6 }}>Your enquiry has been sent. We will be in touch shortly.</p>
                <Link href="/" style={{
                  display: 'inline-block', marginTop: 16, background: '#111', color: '#fff',
                  padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none',
                }}>Back to listings</Link>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Enquire about this vehicle</div>
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input name="buyer_name" type="text" placeholder="John Smith" value={form.buyer_name} onChange={handle} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input name="buyer_email" type="email" placeholder="john@example.com" value={form.buyer_email} onChange={handle} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input name="buyer_phone" type="tel" placeholder="+44 7700 900000" value={form.buyer_phone} onChange={handle} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea name="message" placeholder="I'm interested in this vehicle..." value={form.message} onChange={handle} rows={4} required style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  <button type="submit" disabled={submitStatus === 'loading'} style={{
                    background: submitStatus === 'loading' ? '#888' : '#111', color: '#fff',
                    padding: '12px 20px', borderRadius: 9, fontWeight: 700, fontSize: 14,
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    {submitStatus === 'loading' ? 'Sending...' : 'Send enquiry →'}
                  </button>
                  {submitStatus === 'error' && <p style={{ color: '#e53e3e', fontSize: 13, textAlign: 'center', margin: 0 }}>Something went wrong. Please try again.</p>}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
