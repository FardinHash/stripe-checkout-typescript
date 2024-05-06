// Partial of ./pages/api/checkout_sessions/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Stripe } from '@stripe/stripe-js';

// Define your constants CURRENCY and formatAmountForStripe if not already defined.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Create Checkout Sessions from body params.
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: 'donate',
    payment_method_types: ['card'],
    line_items: [
      {
        name: 'Custom amount donation',
        amount: formatAmountForStripe(amount, CURRENCY),
        currency: CURRENCY,
        quantity: 1,
      },
    ],
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  };
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params);
  
  res.status(200).json({ sessionId: checkoutSession.id });
}
