import { useEffect, useState } from "react";
import { Coupon } from "../../Models/Coupon";
import { handleCouponPurchase } from "../../Utils/CouponActions";
import { getCouponsFromLocalStorage } from "../../Utils/LocalStorageUtils";
import { notify } from "../../Utils/notif";
import AddCoupon from "../AddCoupon/AddCoupon";
// import ApplyCoupon from "../ApplyCoupon/ApplyCoupon";
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

  // Load coupons from local storage on mount
  useEffect(() => {
    const loadedCoupons = getCouponsFromLocalStorage();
    setSavedCoupons(loadedCoupons);
  }, [setSavedCoupons]);

  const handleBuyCoupon = async () => {
    try {
      if (coupon.amount > 0 && coupon.isAvailable) {
        await handleCouponPurchase(coupon, savedCoupons, setSavedCoupons);
        notify.success("Coupon purchased successfully!");

        // Mark the coupon as purchased so it can be displayed to the user
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

  return (
    <li key={coupon.id} className="coupon-item">
      {/* Coupon Details Component */}
      <CouponDetails coupon={coupon} isAdmin={isAdmin} />

      {/* Delete Coupon button - Admin only */}
      {isAdmin && (
        <DeleteCoupon
          couponId={coupon.id}
          savedCoupons={savedCoupons}
          setSavedCoupons={setSavedCoupons}
        />
      )}

      {/* Edit Coupon button - Admin only */}
      {isAdmin && (
        <>
          <button onClick={() => setIsEdit(true)}>Edit</button>
          {isEdit && (
            <div>
              <AddCoupon couponToEdit={coupon} />
              <button onClick={() => setIsEdit(false)}>Cancel</button>
            </div>
          )}
        </>
      )}

      {/* Buy Coupon button */}
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mt-2"
        onClick={handleBuyCoupon}
      >
        Buy Coupon
      </button>

      {isAdmin ? (
        <div className="mt-4">
          <strong>Coupon Code:</strong> {coupon.code}
        </div>
      ) : purchased ? (
        <div>
          <div className="mt-4 text-green-700">
            <strong>Coupon Code:</strong> {coupon.code}
          </div>
          <div>
            <button onClick={() => setRedeem(true)}>Redeem Coupon</button>
          </div>
          {redeem && (
            <div className="mt-4">
             
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 text-red-700">
          You need to buy this coupon to get the code.
        </div>
      )}
    </li>
  );
};

export default SingleCoupon;
