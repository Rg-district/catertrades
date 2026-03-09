import type { Metadata } from 'next'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  )
}
