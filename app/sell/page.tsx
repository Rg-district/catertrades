'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SellPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', make: '', model: '', year: '', asking_price: '', location: '', condition: '', description: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/seller', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
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
        <Link href="/" style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.5px', textDecoration: 'none', color: '#111' }}>
          <span style={{ color: '#f59e0b' }}>Cater</span>Trades
        </Link>
        <Link href="/" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Back to listings</Link>
      </nav>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '48px 20px' }}>
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Listing received</h2>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.7 }}>We'll review your vehicle and get back to you within 24 hours.</p>
            <Link href="/" style={{ display: 'inline-block', marginTop: 28, background: '#111', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Back to listings</Link>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>List your vehicle</h1>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>No upfront fees. We match you with serious buyers. 2–5% commission on completion only.</p>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>Your details</div>
                {[
                  { name: 'name', label: 'Full name', placeholder: 'Jane Smith', type: 'text' },
                  { name: 'email', label: 'Email address', placeholder: 'jane@example.com', type: 'email' },
                  { name: 'phone', label: 'Phone number', placeholder: '+44 7700 900000', type: 'tel' },
                ].map(f => (
                  <div key={f.name}>
                    <label style={labelStyle}>{f.label}</label>
                    <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name as keyof typeof form]} onChange={handle} required style={inputStyle} />
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>Vehicle details</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[
                    { name: 'make', label: 'Make', placeholder: 'Renault' },
                    { name: 'model', label: 'Model', placeholder: 'Master' },
                    { name: 'year', label: 'Year', placeholder: '2017' },
                    { name: 'asking_price', label: 'Asking price (£)', placeholder: '42000' },
                    { name: 'location', label: 'Location', placeholder: 'Epping, Essex' },
                  ].map(f => (
                    <div key={f.name} style={f.name === 'location' ? { gridColumn: 'span 2' } : {}}>
                      <label style={labelStyle}>{f.label}</label>
                      <input name={f.name} type="text" placeholder={f.placeholder} value={form[f.name as keyof typeof form]} onChange={handle} required style={inputStyle} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={labelStyle}>Condition</label>
                  <select name="condition" value={form.condition} onChange={handle} required style={inputStyle}>
                    <option value="">Select condition</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Description / equipment</label>
                  <textarea name="description" placeholder="Describe the build, equipment, and any key features..." value={form.description} onChange={handle} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              </div>

              <button type="submit" disabled={status === 'loading'} style={{
                background: status === 'loading' ? '#888' : '#111', color: '#fff',
                padding: '14px 24px', borderRadius: 10, fontWeight: 700, fontSize: 15,
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {status === 'loading' ? 'Submitting...' : 'Submit listing →'}
              </button>
              {status === 'error' && <p style={{ color: '#e53e3e', fontSize: 13, textAlign: 'center' }}>Something went wrong. Please try again.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
