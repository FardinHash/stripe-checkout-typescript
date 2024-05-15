import csv
import stripe

stripe.api_key = 'pass_your_stripe_secret_key'

def generate_coupons(num_coupons):
    coupons = []
    
    for i in range(num_coupons):
        coupon_id = f"UniqueCoupon_{i+1}"  
        coupon = stripe.Coupon.create(
            name=coupon_id,
            duration='once',
            percent_off=20,  
            currency='usd',
        )
        coupons.append([coupon.id, coupon_id])
        print(f"Generated coupon {coupon_id} with ID {coupon.id}")

    with open('bulk_coupons.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(coupons)

    print(f"A total of {len(coupons)} coupons have been generated and saved to bulk_coupons.csv.")

generate_coupons(5)