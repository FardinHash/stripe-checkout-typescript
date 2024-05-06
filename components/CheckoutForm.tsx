// Partial of ./components/CheckoutForm.tsx
import { useState, FormEvent } from 'react';
import fetch from 'isomorphic-unfetch';
import getStripe from '../utils/get-stripejs';

const CheckoutForm = () => {
  const [input, setInput] = useState({ customDonation: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Create a Checkout Session.
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: input.customDonation }),
    });
    const { sessionId } = await response.json();

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId,
    });
    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Custom Donation Amount:
        <input
          type="number"
          value={input.customDonation}
          onChange={(e) => setInput({ customDonation: e.target.value })}
        />
      </label>
      <button type="submit">Donate</button>
    </form>
  );
};

export default CheckoutForm;
