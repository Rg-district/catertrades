import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { error } = await supabase.from('seller_enquiries').insert([{
      ...body, status: 'new', created_at: new Date().toISOString(),
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
        text: `🚐 *New SELLER listing — CaterTrades*\n\n${body.year} ${body.make} ${body.model}\nAsking: £${body.asking_price}\nLocation: ${body.location}\nCondition: ${body.condition}\n\nContact: ${body.name} · ${body.email} · ${body.phone}\n\nDescription: ${body.description}`,
        parse_mode: 'Markdown',
      }),
    })
  } catch {}

  return NextResponse.json({ success: true })
}
