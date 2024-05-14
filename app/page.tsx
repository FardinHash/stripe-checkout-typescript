import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | Stripe Checkout",
};

export default function IndexPage(): JSX.Element {
  return (
    <ul className="card-list">
      <li>
        <Link
          href="/stripe-with-embedded-elements"
          className="card checkout-style-background"
        >
          <h2 className="bottom">Basic Plan</h2>
          <img src="/checkout-one-time-payments.svg" />
        </Link>
      </li>
      <li>
        <Link
          href="/stripe-checkout"
          className="card checkout-style-background"
        >
          <h2 className="bottom">Pro Plan</h2>
          <img src="/checkout-one-time-payments.svg" />
        </Link>
      </li>
      <li>
        <Link
          href="/stripe-with-elements"
          className="card elements-style-background"
        >
          <h2 className="bottom">Agency Plan</h2>
          <img src="/elements-card-payment.svg" />
        </Link>
      </li>
    </ul>
  );
}
