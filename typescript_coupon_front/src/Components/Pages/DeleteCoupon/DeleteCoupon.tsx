import { Coupon } from '../../Models/Coupon';
import { notify } from '../../Utils/notif';

interface DeleteCouponProps {
  couponId: number;
  savedCoupons: Coupon[];
  setSavedCoupons: (coupons: Coupon[]) => void;
}

export const DeleteCoupon = ({ couponId, savedCoupons, setSavedCoupons }: DeleteCouponProps) => {
  const deleteCoupon = (id: number) => {
    try {
      const updatedCoupons = savedCoupons.filter((coupon: Coupon) => coupon.id !== id);
      setSavedCoupons(updatedCoupons);
      localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
      notify.success('Coupon deleted successfully!');
    } catch (error) {
      console.error('Failed to delete coupon:', error);
      notify.error('Failed to delete coupon. Please try again');
    }
  };

  return (
    <div>
      <button onClick={() => deleteCoupon(couponId)}>Delete Coupon</button>
    </div>
  );
};
