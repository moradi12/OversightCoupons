import { Coupon } from "../../Models/Coupon";
import masterCoupons from "../../Models/masterCoupons";
import { notify } from "../../Utils/notif";
import { blankCoupon } from "./Blank";
import { generateUniqueCode } from "./GenerateUniqueCode";

export const addCoupon = (
  newCoupon: Coupon,
  savedCoupons: Coupon[],
  setSavedCoupons: Function,
  setNewCoupon: Function
) => {
  // Apply the first master coupon as an example
  const applicableMasterCoupon = masterCoupons[0]; // Use the first available master coupon
  const discountValue =
    applicableMasterCoupon.discountType === "Amount"
      ? applicableMasterCoupon.discountValue
      : (newCoupon.price * applicableMasterCoupon.discountValue) / 100;

  const discountedPrice = Math.max(newCoupon.price - discountValue, 0); // Ensure the price does not go below 0

  const newCouponWithId = {
    ...newCoupon,
    id:
      savedCoupons.length > 0
        ? savedCoupons[savedCoupons.length - 1].id + 1
        : 1,
    code: generateUniqueCode(savedCoupons), // Automatically generate a unique code
    creationDate: new Date(),
    currentUsage: 0, // Initialize current usage!
    price: discountedPrice, // Apply the discounted price
  };

  setSavedCoupons([...savedCoupons, newCouponWithId]);
  localStorage.setItem(
    "coupons",
    JSON.stringify([...savedCoupons, newCouponWithId])
  );
  setNewCoupon({ ...blankCoupon });
  notify.success(`Coupon added successfully with a discount of $${discountValue}!`);
};
