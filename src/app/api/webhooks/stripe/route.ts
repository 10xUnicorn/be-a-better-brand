import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  try {
    // Stripe signature verification would go here
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)

    const event = JSON.parse(body)

    switch (event.type) {
      case 'invoice.paid': {
        // Update invoice status to 'paid' in Supabase
        // const { createServiceClient } = await import('@/lib/supabase/server')
        // const supabase = await createServiceClient()
        // await supabase.from('invoices').update({ status: 'paid', paid_at: new Date().toISOString() }).eq('stripe_invoice_id', event.data.object.id)
        console.log('Invoice paid:', event.data?.object?.id)
        break
      }
      case 'invoice.payment_failed': {
        console.log('Payment failed:', event.data?.object?.id)
        break
      }
      case 'customer.subscription.updated': {
        console.log('Subscription updated:', event.data?.object?.id)
        break
      }
      case 'customer.subscription.deleted': {
        console.log('Subscription cancelled:', event.data?.object?.id)
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 })
  }
}
