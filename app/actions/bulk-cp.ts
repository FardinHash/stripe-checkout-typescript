import * as csv from 'csv-writer';
import Stripe from 'stripe';

const stripe = new Stripe('pass_your_stripe_secret_key');

async function generateCoupons(numCoupons: number): Promise<void> {
    const coupons = [];
    
    for (let i = 0; i < numCoupons; i++) {
        const couponId = `UniqueCoupon_${i+1}`;
        try {
            const coupon = await stripe.coupons.create({
                name: couponId,
                duration: 'once',
                percent_off: 20,
                currency: 'usd'
            });
            
            coupons.push({ 'Stripe ID': coupon.id, 'Custom ID': couponId });
            console.log(`Generated coupon ${couponId} with ID ${coupon.id}`);
        } catch (error) {
            console.error(`Error generating coupon ${couponId}:`, error);
        }
    }

    const csvWriter = csv.createObjectCsvWriter({
        path: 'bulk_coupons.csv',
        header: [
            { id: 'Stripe ID', title: 'Stripe ID' },
            { id: 'Custom ID', title: 'Custom ID' }
        ]
    });
    
    await csvWriter.writeRecords(coupons);
    
    console.log(`A total of ${coupons.length} coupons have been generated and saved to bulk_coupons.csv.`);
}

generateCoupons(5);
