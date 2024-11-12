import React, { useState } from "react";
import { Coupon } from "../../Models/Coupon";
import ApplyCoupon from "../ApplyCoupon/ApplyCoupon";

interface OrderPageProps {
  coupons: Coupon[]; // Allows multiple coupons to be applied
  initialOrderTotal: number;
}

const OrderPage: React.FC<OrderPageProps> = ({ coupons, initialOrderTotal }) => {
  const [orderTotal] = useState<number>(initialOrderTotal);
  const [finalPrice, setFinalPrice] = useState<number>(initialOrderTotal);
  const [appliedCoupons, setAppliedCoupons] = useState<Coupon[]>([]);

  const handleApplyCoupon = (discountedPrice: number, coupon: Coupon) => {
    if (appliedCoupons.find((appliedCoupon) => appliedCoupon.id === coupon.id)) {
      alert("Coupon already applied!");
      return;
    }

    // Update state with the new price and add the applied coupon to the list
    setFinalPrice(discountedPrice);
    setAppliedCoupons([...appliedCoupons, coupon]);
  };

  return (
    <div className="order-page-container">
      <h2>Order Summary</h2>
      <div className="order-summary">
        <div>
          <strong>Order Total:</strong> ${orderTotal.toFixed(2)}
        </div>
        {appliedCoupons.length > 0 && (
          <div className="applied-coupons">
            <strong>Applied Coupons:</strong>
            <ul>
              {appliedCoupons.map((coupon) => (
                <li key={coupon.id}>
                  {coupon.name} - Code: {coupon.code}
                </li>
              ))}
            </ul>
          </div>
        )}
        {finalPrice !== null && finalPrice < orderTotal && (
          <div className="final-price">
            <strong>Order Total After Discount:</strong> ${finalPrice.toFixed(2)}
          </div>
        )}
      </div>

      {coupons.length > 0 && (
        <div className="apply-coupons-section">
          <h3>Apply a Coupon Code</h3>
          {coupons.map((coupon) => (
            <ApplyCoupon
              key={coupon.id}
              coupon={coupon}
              orderTotal={finalPrice || orderTotal}
              onApplyCoupon={(discountedPrice) => handleApplyCoupon(discountedPrice, coupon)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
