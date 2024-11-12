import React from "react";
import { Coupon } from "../../Models/Coupon";
import { handleCouponPurchase } from "../../Utils/CouponActions";
import { notify } from "../../Utils/notif";

interface BuyCouponButtonProps {
  coupon: Coupon;
  savedCoupons: Coupon[];
  setSavedCoupons: (coupons: Coupon[]) => void;
  setPurchased: (purchased: boolean) => void;
}

const BuyCouponButton: React.FC<BuyCouponButtonProps> = ({
  coupon,
  savedCoupons,
  setSavedCoupons,
  setPurchased,
}) => {
  const handleBuyCoupon = async () => {
    try {
      if (coupon.amount > 0 && coupon.isAvailable) {
        await handleCouponPurchase(coupon, savedCoupons, setSavedCoupons);
        notify.success("Coupon purchased successfully!");
        setPurchased(true);
      } else {
        notify.error("Coupon is out of stock or not available!");
      }
    } catch (error) {
      notify.error(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <button
      className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mt-2"
      onClick={handleBuyCoupon}
    >
      Buy Coupon
    </button>
  );
};

export default BuyCouponButton;
