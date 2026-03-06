'use client'
import { useState } from 'react'

export default function BuyPage() {
  const [form, setForm] = useState({
    vehicle_type: '', budget_min: '', budget_max: '',
    location: '', requirements: '', name: '', email: '', phone: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/buyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch {
      alert('Error — please try again or call 0203 627 7275')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
      <div>
        <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Enquiry received</h1>
        <p style={{ color: '#888', fontSize: 16, maxWidth: 420, margin: '0 auto 32px', lineHeight: 1.7 }}>
          We'll match your requirements against our current and incoming listings and be in touch within 48 hours.
        </p>
        <a href="/" style={{ background: '#f59e0b', color: '#000', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>Back to home</a>
      </div>
    </main>
  )

  const input = (label: string, key: string, placeholder: string, type = 'text') => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>{label}</label>
      <input type={type} value={(form as any)[key]} placeholder={placeholder}
        onChange={e => update(key, e.target.value)} required
        style={{ width: '100%', padding: '12px 14px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, color: '#fff', fontSize: 15 }} />
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '60px 20px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <a href="/" style={{ color: '#666', fontSize: 13, textDecoration: 'none', display: 'block', marginBottom: 32 }}>← Back</a>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Find your vehicle</h1>
        <p style={{ color: '#888', marginBottom: 40, lineHeight: 1.7 }}>
          Tell us what you're looking for. We match you to available vehicles and handle the introduction. No cost to buyers.
        </p>

        {/* Featured listing callout */}
        <div style={{ background: '#111', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 10, padding: 20, marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#f59e0b', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Available now</div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Renault Master Truck — £42,000 ono</div>
          <div style={{ fontSize: 13, color: '#888' }}>Fully equipped catering van · 88k miles · Fresh MOT · Epping, Essex</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>Vehicle type</label>
            <select value={form.vehicle_type} onChange={e => update('vehicle_type', e.target.value)} required
              style={{ width: '100%', padding: '12px 14px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, color: form.vehicle_type ? '#fff' : '#555', fontSize: 15 }}>
              <option value="">What are you looking for?</option>
              <option>Food truck / catering van (fully equipped)</option>
              <option>Blank / conversion base vehicle</option>
              <option>Mobile bar unit</option>
              <option>Ice cream / dessert van</option>
              <option>Coffee van</option>
              <option>Other commercial vehicle</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>{input('Budget min (£)', 'budget_min', '20000')}</div>
            <div>{input('Budget max (£)', 'budget_max', '50000')}</div>
          </div>

          {input('Preferred location / radius', 'location', 'e.g. London, or anywhere UK')}

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>Requirements / must-haves</label>
            <textarea value={form.requirements} placeholder="e.g. Must have LPG setup, 3-phase power, under 100k miles, MOT valid..." rows={3}
              onChange={e => update('requirements', e.target.value)}
              style={{ width: '100%', padding: '12px 14px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, color: '#fff', fontSize: 15, resize: 'vertical' }} />
          </div>

          <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Your details</h3>
            {input('Name', 'name', 'Your name')}
            {input('Email', 'email', 'you@email.com', 'email')}
            {input('Phone', 'phone', '+44 7xxx xxxxxx', 'tel')}
          </div>

          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px', background: loading ? '#d97706' : '#f59e0b', color: '#000', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: loading ? 'wait' : 'pointer' }}>
            {loading ? 'Submitting...' : 'Submit enquiry — free →'}
          </button>
          <p style={{ fontSize: 12, color: '#444', textAlign: 'center', marginTop: 12 }}>Free for buyers · We match you within 48 hours</p>
        </form>
      </div>
    </main>
  )
}
