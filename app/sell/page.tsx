'use client'
import { useState } from 'react'

export default function SellPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    // Step 1 — vehicle
    make: '', model: '', year: '', mileage: '', reg: '', asking_price: '',
    location: '', condition: '',
    // Step 2 — equipment
    catering_equipment: '', power_setup: '', cold_storage: '', extras: '',
    // Step 3 — contact
    name: '', email: '', phone: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch {
      alert('Error submitting — please try again or call 0203 627 7275')
    } finally {
      setLoading(false)
    }
  }

  const input = (label: string, key: string, placeholder: string, type = 'text') => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>{label}</label>
      <input
        type={type} value={(form as any)[key]} placeholder={placeholder}
        onChange={e => update(key, e.target.value)}
        style={{ width: '100%', padding: '12px 14px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, color: '#fff', fontSize: 15 }}
      />
    </div>
  )

  const textarea = (label: string, key: string, placeholder: string) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>{label}</label>
      <textarea
        value={(form as any)[key]} placeholder={placeholder} rows={3}
        onChange={e => update(key, e.target.value)}
        style={{ width: '100%', padding: '12px 14px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, color: '#fff', fontSize: 15, resize: 'vertical' }}
      />
    </div>
  )

  if (submitted) return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
      <div>
        <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Listing received</h1>
        <p style={{ color: '#888', fontSize: 16, maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.7 }}>
          We'll review your vehicle details and be in touch within 24 hours. If you have photos ready, email them to <span style={{ color: '#f59e0b' }}>alex@arkaihq.com</span>
        </p>
        <a href="/" style={{ background: '#f59e0b', color: '#000', padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>Back to home</a>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '60px 20px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <a href="/" style={{ color: '#666', fontSize: 13, textDecoration: 'none', display: 'block', marginBottom: 32 }}>← Back</a>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>List your vehicle</h1>
        <p style={{ color: '#888', marginBottom: 40 }}>Commission on sale only (2–5%). No upfront fees.</p>

        {/* Steps */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
          {['Vehicle', 'Equipment', 'Contact'].map((s, i) => (
            <div key={s} onClick={() => i + 1 < step && setStep(i + 1)}
              style={{ flex: 1, height: 4, borderRadius: 2, background: step > i ? '#f59e0b' : '#1e1e1e', cursor: i + 1 < step ? 'pointer' : 'default' }} />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Vehicle details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>{input('Make', 'make', 'e.g. Renault')}</div>
                <div>{input('Model', 'model', 'e.g. Master Truck')}</div>
                <div>{input('Year', 'year', 'e.g. 2017')}</div>
                <div>{input('Mileage', 'mileage', 'e.g. 88,000')}</div>
                <div>{input('Registration', 'reg', 'e.g. PO17 BKX')}</div>
                <div>{input('Asking price (£)', 'asking_price', 'e.g. 42000')}</div>
              </div>
              {input('Location', 'location', 'e.g. Epping, Essex')}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#888', marginBottom: 6 }}>Condition</label>
                <select value={form.condition} onChange={e => update('condition', e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                  <option value="">Select condition</option>
                  <option>Excellent — trade-ready</option>
                  <option>Good — minor wear</option>
                  <option>Fair — needs some work</option>
                  <option>Project vehicle</option>
                </select>
              </div>
              <button type="button" onClick={() => setStep(2)}
                style={{ width: '100%', padding: '14px', background: '#f59e0b', color: '#000', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
                Next: Equipment →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Equipment & fit-out</h2>
              {textarea('Catering equipment', 'catering_equipment', 'e.g. Parry 4-pot bain marie, 4-hob stove, LPG griddle, LPG oven, 2-bowl sink...')}
              {textarea('Power setup', 'power_setup', 'e.g. Ring 3000W inverter, 2×195Ah batteries, shore power connection...')}
              {textarea('Cold storage', 'cold_storage', 'e.g. Kenwood fridge + freezer, or none')}
              {textarea('Extras / AV / other', 'extras', 'e.g. JVC 40" TVs, Sony speaker system, Apple CarPlay, mood lighting...')}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setStep(1)}
                  style={{ flex: 1, padding: '14px', background: '#1e1e1e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
                  ← Back
                </button>
                <button type="button" onClick={() => setStep(3)}
                  style={{ flex: 2, padding: '14px', background: '#f59e0b', color: '#000', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
                  Next: Contact →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Your details</h2>
              {input('Full name', 'name', 'Your name')}
              {input('Email', 'email', 'you@email.com', 'email')}
              {input('Phone', 'phone', '+44 7xxx xxxxxx', 'tel')}
              {textarea('Anything else we should know?', 'notes', 'MOT date, service history, reason for selling, negotiable?')}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setStep(2)}
                  style={{ flex: 1, padding: '14px', background: '#1e1e1e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
                  ← Back
                </button>
                <button type="submit" disabled={loading}
                  style={{ flex: 2, padding: '14px', background: loading ? '#d97706' : '#f59e0b', color: '#000', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: loading ? 'wait' : 'pointer' }}>
                  {loading ? 'Submitting...' : 'Submit listing →'}
                </button>
              </div>
              <p style={{ fontSize: 12, color: '#444', textAlign: 'center', marginTop: 12 }}>
                Commission on sale only. No upfront fees.
              </p>
            </div>
          )}
        </form>
      </div>
    </main>
  )
}
