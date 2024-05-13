import { formatAmountForDisplay } from "@/utils/stripe-helpers";

export default function CustomDonationInput({
  name,
  min,
  max,
  currency,
  step,
  companyName,
  phoneNo,
  address,
  couponCode,
  onChange,
  value,
  className,
}: {
  name: string;
  min: number;
  max: number;
  currency: string;
  step: number;
  companyName: string;
  phoneNo?: string;
  address?: string;
  couponCode?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  className?: string;
}): JSX.Element {
  return (
    <div className={className}>
      <label>
        Company Name*:
        <input
          type="text"
          name="companyName"
          value={companyName}
          onChange={(e) => onChange(e)} // Add onChange handler here
          required
        />
      </label>
      <label>
        Phone No.:
        <input
          type="number"
          name="phoneNo"
          value={phoneNo}
          onChange={onChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={address}
          onChange={onChange}
        />
      </label>
      <label>
        Coupon Code:
        <input
          type="text"
          name="couponCode"
          value={couponCode}
          onChange={onChange}
        />
      </label>
      <label>
        Custom donation amount ({formatAmountForDisplay(min, currency)}-
        {formatAmountForDisplay(max, currency)}):
        <input
          type="number"
          name={name}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          value={value}
          required
        />
        {currency}
      </label>
    </div>
  );
}