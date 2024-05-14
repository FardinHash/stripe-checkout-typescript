"use client"

import React, { useState } from "react";
import PaymentInput from "@/components/PaymentInput";
import StripeTestCards from "@/components/StripeTestCards";
import { formatAmountForDisplay } from "@/utils/stripe-helpers";
import * as config from "@/config";
import { createCheckoutSession } from "@/actions/stripe";
import Stripe from "stripe";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const [loading] = useState<boolean>(false);
  const [input, setInput] = useState<{
    customDonation: number;
    couponCode: string;
  }>({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
    couponCode: "",
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const formAction = async (data: FormData): Promise<void> => {
    const uiMode = data.get(
      "uiMode"
    ) as Stripe.Checkout.SessionCreateParams.UiMode;
    const { client_secret, url } = await createCheckoutSession(data);

    if (uiMode === "embedded") return setClientSecret(client_secret);

    window.location.assign(url as string);
  };

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={props.uiMode} />
        <PaymentInput
          className="checkout-style"
          name="customDonation"
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          step={config.AMOUNT_STEP}
          currency={config.CURRENCY}
          onChange={handleInputChange}
          value={input.customDonation}
          companyName={""}
        />
        <input
          type="text"
          name="couponCode"
          value={input.couponCode}
          onChange={handleInputChange}
          placeholder="Enter coupon code"
        /> {/* Add Coupon Code Input Field */}
        <StripeTestCards />
        <button
          className="checkout-style-background"
          type="submit"
          disabled={loading}
        >
          Donate{" "}
          {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </button>
      </form>
      {/* {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null} */}
    </>
  );
}