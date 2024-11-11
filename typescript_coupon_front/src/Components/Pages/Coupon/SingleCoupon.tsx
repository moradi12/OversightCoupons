import React, { useState } from "react";
import { Coupon } from "../../Models/Coupon";
import AddCoupon from "../AddCoupon/AddCoupon";
import { DeleteCoupon } from "../DeleteCoupon/DeleteCoupon";

interface SingleCouponProps {
  coupon: Coupon;
  savedCoupons: Coupon[];
  setSavedCoupons: (coupons: Coupon[]) => void;
  isAdmin: boolean;
}

const SingleCoupon: React.FC<SingleCouponProps> = ({
  coupon,
  savedCoupons,
  setSavedCoupons,
  isAdmin,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <li key={coupon.id} className="coupon-item">
      <div>
        <strong>{coupon.name}</strong> - <strong>{coupon.title}</strong> -{" "}
        <strong>{coupon.id}</strong>
      </div>
      {isAdmin && <div>Description: {coupon.description}</div>}
      <div>Discount Type: {coupon.discountType || "Percentage"}</div>
      <div>Discount: {coupon.discount}%</div>
      <div>
        Price: ${coupon.price !== undefined ? coupon.price : "Not Available"}
      </div>
      <div>Amount: {coupon.amount !== undefined ? coupon.amount : "N/A"}</div>
      {coupon.category && <div>Category: {coupon.category}</div>}
      {coupon.startDate && <div>Start Date: {new Date(coupon.startDate).toLocaleDateString()}</div>}
      {coupon.endDate && <div>End Date: {new Date(coupon.endDate).toLocaleDateString()}</div>}

      <DeleteCoupon
        couponId={coupon.id}
        savedCoupons={savedCoupons}
        setSavedCoupons={setSavedCoupons}
      />

      <button onClick={() => setIsEdit(true)}>Edit</button>
      {isEdit && (
        <div>
          <AddCoupon couponToEdit={coupon} creatorUserId={0} />
          <button onClick={() => setIsEdit(false)}>Cancel</button>
        </div>
      )}
    </li>
  );
};

export default SingleCoupon;
