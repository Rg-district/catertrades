'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px' }}>
          <span style={{ color: '#f59e0b' }}>Cater</span>Trades
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
          <Link href="/buy" style={{ color: '#aaa', textDecoration: 'none' }}>Buy a Vehicle</Link>
          <Link href="/sell" style={{ color: '#aaa', textDecoration: 'none' }}>Sell Your Vehicle</Link>
          <Link href="/sell" style={{ background: '#f59e0b', color: '#000', padding: '8px 18px', borderRadius: 6, fontWeight: 600, textDecoration: 'none' }}>List Now</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 20px 80px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 20, padding: '6px 16px', fontSize: 12, color: '#f59e0b', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
          UK Commercial Vehicle Brokerage
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 24, maxWidth: 800, margin: '0 auto 24px' }}>
          Buy and sell commercial<br />
          <span style={{ color: '#f59e0b' }}>catering vehicles</span>
        </h1>
        <p style={{ fontSize: 18, color: '#888', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.7 }}>
          The UK's specialist marketplace for food trucks, catering vans, mobile kitchens, and commercial vehicles. Vetted sellers. Serious buyers.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/buy" style={{ background: '#fff', color: '#000', padding: '16px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Browse Vehicles
          </Link>
          <Link href="/sell" style={{ background: '#f59e0b', color: '#000', padding: '16px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Sell Your Vehicle →
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: 60, padding: '40px 20px 80px', flexWrap: 'wrap' }}>
        {[
          { num: '£25k–£80k', label: 'Average vehicle value' },
          { num: '2–5%', label: 'Commission on sale' },
          { num: '48h', label: 'Average response time' },
          { num: '100%', label: 'UK-based sellers' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#f59e0b', letterSpacing: '-1px' }}>{s.num}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 100px' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 60 }}>
          How it works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}>
          {[
            { step: '01', title: 'Submit your vehicle', body: 'Fill in our seller form with photos, spec, and asking price. We review within 24 hours.', cta: 'Sell →', href: '/sell' },
            { step: '02', title: 'We match buyers', body: 'Serious buyers register their requirements. We match them to your vehicle directly.', cta: 'Buy →', href: '/buy' },
            { step: '03', title: 'Close the deal', body: 'We facilitate the introduction, negotiation and handover. 2–5% commission on completion only.', cta: null, href: null },
          ].map(c => (
            <div key={c.step} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 32 }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#1e1e1e', marginBottom: 16, lineHeight: 1 }}>{c.step}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 16 }}>{c.body}</p>
              {c.cta && c.href && (
                <Link href={c.href} style={{ color: '#f59e0b', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{c.cta}</Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Featured listing — Cater Converts van */}
      <section style={{ background: '#111', borderTop: '1px solid #1e1e1e', borderBottom: '1px solid #1e1e1e', padding: '80px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 20, padding: '4px 14px', fontSize: 11, color: '#f59e0b', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 40 }}>
            Featured Listing
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Renault Master Truck</h2>
              <p style={{ color: '#f59e0b', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>£42,000 ono</p>
              <p style={{ color: '#888', lineHeight: 1.8, marginBottom: 24, fontSize: 14 }}>
                Fully equipped catering van. Parry LPG kitchen (4-pot bain marie, griddle, oven, hob), Ring 3000W inverter, 2×195Ah marine batteries, 2× JVC 40" smart TVs, Sony marine speaker system, Apple CarPlay. 88,000 miles. Fresh MOT.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
                {['Reg: PO17 BKX', '88k miles', 'Fresh MOT', 'Epping, Essex'].map(tag => (
                  <span key={tag} style={{ background: '#1e1e1e', padding: '4px 12px', borderRadius: 20, fontSize: 12, color: '#aaa' }}>{tag}</span>
                ))}
              </div>
              <Link href="/buy" style={{ background: '#f59e0b', color: '#000', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Enquire about this van →
              </Link>
            </div>
            <div style={{ background: '#1a1a1a', borderRadius: 12, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: 14 }}>
              📸 Photos coming soon
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px 20px', color: '#444', fontSize: 13 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: '#666', marginBottom: 8 }}>
          <span style={{ color: '#f59e0b' }}>Cater</span>Trades
        </div>
        <p>UK Commercial Vehicle Brokerage · 0203 627 7275</p>
      </footer>
    </main>
  )
}
