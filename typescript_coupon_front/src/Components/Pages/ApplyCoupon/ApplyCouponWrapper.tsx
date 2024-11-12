import React, { useState } from "react";
import { Coupon } from "../../Models/Coupon";
import ApplyCoupon from "./ApplyCoupon";

const ApplyCouponWrapper: React.FC = () => {
  const [orderTotal, setOrderTotal] = useState<number>(150); 
  const [appliedCouponCodes, setAppliedCouponCodes] = useState<string[]>([]);

  const sampleCoupon: Coupon = {
    title: "20% OFF",
    id: 1,
    name: "Sample Coupon",
    description: "Use this coupon for 20% off!",
    createdByUserId: 1,
    creationDate: new Date(),
    discountType: "Percentage",
    discount: 20,
    expirationDate: new Date("2024-12-31"),
    code: "SAMPLE20",
    isCombinable: true,
    maxUsage: 5,
    currentUsage: 0,
    amount: 10,
    price: 150,
    startDate: new Date(),
    endDate: new Date("2024-12-31"),
    image: null,
    isAvailable: true,
    category: null,
    isMasterCoupon: false,
  };

  const handleApplyCoupon = (newTotal: number) => {
    setOrderTotal(newTotal); // Update the total price
  };

  return (
    <ApplyCoupon
      coupon={sampleCoupon}
      orderTotal={orderTotal}
      onApplyCoupon={handleApplyCoupon}
      appliedCouponCodes={appliedCouponCodes}
      setAppliedCouponCodes={setAppliedCouponCodes}
    />
  );
};

export default ApplyCouponWrapper;
