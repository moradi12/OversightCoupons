// SingleCoupon.tsx
import { useEffect, useState } from "react";
import { Coupon } from "../../Models/Coupon";
import { handleCouponPurchase } from "../../Utils/CouponActions";
import { getCouponsFromLocalStorage } from "../../Utils/LocalStorageUtils";
import { notify } from "../../Utils/notif";
import AddCoupon from "../AddCoupon/AddCoupon";
import ApplyCoupon from "../ApplyCoupon/ApplyCoupon";
import { DeleteCoupon } from "../DeleteCoupon/DeleteCoupon";
import CouponDetails from "./CouponDetails";

const SingleCoupon = ({
  coupon,
  savedCoupons,
  setSavedCoupons,
  isAdmin,
}: {
  coupon: Coupon;
  savedCoupons: Coupon[];
  setSavedCoupons: (coupons: Coupon[]) => void;
  isAdmin: boolean;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [purchased, setPurchased] = useState<boolean>(false);
  const [redeem, setRedeem] = useState<boolean>(false);
  const [orderTotal, setOrderTotal] = useState<number>(coupon.price);
  const [appliedCouponCodes, setAppliedCouponCodes] = useState<string[]>([]);

  useEffect(() => {
    const loadedCoupons = getCouponsFromLocalStorage();
    setSavedCoupons(loadedCoupons);
  }, [setSavedCoupons]);

  const handleBuyCoupon = async () => {
    try {
      if (coupon.amount > 0 && coupon.isAvailable) {
        await handleCouponPurchase(coupon, savedCoupons, setSavedCoupons);
        notify.success("Coupon purchased successfully!");

        // Mark the coupon as purchased
        setPurchased(true);
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

  // Reset orderTotal when coupon changes or when coupons are updated
  useEffect(() => {
    setOrderTotal(coupon.price);
    setAppliedCouponCodes([]); // Optionally reset applied coupons
  }, [coupon, savedCoupons]);

  return (
    <li key={coupon.id} className="coupon-item">
      {/* Coupon Details */}
      <CouponDetails coupon={coupon} isAdmin={isAdmin} />

      {/* Admin-only Actions */}
      {isAdmin && (
        <>
          <DeleteCoupon
            couponId={coupon.id}
            savedCoupons={savedCoupons}
            setSavedCoupons={setSavedCoupons}
          />
          <button
            onClick={() => setIsEdit(true)}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-2"
          >
            Edit
          </button>
          {isEdit && (
            <div className="mt-2">
              <AddCoupon couponToEdit={coupon} />
              <button
                onClick={() => setIsEdit(false)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}

      {/* Buy Coupon Button */}
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mt-2"
        onClick={handleBuyCoupon}
      >
        Buy Coupon
      </button>

      {/* Redeem Section for All Users */}
      <div className="mt-4">
        {isAdmin || purchased ? (
          <div className="text-green-700">
            <strong>Coupon Code:</strong> {coupon.code}
          </div>
        ) : (
          <div className="text-red-700">
            You need to buy this coupon to get the code.
          </div>
        )}

        <div className="mt-2">
          {/* Redeem Coupon Button */}
          <button
            onClick={() => setRedeem(!redeem)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {redeem ? "Close Redeem" : "Redeem Coupon"}
          </button>
        </div>

        {/* Apply Coupon Component */}
        {redeem && (
          <ApplyCoupon
            coupon={coupon}
            orderTotal={orderTotal}
            onApplyCoupon={setOrderTotal}
            appliedCouponCodes={appliedCouponCodes}
            setAppliedCouponCodes={setAppliedCouponCodes}
          />
        )}
      </div>
    </li>
  );
};

export default SingleCoupon;
