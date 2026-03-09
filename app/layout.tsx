import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import FeedbackWidget from '@/components/FeedbackWidget'

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
      <head>
        {/* Microsoft Clarity - replace CLARITY_PROJECT_ID with your ID from clarity.microsoft.com */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", process.env.NEXT_PUBLIC_CLARITY_ID || "CLARITY_PROJECT_ID");
          `}
        </Script>
      </head>
      <body>
        {children}
        <FeedbackWidget />
      </body>
    </html>
  )
}
