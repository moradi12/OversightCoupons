import { useEffect, useState } from "react";
import { Coupon } from "../../Models/Coupon";
import SingleCoupon from "../Coupon/SingleCoupon";
import "./AllCoupons.css";

const AllCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    try {
      const storedCoupons = localStorage.getItem("coupons");
      if (storedCoupons) {
        const parsedCoupons: Coupon[] = JSON.parse(storedCoupons).map(
          (coupon: Coupon, index: number) => ({
            ...coupon,
            id: coupon.id || index, // Ensure each coupon has a unique ID
          })
        );
        setCoupons(parsedCoupons);
        console.log("Coupons loaded from localStorage:", parsedCoupons);
      }
    } catch (error) {
      console.error("Error loading coupons:", error);
    }
  };

  return (
    <div className="all-coupons-container">
      <h2>All Coupons</h2>
      {coupons.length === 0 ? (
        <p>No coupons available.</p>
      ) : (
        <ul className="coupon-list">
          {coupons.map((coupon) => (
            <SingleCoupon coupon={coupon} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllCoupons;
