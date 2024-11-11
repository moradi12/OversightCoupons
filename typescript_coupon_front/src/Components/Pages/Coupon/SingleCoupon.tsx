import { useEffect, useState } from "react";
import { Coupon } from "../../Models/Coupon";
import AdminActions from "../../Utils/AdminActions";
import { getCouponsFromLocalStorage } from "../../Utils/LocalStorageUtils";
import BuyCouponButton from "./BuyCouponButton";
import CouponCodeDisplay from "./CouponCodeDisplay";
import CouponDetails from "./CouponDetails";

interface SingleCouponProps {
  coupon: Coupon;
  savedCoupons: Coupon[];
  setSavedCoupons: (coupons: Coupon[]) => void;
  isAdmin: boolean;
}

const SingleCoupon: React.FC<SingleCouponProps> = ({
  coupon,
  savedCoupons,
  setSavedCoupons,
  isAdmin,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [purchased, setPurchased] = useState<boolean>(false);

  
  useEffect(() => {
    const loadedCoupons = getCouponsFromLocalStorage();
    setSavedCoupons(loadedCoupons);
  }, [setSavedCoupons]);

  return (
    <li key={coupon.id} className="coupon-item">
      <CouponDetails coupon={coupon} isAdmin={isAdmin} />

      {isAdmin && (
        <AdminActions
          coupon={coupon}
          savedCoupons={savedCoupons}
          setSavedCoupons={setSavedCoupons}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}

      <BuyCouponButton
        coupon={coupon}
        savedCoupons={savedCoupons}
        setSavedCoupons={setSavedCoupons}
        setPurchased={setPurchased}
      />

      <CouponCodeDisplay isAdmin={isAdmin} purchased={purchased} couponCode={coupon.code} />
    </li>
  );
};

export default SingleCoupon;
