// import Stripe from "stripe" // Reserved for future monetisation

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

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', border: '1.5px solid #e8e8e8',
    borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none',
    background: '#fff', color: '#111', transition: 'border-color 0.15s',
  }
  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6, display: 'block' }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 28px', height: 58, background: '#fff', borderBottom: '1px solid #ebebeb' }}>
        <Link href="/">
          <img src="/logo.png" alt="CaterTrades" style={{ height: 36 }} />
        </Link>
        <Link href="/" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Back to listings</Link>
      </nav>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '48px 20px' }}>
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Listing submitted</h2>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.7 }}>Your listing has been submitted. We will review it within 24 hours.</p>
            <Link href="/" style={{ display: 'inline-block', marginTop: 28, background: '#111', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Back to listings</Link>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>List your vehicle</h1>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>Free to list. Free to browse. Reach serious buyers across the UK.</p>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Vehicle details */}
              <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>Vehicle details</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Make</label>
                    <input name="make" type="text" placeholder="Renault" value={form.make} onChange={handle} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Model</label>
                    <input name="model" type="text" placeholder="Master" value={form.model} onChange={handle} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Year</label>
                    <input name="year" type="number" placeholder="2017" value={form.year} onChange={handle} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Mileage</label>
                    <input name="miles" type="number" placeholder="88000" value={form.miles} onChange={handle} required style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Asking Price (£)</label>
                  <input name="price" type="number" placeholder="42000" value={form.price} onChange={handle} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Location</label>
                  <input name="location" type="text" placeholder="Epping, Essex" value={form.location} onChange={handle} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea name="description" placeholder="Describe the build, equipment, condition, and any key features..." value={form.description} onChange={handle} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              </div>

              {/* Equipment tags */}
              <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 14 }}>Equipment</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {EQUIPMENT_TAGS.map(tag => (
                    <label key={tag} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 13, color: tags.includes(tag) ? '#111' : '#888',
                      background: tags.includes(tag) ? '#fef3c7' : '#f5f5f5',
                      border: `1.5px solid ${tags.includes(tag) ? '#f59e0b' : '#e8e8e8'}`,
                      padding: '7px 14px', borderRadius: 100, cursor: 'pointer',
                      fontWeight: 500, transition: 'all 0.15s',
                    }}>
                      <input
                        type="checkbox"
                        checked={tags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        style={{ display: 'none' }}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>

              {/* Seller contact */}
              <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>Your contact details</div>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input name="seller_name" type="text" placeholder="Jane Smith" value={form.seller_name} onChange={handle} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input name="seller_email" type="email" placeholder="jane@example.com" value={form.seller_email} onChange={handle} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input name="seller_phone" type="tel" placeholder="+44 7700 900000" value={form.seller_phone} onChange={handle} required style={inputStyle} />
                </div>
              </div>

              <button type="submit" disabled={status === 'loading'} style={{
                background: status === 'loading' ? '#888' : '#111', color: '#fff',
                padding: '14px 24px', borderRadius: 10, fontWeight: 700, fontSize: 15,
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {status === 'loading' ? 'Submitting...' : 'Submit Listing (Free)'}
              </button>
              {status === 'error' && <p style={{ color: '#e53e3e', fontSize: 13, textAlign: 'center' }}>Something went wrong. Please try again.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
