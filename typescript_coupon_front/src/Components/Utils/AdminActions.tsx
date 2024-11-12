import React from "react";
import { Coupon } from "../Models/Coupon";
import AddCoupon from "../Pages/AddCoupon/AddCoupon";
import { DeleteCoupon } from "../Pages/DeleteCoupon/DeleteCoupon";

interface AdminActionsProps {
  coupon: Coupon;
  savedCoupons: Coupon[];
  setSavedCoupons: (coupons: Coupon[]) => void;
  isEdit: boolean;
  setIsEdit: (edit: boolean) => void;
}

const AdminActions: React.FC<AdminActionsProps> = ({
  coupon,
  savedCoupons,
  setSavedCoupons,
  isEdit,
  setIsEdit,
}) => (
  <>
    <DeleteCoupon
      couponId={coupon.id}
      savedCoupons={savedCoupons}
      setSavedCoupons={setSavedCoupons}
    />

    <button onClick={() => setIsEdit(true)}>Edit</button>
    {isEdit && (
      <div>
        <AddCoupon couponToEdit={coupon} />
        <button onClick={() => setIsEdit(false)}>Cancel</button>
      </div>
    )}
  </>
);

export default AdminActions;
