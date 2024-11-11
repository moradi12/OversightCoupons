import { Coupon } from "../Models/Coupon";
import { saveCouponsToLocalStorage } from "./LocalStorageUtils";
import { notify } from "./notif";


export const handleCouponPurchase = async (
  coupon: Coupon,
  savedCoupons: Coupon[],
  setSavedCoupons: (coupons: Coupon[]) => void
) => {
  try {
    if (coupon.amount > 0 && coupon.isAvailable) {
      // Update coupon amount and current usage locally
      const updatedCoupons = savedCoupons.map((c) =>
        c.id === coupon.id
          ? { ...c, amount: c.amount - 1, currentUsage: c.currentUsage + 1 }
          : c
      );

      saveCouponsToLocalStorage(updatedCoupons);
      setSavedCoupons(updatedCoupons);
      notify.success("Coupon purchased successfully!");
    } else {
      notify.error("Coupon is out of stock or not available!");
    }
  } catch (error) {
    if (error instanceof Error) {
      notify.error(error.message || "An unexpected error occurred.");
    } else {
      notify.error("An unexpected error occurred.");
    }
  }
};
