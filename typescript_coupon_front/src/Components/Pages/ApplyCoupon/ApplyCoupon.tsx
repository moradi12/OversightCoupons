import React, { useState } from "react";
import { Coupon } from "../../Models/Coupon";
import masterCoupons from "../../Models/masterCoupons";
import { notify } from "../../Utils/notif";

interface ApplyCouponProps {
  coupon: Coupon;
  orderTotal: number;
  onApplyCoupon: (discountedPrice: number) => void;
}

const ApplyCoupon: React.FC<ApplyCouponProps> = ({ coupon, orderTotal, onApplyCoupon }) => {
  const [inputCode, setInputCode] = useState<string>("");

  // Function to calculate discount
  function calculateDiscount(price: number, discountType?: "Amount" | "Percentage", discountValue?: number): number {
    if (!discountType || !discountValue) {
      return 0;
    }

    if (discountType === "Percentage") {
      return (discountValue / 100) * price;
    }
    if (discountType === "Amount") {
      return discountValue;
    }

    return 0;
  }

  // Function to handle coupon application
  function handleApplyCoupon() {
    let discountAmount = 0;

    // Check if entered code matches any of the master coupons
    const matchedMasterCoupon = masterCoupons.find(function (masterCoupon) {
      return masterCoupon.code === inputCode;
    });

    if (matchedMasterCoupon) {
      discountAmount = calculateDiscount(orderTotal, matchedMasterCoupon.discountType, matchedMasterCoupon.discountValue);
    } else if (inputCode === coupon.code) {
      // Apply the regular coupon
      discountAmount = calculateDiscount(orderTotal, coupon.discountType, coupon.discount);
    } else {
      notify.error("Invalid coupon code. Please try again.");
      return;
    }

    const newPrice = Math.max(orderTotal - discountAmount, 0); // Ensure price is not negative
    onApplyCoupon(newPrice);
    notify.success("Coupon applied successfully!");
  }

  return (
    <div className="apply-coupon">
      <input
        type="text"
        value={inputCode}
        onChange={function (event) {
          setInputCode(event.target.value);
        }}
        placeholder="Enter coupon code"
        className="border px-2 py-1 rounded"
      />
      <button
        onClick={handleApplyCoupon}
        className="bg-blue-500 text-white font-bold py-1 px-4 rounded ml-2"
      >
        Apply Coupon
      </button>
    </div>
  );
};

export default ApplyCoupon;
