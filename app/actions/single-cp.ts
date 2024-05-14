import * as csv from 'csv-writer';
import Stripe from 'stripe';

const stripe = new Stripe('pass_your_stripe_secret_key');

async function generateCoupon(): Promise<void> {
    const customId = "APPS80";
    const couponName = "AppSumo";
    try {
        const coupon = await stripe.coupons.create({
            name: couponName,
            duration: 'once',
            percent_off: 20,
            currency: 'usd',
            id: customId
        });
        
        const csvWriter = csv.createObjectCsvWriter({
            path: 'coupon.csv',
            header: [
                { id: 'Stripe ID', title: 'Stripe ID' },
                { id: 'Custom ID', title: 'Custom ID' },
                { id: 'Coupon Name', title: 'Coupon Name' }
            ]
        });
        
        await csvWriter.writeRecords([
            { 'Stripe ID': coupon.id, 'Custom ID': customId, 'Coupon Name': couponName }
        ]);
        
        console.log("Coupon generated and saved to coupon.csv.");
    } catch (error) {
        console.error("Error generating coupon:", error);
    }
}

generateCoupon();
