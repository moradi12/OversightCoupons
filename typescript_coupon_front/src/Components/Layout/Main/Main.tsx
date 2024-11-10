import { useEffect, useState } from "react";
import { Coupon } from "../../Models/Coupon";
import { getAllCoupons } from "../../Utils/CouponsCommands";
//todo : finish 

export function Main(): JSX.Element {
  return (
    <div className="Main">
      <h1></h1>
      <AllCoupons />
    </div>
  );
}

export function AllCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCoupons()
      .then((data) => {
        setCoupons(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to fetch coupons");
      });
  }, []);

  return (
    <div className="AllCoupons">
      <h2>All Coupons</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      
      <div className="coupon-list">
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <div key={coupon.id} className="coupon-card">
              <p>{coupon.description}</p>
              <p>Price: ${coupon.price}</p>
              {/* <p>Available: {coupon.isAvailable ? "Yes" : "No"}</p> */}
            </div>
          ))
        ) : (
          <p>No coupons available.</p>
        )}
      </div>
    </div>
  );
}
