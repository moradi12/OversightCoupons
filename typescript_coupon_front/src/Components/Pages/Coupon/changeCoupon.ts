import { Coupon } from "../../Models/Coupon";
import { notify } from "../../Utils/notif";

export const changeCoupon = (
  couponToEdit: Coupon,
  savedCoupons: Coupon[],
  newCoupon: Coupon,
  setSavedCoupons: Function
) => {
  const couponsAfterUpdate = savedCoupons.map((coupon) =>
    coupon.id === couponToEdit?.id
      ? { ...newCoupon, code: coupon.code, creationDate: coupon.creationDate } // Preserve code and creationDate!!
      : coupon
  );
  setSavedCoupons(couponsAfterUpdate);
  localStorage.setItem("coupons", JSON.stringify(couponsAfterUpdate));
  notify.success("Coupon updated successfully!");
};
