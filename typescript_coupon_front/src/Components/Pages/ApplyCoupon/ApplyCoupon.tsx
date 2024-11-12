import React, { useState } from "react";
import { Coupon } from "../../Models/Coupon";
import { CouponUtils } from "../../Utils/CouponUtils";
import { notify } from "../../Utils/notif";
import MasterCouponManager from "../Master/MasterCouponManager";

interface ApplyCouponProps {
  coupon: Coupon;
  orderTotal: number;
  onApplyCoupon: (newTotal: number, discount: number) => void;
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
  const [inputCode, setInputCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number>(orderTotal);

  const handleApplyCoupon = () => {
    if (!inputCode.trim()) {
      notify.error("Please enter a coupon code.");
      return;
    }

    // Prevent reusing the same coupon
    if (appliedCouponCodes.includes(inputCode)) {
      notify.error("This coupon has already been applied.");
      return;
    }

    // Attempt to apply Master Coupon
    const masterResult = MasterCouponManager.applyCoupon(inputCode, orderTotal);
    if (masterResult.isValid) {
      const { discountedPrice, discountAmount } = masterResult;
      setDiscountAmount(discountAmount);
      setFinalPrice(discountedPrice);
      onApplyCoupon(discountedPrice, discountAmount);
      setAppliedCouponCodes([...appliedCouponCodes, inputCode]);
      notify.success(
        `Master coupon applied! You saved $${discountAmount.toFixed(2)}.`
      );
      return;
    }

    // Validate regular coupon code
    if (inputCode !== coupon.code) {
      notify.error("Invalid coupon code. Please try again.");
      return;
    }

    // Check coupon availability
    if (!coupon.isAvailable) {
      notify.error("This coupon is no longer available.");
      return;
    }

    // Check coupon expiration
    if (coupon.endDate && new Date() > new Date(coupon.endDate)) {
      notify.error("This coupon has expired.");
      return;
    }

    // Check max usage
    if (coupon.maxUsage !== undefined && coupon.maxUsage <= 0) {
      notify.error("This coupon has reached its maximum usage limit.");
      return;
    }

    try {
      const { discountedPrice, discountAmount } = CouponUtils.applyCoupon(
        inputCode,
        coupon,
        orderTotal
      );
      setDiscountAmount(discountAmount);
      setFinalPrice(discountedPrice);
      onApplyCoupon(discountedPrice, discountAmount);
      setAppliedCouponCodes([...appliedCouponCodes, inputCode]);

      notify.success(
        `Coupon applied successfully! You saved $${discountAmount.toFixed(
          2
        )}.`
      );
    } catch (couponError) {
      notify.error(
        couponError instanceof Error
          ? couponError.message
          : "An error occurred while applying the coupon."
      );
    }
  };

  return (
    <div className="apply-coupon p-4 border rounded bg-gray-50 mt-4">
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
        <p>
          Original Price:{" "}
          <span className="font-bold">${orderTotal.toFixed(2)}</span>
        </p>
        {discountAmount !== null && (
          <>
            <p>
              Discount:{" "}
              <span className="text-green-500 font-bold">
                - ${discountAmount.toFixed(2)}
              </span>
            </p>
            <p>
              Final Price:{" "}
              <span className="text-blue-500 font-bold">
                ${finalPrice.toFixed(2)}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyCoupon;
