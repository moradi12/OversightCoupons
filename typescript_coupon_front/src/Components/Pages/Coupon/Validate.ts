import { Coupon } from "../../Models/Coupon";
import { notify } from "../../Utils/notif";

export const validateCoupon = (newCoupon: Coupon): boolean => {
  if (!newCoupon.name.trim() || !newCoupon.description?.trim()) {
    notify.error("Name and Description are required");
    return false;
  }

  if (
    newCoupon.discountType === "Percentage" &&
    (newCoupon.discount! <= 0 || newCoupon.discount! > 100)
  ) {
    notify.error("Discount percentage must be between 1 and 100");
    return false;
  }

  if (newCoupon.discountType === "Amount" && newCoupon.discount! <= 0) {
    notify.error("Discount amount must be greater than 0");
    return false;
  }

  if (newCoupon.price <= 0) {
    notify.error("Price must be greater than 0");
    return false;
  }

  // Validate endDate only if it exists
  if (newCoupon.endDate && newCoupon.endDate < newCoupon.startDate) {
    notify.error("End date cannot be before the start date");
    return false;
  }

  if (newCoupon.maxUsage <= 0) {
    notify.error("Max usage must be greater than 0");
    return false;
  }

  return true;
};
