export const dynamic = 'force-dynamic'

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Store in Supabase (ct_guide_downloads table)
    const { error } = await supabase
      .from('ct_guide_downloads')
      .insert({
        email: email.toLowerCase().trim(),
        downloaded_at: new Date().toISOString(),
        source: 'guide_landing_page',
      })

    if (error) {
      // If duplicate, that's fine - still let them download
      if (!error.message.includes('duplicate')) {
        console.error('Supabase error:', error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('guide-download error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
