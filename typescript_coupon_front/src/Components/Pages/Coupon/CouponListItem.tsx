import React from "react";
import { Coupon } from "../../Models/Coupon";
import ApplyCoupon from "../ApplyCoupon/ApplyCoupon";
import SingleCoupon from "../Coupon/SingleCoupon";

const CouponListItem: React.FC<{
  coupon: Coupon;
  isSelected: boolean;
  handleSelectCoupon: (coupon: Coupon) => void;
  isAdmin: boolean;
  orderTotal: number;
}> = ({ coupon, isSelected, handleSelectCoupon, isAdmin, orderTotal }) => {
  return (
    <li className="coupon-item">
      <SingleCoupon
        coupon={coupon}
        savedCoupons={[]}
        setSavedCoupons={() => {}}
        isAdmin={isAdmin} // Only admin can see certain fields
      />
      <button
        className="select-coupon-button"
        onClick={() => handleSelectCoupon(coupon)}
      >
        {isSelected ? "Deselect Coupon" : "Select Coupon"}
      </button>
      {isSelected && (
        <div className="apply-coupon-section">
          <h3>Enter Coupon Code</h3>
          <ApplyCoupon coupon={coupon} orderTotal={orderTotal} onApplyCoupon={() => { } } appliedCouponCodes={[]} setAppliedCouponCodes={function (codes: string[]): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
      )}
    </li>
  );
};

export default CouponListItem;
