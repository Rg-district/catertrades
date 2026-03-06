import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { error } = await supabase.from('buyer_enquiries').insert([{
    ...body,
    status: 'new',
    created_at: new Date().toISOString(),
  }])
  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  try {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `🔍 New BUYER enquiry\n\nLooking for: ${body.vehicle_type}\nBudget: £${body.budget_min}–£${body.budget_max}\nLocation: ${body.location}\n\nNeeds: ${body.requirements}\n\nContact: ${body.name} · ${body.email} · ${body.phone}`,
      }),
    })
  } catch {}
  return NextResponse.json({ success: true })
}
