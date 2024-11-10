import React, { useEffect, useState } from "react";
import { Coupon } from "../../Models/Coupon";
import { getAllCoupons } from "../../Utils/CouponsCommands";
const CouponsDisplay: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const allCoupons = await getAllCoupons();
        setCoupons(allCoupons);
      } catch (err: any) {
        setError(err.message);}};
    fetchCoupons(); }, []);
  return (
    <div>
      <h2>All Coupons</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : coupons.length === 0 ? (
        <p>No coupons available.</p>
      ) : (
        <ul>
          {coupons.map((coupon) => (
            <li key={coupon.id}>
              <strong>{coupon.name}</strong>: {coupon.description} (
              {coupon.discountType})
            </li> ))}</ul>)} </div>
  );
};
export default CouponsDisplay;
