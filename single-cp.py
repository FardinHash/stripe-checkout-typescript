import csv
import stripe

stripe.api_key = 'pass_your_stripe_secret_key'

def generate_coupon():
    custom_id = "APPS30" 
    coupon_name = "AppSumo"  
    coupon = stripe.Coupon.create(
        name=coupon_name,
        duration='once',
        percent_off=20,  
        currency='usd',
        id=custom_id  
    )

    with open('coupon.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Stripe ID", "Custom ID", "Coupon Name"])
        writer.writerow([coupon.id, custom_id, coupon_name])

    print("Coupon generated and saved to coupon.csv.")

generate_coupon()