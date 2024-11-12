import React, { useState } from "react";
import "./MasterCouponComponent.css";
import MasterCouponManager, { MasterCoupon } from "./MasterCouponManager";

const MasterCouponComponent: React.FC = () => {
  const [orderTotal, setOrderTotal] = useState<number>(300); 
  const [inputCode, setInputCode] = useState<string>("");
  const [generatedCoupon, setGeneratedCoupon] = useState<MasterCoupon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // For apply coupon success

  const handleApplyCoupon = () => {
    try {
      const { discountedPrice, discountAmount } = MasterCouponManager.applyCoupon(
        inputCode,
        orderTotal
      );
      setOrderTotal(discountedPrice);
      setError(null); // Clear errors
      setSuccessMessage(`Coupon applied! You saved $${discountAmount.toFixed(2)}.`);
    } catch (e) {
      setError((e as Error).message);
      setSuccessMessage(null); // Clear success message on error
    }
  };

  const handleGenerateCoupon = () => {
    const newCoupon = MasterCouponManager.generateCoupon("Percentage", 20); 
    setGeneratedCoupon(newCoupon);
  };

  return (
    <div className="master-coupon-container">
      <h3>Master Coupon Manager</h3>

      {/* Input for Coupon Code */}
      <input
        type="text"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        placeholder="Enter master coupon code"
      />

      {/* Apply Coupon Button */}
      <button className="apply-button" onClick={handleApplyCoupon}>
        Apply Coupon
      </button>

      {/* Success Message */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Current Order Total */}
      <p>
        <strong>Order Total:</strong> ${orderTotal.toFixed(2)}
      </p>

      {/* Generate Coupon Button */}
      <button className="generate-button" onClick={handleGenerateCoupon}>
        Generate New Master Coupon
      </button>

      {/* Display Generated Coupon */}
      {generatedCoupon && (
        <p className="generated-coupon">
          <strong>Generated Coupon:</strong> {generatedCoupon.code} (
          {generatedCoupon.discountType} - {generatedCoupon.discountValue}
          {generatedCoupon.discountType === "Percentage" ? "%" : "$"})
        </p>
      )}
    </div>
  );
};

export default MasterCouponComponent;
