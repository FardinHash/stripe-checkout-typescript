import type { Metadata } from "next";

import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Pro Plan",
};

export default function DonatePage(): JSX.Element {
  return (
    <div className="page-container">
      <h1>Pro Plan</h1>
      <p>Payment to your plan</p>
      <CheckoutForm uiMode="hosted" />
    </div>
  );
}
