import React, { useState } from "react";
import { Coupon } from "../../Models/Coupon";
import { CouponUtils } from "../../Utils/CouponUtils";
import { notify } from "../../Utils/notif";

interface ApplyCouponProps {
  coupon: Coupon;
  orderTotal: number;
  onApplyCoupon: (newTotal: number) => void;
  appliedCouponCodes: string[];
  setAppliedCouponCodes: (codes: string[]) => void;
}

const ApplyCoupon: React.FC<ApplyCouponProps> = ({
  coupon,
  orderTotal,
  onApplyCoupon,
  appliedCouponCodes,
  setAppliedCouponCodes,
}) => {
  const [inputCode, setInputCode] = useState<string>(""); // User-entered coupon code
  const [discountAmount, setDiscountAmount] = useState<number | null>(null); // Discount amount
  const [finalPrice, setFinalPrice] = useState<number | null>(null); // Price after applying coupon

  const handleApplyCoupon = () => {
    try {
      // Prevent reusing the same coupon
      if (appliedCouponCodes.includes(inputCode)) {
        notify.error("This coupon has already been applied.");
        return;
      }

      // Apply the coupon using CouponUtils
      const { discountedPrice, discountAmount } = CouponUtils.applyCoupon(inputCode, coupon, orderTotal);

      // Update the state
      setDiscountAmount(discountAmount);
      setFinalPrice(discountedPrice);

      // Pass the updated total to the parent
      onApplyCoupon(discountedPrice);

      // Track the applied coupon
      setAppliedCouponCodes([...appliedCouponCodes, inputCode]);

      notify.success(`Coupon applied successfully! You saved $${discountAmount.toFixed(2)}.`);
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error.message);
      }
    }
  };

  return (
    <div className="apply-coupon p-4 border rounded bg-gray-50">
      <h3 className="text-lg font-bold mb-2">Apply a Coupon</h3>

      {/* Input Field for Coupon Code */}
      <input
        type="text"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder="Enter coupon code"
        className="border px-2 py-1 rounded w-full mb-2"
      />

      {/* Apply Button */}
      <button
        onClick={handleApplyCoupon}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full"
      >
        Apply Coupon
      </button>

      {/* Price Summary */}
      <div className="mt-4">
        <p>Original Price: <span className="font-bold">${orderTotal.toFixed(2)}</span></p>
        {discountAmount !== null && (
          <>
            <p>Discount: <span className="text-green-500 font-bold">- ${discountAmount.toFixed(2)}</span></p>
            <p>Final Price: <span className="text-blue-500 font-bold">${finalPrice?.toFixed(2)}</span></p>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyCoupon;
