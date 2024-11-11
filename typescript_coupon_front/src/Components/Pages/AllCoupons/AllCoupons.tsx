import React, { useEffect, useState } from "react";
import { Coupon } from "../../Models/Coupon";
import SingleCoupon from "../Coupon/SingleCoupon";
import "./AllCoupons.css";

const AllCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const userEmail = localStorage.getItem("userEmail");
  const isAdmin = userEmail === "admin@admin.com";

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
            id: coupon.id || index,
            createdByUserId: coupon.createdByUserId || 0,
            isCombinable:
              coupon.isCombinable !== undefined ? coupon.isCombinable : true,
            creationDate: coupon.creationDate
              ? new Date(coupon.creationDate)
              : new Date(),
            code: coupon.code || "",
            maxUsage: coupon.maxUsage || 1,
            currentUsage: coupon.currentUsage || 0,
            isAvailable:
              coupon.isAvailable !== undefined ? coupon.isAvailable : true,
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
            <SingleCoupon
              key={coupon.id}
              coupon={coupon}
              savedCoupons={coupons}
              setSavedCoupons={setCoupons}
              isAdmin={isAdmin} // Only admin can see certain fields
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllCoupons;
