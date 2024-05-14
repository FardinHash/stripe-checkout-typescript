import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

// Ensure the presence of the environment variable
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key not found in environment variables');
}

// Initialize Stripe with the secret key
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Function to generate a single coupon
export async function generateCoupon(
  name: string,
  duration: Stripe.CouponCreateParams.Duration,
  amountOff: number,
  currency: string
): Promise<Stripe.Coupon> {
  try {
    const coupon = await stripeInstance.coupons.create({
      name,
      duration,
      amount_off: amountOff,
      currency,
    });
    console.log('Coupon generated successfully:', coupon.id);
    return coupon;
  } catch (error) {
    console.error('Error generating coupon:', error);
    throw error;
  }
}

// Function to generate bulk coupons
export async function generateBulkCoupons(
  count: number,
  name: string,
  duration: Stripe.CouponCreateParams.Duration,
  amountOff: number,
  currency: string
): Promise<Stripe.Coupon[]> {
  const coupons: Stripe.Coupon[] = [];
  try {
    for (let i = 0; i < count; i++) {
      const coupon = await generateCoupon(`${name}_${i + 1}`, duration, amountOff, currency);
      coupons.push(coupon);
    }
    return coupons;
  } catch (error) {
    console.error('Error generating bulk coupons:', error);
    throw error;
  }
}
