import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CaterTrades — UK Commercial Vehicle Brokerage',
  description: 'Buy and sell catering vans, food trucks and mobile kitchens across the UK. Vetted sellers, serious buyers.',
  openGraph: {
    title: 'CaterTrades',
    description: 'The UK specialist marketplace for catering vehicles.',
    url: 'https://catertrades.com',
    siteName: 'CaterTrades',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
