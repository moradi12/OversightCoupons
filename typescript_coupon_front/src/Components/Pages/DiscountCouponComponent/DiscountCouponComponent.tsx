import React, { useEffect, useState } from "react";
import { notify } from "../../Utils/notif";
import MasterCouponManager from "../Master/MasterCouponManager";
import "./DiscountCouponComponent.css";

const DiscountCouponComponent: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<number>(100); // Initial order total
  const [couponCode, setCouponCode] = useState<string>(""); // Input field for coupon code
  const [error, setError] = useState<string | null>(null); // Error messages
  const [availableCoupons, setAvailableCoupons] = useState<string[]>([]); // List of available coupon codes

  useEffect(() => {
    // Fetch all available coupons on component mount
    const allCoupons = MasterCouponManager.getAllCoupons().map(
      (coupon) => coupon.code
    );
    setAvailableCoupons(allCoupons);
  }, []);

  const handleApplyCoupon = () => {
    try {
      const { discountedPrice, discountAmount, isValid } =
        MasterCouponManager.applyCoupon(couponCode, totalAmount);

      if (!isValid) {
        setError("Invalid coupon code. Please try again.");
        notify.error("Invalid coupon code!");
        return;
      }

      setTotalAmount(discountedPrice); // Update the total amount
      setError(null); // Clear error messages
      notify.success(
        `Coupon applied! You saved ₪${discountAmount.toFixed(2)}.`
      );
    } catch (e) {
      setError("An error occurred while applying the coupon.");
      notify.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleReset = () => {
    setTotalAmount(100); // Reset to the initial amount
    setCouponCode(""); // Clear the input field
    setError(null); // Clear any error messages
    notify.success("Order total has been reset.");
  };

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

      {/* Display all available coupon codes */}
      <div className="available-coupons">
        <h4>Available Coupons:</h4>
        <ul>
          {availableCoupons.map((code, index) => (
            <li key={index}>{code}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscountCouponComponent;
