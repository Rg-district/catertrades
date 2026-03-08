import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, make, model, year, price, location, lat, lng, miles, tags, description, seller_name, seller_email, seller_phone } = body

  try {
    const { error } = await supabaseAdmin.from('listings').insert([{
      title: title || `${year} ${make} ${model}`,
      make,
      model,
      year,
      price,
      price_label: `£${Number(price).toLocaleString()}`,
      location,
      lat: lat || null,
      lng: lng || null,
      miles: miles || null,
      tags: tags || [],
      description,
      seller_name,
      seller_email,
      seller_phone,
      status: 'pending',
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
        text: `🚐 *New SELLER listing — CaterTrades*\n\n${year} ${make} ${model}\nAsking: £${Number(price).toLocaleString()}\nLocation: ${location}\n\nContact: ${seller_name} · ${seller_email} · ${seller_phone}\n\nDescription: ${description}`,
        parse_mode: 'Markdown',
      }),
    })
  } catch {}

  return NextResponse.json({ success: true })
}
