import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const location = searchParams.get('location')
  const min_price = searchParams.get('min_price')
  const max_price = searchParams.get('max_price')
  const vehicle_type = searchParams.get('vehicle_type')

  let query = supabase
    .from('ct_listings')
    .select('*')
    .eq('status', 'available')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (location) {
    query = query.ilike('location', `%${location}%`)
  }
  if (min_price) {
    query = query.gte('price', Number(min_price))
  }
  if (max_price) {
    query = query.lte('price', Number(max_price))
  }
  if (vehicle_type && vehicle_type !== 'All') {
    query = query.or(`title.ilike.%${vehicle_type}%,tags.cs.["${vehicle_type}"]`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ listings: [] })
  }

  return NextResponse.json({ listings: data })
}
