import React, { useEffect, useState } from "react";
import { notify } from "../../Utils/notif";
import MasterCouponManager from "../Master/MasterCouponManager";
import "./DiscountCouponComponent.css";

//
interface Coupon {
  code: string;
  discountPercentage?: number;
}

// Initial total amount before any discounts 
const INITIAL_TOTAL = 100;

const DiscountCouponComponent: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<number>(INITIAL_TOTAL);
  const [couponCode, setCouponCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [purchaseCoupons, setPurchaseCoupons] = useState<Coupon[]>([]);

  const [masterCoupons, setMasterCoupons] = useState<Coupon[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("coupons");
    if (stored) {
      try {
        //string into an array of coupon objects
        setPurchaseCoupons(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing purchase coupons:", err);
      }
    }

    //load coupons from MasterCouponManager
    try {
      // Fetch master coupons and set them in state
      setMasterCoupons(MasterCouponManager.getAllCoupons());
    } catch (err) {
      console.error("Error fetching master coupons:", err);
    }
  }, []); // empty dependency array ensures this runs only once on mount

  const handleApplyCoupon = () => {
    // trim whitespace and convert the coupon code to lowercase
    const code = couponCode.trim().toLowerCase();

    if (!code) {
      setError("Please enter a coupon code");
      notify.error("Please enter a coupon code");
      return;
    }

    // search coupon in purchase oupons first
    const coupon =
      purchaseCoupons.find((c) => c.code.toLowerCase() === code) ||
      // If not found, search in master coupon to make sure we dont have onee
      masterCoupons.find((c) => c.code.toLowerCase() === code);

    if (!coupon) {
      setError("Invalid coupon code Please try again.");
      notify.error("Invalid coupon code!");
      return;
    }

    applyDiscount(
      coupon,
      purchaseCoupons.includes(coupon) ? "purchase" : "master"
    );
  };

  const applyDiscount = (coupon: Coupon, type: "purchase"| "master") => {
    try {
      let discountAmount: number, discountedPrice: number;

      if (type === "purchase") {
        // For Purchase Coupons, apply a flat 10% discount
        discountAmount = totalAmount * 0.1;
        discountedPrice = totalAmount - discountAmount;
      } else {
        const result = MasterCouponManager.applyCoupon(
          coupon.code,
          totalAmount
        );
        if (!result.isValid) {
          setError("Invalid coupon code, Please try again");
          notify.error("Invalid coupon code!");
          return;
        }
        //extract discount details from the result
        discountAmount = result.discountAmount;
        discountedPrice = result.discountedPrice;
      }

      setTotalAmount(discountedPrice);
      // clear any previous errors
      setError(null);
      notify.success(
        `Coupon applied! You saved ${discountAmount.toFixed(2)}.`
      );
    } catch (err) {
      console.error("Error applying coupon:", err);
      setError("An error occurred while applying the coupon");
      notify.error("An unexpected error occurred Please try again");
    }
  };

  // reset the total amount and clear all states
  const handleReset = () => {
    setTotalAmount(INITIAL_TOTAL); // reset to the initial total
    setCouponCode(""); // clear the coupon input field
    setError(null); // clear any error messages
    notify.success("Order total has been reset");
  };

  //render the list of coupons
  const renderCoupons = (coupons: Coupon[], title: string) => (
    <div className="available-coupons">
      <h4>{title}:</h4>
      {coupons.length ? (
        <ul>
          {coupons.map((coupon, idx) => (
            <li key={`${title}-${idx}`}>{coupon.code}</li>
          ))}
        </ul>
      ) : (
        <p>No {title.toLowerCase()} available</p>
      )}
    </div>
  );

  return (
    <div className="discount-coupon-container">
      <h3>Apply Your Discount Coupon</h3>

      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter your coupon code"
        className="coupon-input"
      />

      <div className="button-container">
        <button onClick={handleApplyCoupon} className="apply-coupon-button">
          Apply Coupon
        </button>
        <button onClick={handleReset} className="reset-coupon-button">
          Reset
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <p>
        <strong>Total Amount:</strong> ₪{totalAmount.toFixed(2)}
      </p>
      
      {renderCoupons(purchaseCoupons, "Purchase Coupons")}
      {renderCoupons(masterCoupons, "Master Coupons")}
    </div>
      //render the list of coupons

  );
};

export default DiscountCouponComponent;
