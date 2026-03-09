import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { listing_id, buyer_name, buyer_email, buyer_phone, message } = body

  try {
    const { error } = await supabaseAdmin.from('ct_enquiries').insert([{
      listing_id,
      buyer_name,
      buyer_email,
      buyer_phone,
      message,
    }])
    if (error) console.error('Supabase error:', error)
  } catch (e) {
    console.error('DB error:', e)
  }

  try {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `🔍 *New BUYER enquiry — CaterTrades*\n\nListing: ${listing_id}\nMessage: ${message}\n\nContact: ${buyer_name} · ${buyer_email} · ${buyer_phone}`,
        parse_mode: 'Markdown',
      }),
    })
  } catch {}

  return NextResponse.json({ success: true })
}
