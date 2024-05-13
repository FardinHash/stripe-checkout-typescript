import type { Metadata } from "next";

import ElementsForm from "@/components/ElementsForm";

export const metadata: Metadata = {
  title: "Agency",
};

export default function PaymentElementPage({
  searchParams,
}: {
  searchParams?: { payment_intent_client_secret?: string };
}): JSX.Element {
  return (
    <div className="page-container">
      <h1>Agency</h1>
      <p>Donate to our project </p>
      <ElementsForm />
    </div>
  );
}
