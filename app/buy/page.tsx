'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BuyPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', vehicle_type: '', budget_min: '', budget_max: '', location: '', requirements: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/buyer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', border: '1.5px solid #e8e8e8',
    borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none',
    background: '#fff', color: '#111',
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
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Enquiry received</h2>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.7 }}>We'll match you with suitable vehicles and be in touch within 48 hours.</p>
            <Link href="/" style={{ display: 'inline-block', marginTop: 28, background: '#111', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Back to listings</Link>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>Find your vehicle</h1>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>Tell us what you're looking for and we'll match you with the right vehicle.</p>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>Your details</div>
                {[
                  { name: 'name', label: 'Full name', placeholder: 'John Smith', type: 'text' },
                  { name: 'email', label: 'Email address', placeholder: 'john@example.com', type: 'email' },
                  { name: 'phone', label: 'Phone number', placeholder: '+44 7700 900000', type: 'tel' },
                ].map(f => (
                  <div key={f.name}>
                    <label style={labelStyle}>{f.label}</label>
                    <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name as keyof typeof form]} onChange={handle} required style={inputStyle} />
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>What are you looking for?</div>
                <div>
                  <label style={labelStyle}>Vehicle type</label>
                  <select name="vehicle_type" value={form.vehicle_type} onChange={handle} required style={inputStyle}>
                    <option value="">Select type</option>
                    <option>Catering Van</option>
                    <option>Food Truck</option>
                    <option>Trailer</option>
                    <option>Mobile Kitchen</option>
                    <option>Any</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Min budget (£)</label>
                    <input name="budget_min" type="number" placeholder="20000" value={form.budget_min} onChange={handle} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Max budget (£)</label>
                    <input name="budget_max" type="number" placeholder="60000" value={form.budget_max} onChange={handle} required style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Preferred location</label>
                  <input name="location" type="text" placeholder="e.g. London, or anywhere in UK" value={form.location} onChange={handle} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Requirements / notes</label>
                  <textarea name="requirements" placeholder="Any specific equipment, size requirements, use case..." value={form.requirements} onChange={handle} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              </div>

              <button type="submit" disabled={status === 'loading'} style={{
                background: status === 'loading' ? '#888' : '#111', color: '#fff',
                padding: '14px 24px', borderRadius: 10, fontWeight: 700, fontSize: 15,
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {status === 'loading' ? 'Submitting...' : 'Submit enquiry →'}
              </button>
              {status === 'error' && <p style={{ color: '#e53e3e', fontSize: 13, textAlign: 'center' }}>Something went wrong. Please try again.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
