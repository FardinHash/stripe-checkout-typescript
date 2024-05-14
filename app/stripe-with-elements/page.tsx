import type { Metadata } from "next";

import ElementsForm from "@/components/ElementsForm";

export const metadata: Metadata = {
  title: "Payment with Stripe Elements",
};

export default function PaymentElementPage({
  searchParams,
}: {
  searchParams?: { payment_intent_client_secret?: string };
}): JSX.Element {
  return (
    <div className="page-container">
      <h1>Payment with Stripe Elements</h1>
      <p>Payment to your plan </p>
      <ElementsForm />
    </div>
  );
}
