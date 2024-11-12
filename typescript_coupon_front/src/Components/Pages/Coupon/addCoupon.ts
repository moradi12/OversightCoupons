import { Coupon } from "../../Models/Coupon";
import { notify } from "../../Utils/notif";
import { blankCoupon } from "./Blank";
import { generateUniqueCode } from "./GenerateUniqueCode";

export const addCoupon = (
  newCoupon: Coupon,
  savedCoupons: Coupon[],
  setSavedCoupons: Function,
  setNewCoupon: Function
) => {
  const newCouponWithId = {
    ...newCoupon,
    id:
      savedCoupons.length > 0
        ? savedCoupons[savedCoupons.length - 1].id + 1
        : 1,
    code: generateUniqueCode(savedCoupons), // Automatically generate a unique code
    creationDate: new Date(),
    currentUsage: 0, // Initialize current usage
  };

  setSavedCoupons([...savedCoupons, newCouponWithId]);
  localStorage.setItem(
    "coupons",
    JSON.stringify([...savedCoupons, newCouponWithId])
  );
  setNewCoupon({ ...blankCoupon });
  notify.success(`Coupon added successfully!`);
};
