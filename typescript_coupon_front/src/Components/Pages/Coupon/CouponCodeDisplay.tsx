import React from "react";

interface CouponCodeDisplayProps {
  isAdmin: boolean;
  purchased: boolean;
  couponCode: string;
}

const CouponCodeDisplay: React.FC<CouponCodeDisplayProps> = ({
  isAdmin,
  purchased,
  couponCode,
}) => (
  <div className="mt-4">
    {isAdmin ? (
      <div>
        <strong>Coupon Code:</strong> {couponCode}
      </div>
    ) : purchased ? (
      <div className="text-green-700">
        <strong>Coupon Code:</strong> {couponCode}
      </div>
    ) : (
      <div className="text-red-700">You need to buy this coupon to get the code.</div>
    )}
  </div>
);

export default CouponCodeDisplay;
