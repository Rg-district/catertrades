import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, accountType, businessType, businessName } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    if (accountType === 'seller' && !phone) {
      return NextResponse.json({ error: 'Phone number is required for sellers' }, { status: 400 })
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('ct_accounts')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 })
    }

    // Create account
    const { data, error } = await supabase
      .from('ct_accounts')
      .insert({
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        account_type: accountType,
        business_type: businessType || 'individual',
        business_name: businessName || null,
        verified: false,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to create account' }, { status: 500 })
    }

    // TODO: Send verification email via Resend
    // For now, just return success

    return NextResponse.json({
      success: true,
      message: 'Account created. Please check your email for verification.',
      accountId: data.id,
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
