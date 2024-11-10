import { useEffect, useState } from "react";
import { notify } from "../../Utils/notif";
import "./AllCoupons.css";

// Define the structure of a coupon
interface Coupon {
  id: number;
  name: string;
  title: string;
  description: string;
  discount: number;
  discountType?: string;
  category?: string;
  price?: number;
  amount?: number;
  startDate?: string;
  endDate?: string;
}

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

  const deleteCoupon = (id: number) => {
    try {
      const updatedCoupons = coupons.filter((coupon) => coupon.id !== id);
      setCoupons(updatedCoupons);
      localStorage.setItem("coupons", JSON.stringify(updatedCoupons));
      notify.success(`Coupon with id ${id} deleted successfully`);
      console.log(`Coupon with id ${id} deleted`);
    } catch (error) {
      notify.error(`Failed to delete coupon with id ${id}`);
      console.error("Error deleting coupon:", error);
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
            <li key={coupon.id} className="coupon-item">
              <div>
                <strong>{coupon.name}</strong> - <strong>{coupon.title}</strong>
              </div>
              <div>Description: {coupon.description}</div>
              <div>Discount Type: {coupon.discountType || "Percentage"}</div>
              <div>Discount: {coupon.discount}%</div>
              <div>Price: ${coupon.price !== undefined ? coupon.price : "Not Available"}</div>
              <div>Amount: {coupon.amount !== undefined ? coupon.amount : "N/A"}</div>
              {coupon.category && <div>Category: {coupon.category}</div>}
              {coupon.startDate && <div>Start Date: {coupon.startDate}</div>}
              {coupon.endDate && <div>End Date: {coupon.endDate}</div>}
              <button onClick={() => deleteCoupon(coupon.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllCoupons;
