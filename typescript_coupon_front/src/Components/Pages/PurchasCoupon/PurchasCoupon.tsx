import { AxiosError } from "axios";
import { Coupon } from "../../Models/Coupon";
import { purchaseCoupon } from "../../Utils/CouponsCommands";
import { notify } from "../../Utils/notif";

interface PurchasCouponProps {
  coupon: Coupon;
}

export const PurchasCoupon: React.FC<PurchasCouponProps> = ({ coupon }) => {
  const handleBuyCoupon = async () => {
    try {
      if (coupon.amount > 0 && coupon.isAvailable) {
        await purchaseCoupon(coupon.id);
        notify.success("Coupon purchased successfully!");
        coupon.amount -= 1;
        coupon.currentUsage += 1;
      } else {
        notify.error("Coupon is out of stock or not available!");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        notify.error(error.response.data || "An error occurred while purchasing the coupon.");
      } else if (error instanceof Error) {
        notify.error(error.message || "An unexpected error occurred.");
      } else {
        notify.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h2>{coupon.title} - Purchase Coupon</h2>
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
        onClick={handleBuyCoupon}
      >
        Buy Coupon
      </button>
    </div>
  );
};
