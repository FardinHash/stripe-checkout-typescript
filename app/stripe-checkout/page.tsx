import type { Metadata } from "next";

import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Payment with hosted Checkout | Next.js + TypeScript",
};

export default function DonatePage(): JSX.Element {
  return (
    <div className="page-container">
      <h1>Payment with hosted Checkout</h1>
      <p>Payment to your plan</p>
      <CheckoutForm uiMode="hosted" />
    </div>
  );
}
