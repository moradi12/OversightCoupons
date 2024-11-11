import axios from "axios";
import { useState } from "react";
import { Coupon } from "../../Models/Coupon";
import { notify } from "../../Utils/notif";
import "./EditCoupon.css";

const EditCoupon = ({ EditCoupon }: { EditCoupon: Coupon }) => {
  const [updatedCoupon, setUpdatedCoupon] = useState<Coupon>(EditCoupon);

  const validateCoupon = (): boolean => {
    const { name, description, discount, price, discountType } = updatedCoupon;

    if (!name.trim() || !description?.trim()) {
      return notify.error("Name and Description are required"), false;
    }

    if (
      (discountType === "Percentage" && (discount! <= 0 || discount! > 100)) ||
      (discountType === "Amount" && discount! <= 0)
    ) {
      const message =
        discountType === "Percentage"
          ? "Discount percentage must be between 1 and 100"
          : "Discount amount must be greater than 0";
      return notify.error(message), false;
    }

    if (price <= 0) {
      return notify.error("Price must be greater than 0"), false;
    }

    return true;
  };

  const handleInputChange = (field: keyof Coupon, value: any) => {
    setUpdatedCoupon((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateCoupon = () => {
    if (!validateCoupon()) return;

    axios
      .put(`/coupons/${updatedCoupon.id}`, updatedCoupon)
      .then(() => notify.success("Coupon updated successfully!"))
      .catch((error) => {
        console.error("Failed to update coupon:", error);
        notify.error("Failed to update coupon. Please try again");
      });
  };

  const renderInput = (
    label: string,
    field: keyof Coupon,
    type: string = "text",
    placeholder?: string,
    options?: string[] ) => ( <div className="input-group">
      <label className="input-label">{label}</label>
      {type === "select" && options ? (
        <select
          value={updatedCoupon[field] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="input-field"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={updatedCoupon[field] as string | number | undefined}
          placeholder={placeholder}
          onChange={(e) =>
            handleInputChange(
              field,
              type === "number" ? parseFloat(e.target.value) : e.target.value
            )
          }
          className="input-field"
        />
      )}
    </div>
  );

  return (
    <div className="update-coupon-container">
      <h2>Update Coupon</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateCoupon();
        }}
        className="update-coupon-form"
      >
        {renderInput("Coupon Name", "name", "text", "Enter the coupon name")}
        {renderInput(
          "Description",
          "description",
          "text",
          "Enter a description for the coupon"
        )}
        {renderInput("Discount Type", "discountType", "select", undefined, [
          "Percentage",
          "Amount",
        ])}
        {renderInput(
          updatedCoupon.discountType === "Percentage"
            ? "Discount (%)"
            : "Discount (Amount)",
          "discount",
          "number",
          updatedCoupon.discountType === "Percentage"
            ? "Enter the discount percentage"
            : "Enter the discount amount"
        )}
        {renderInput("Price", "price", "number", "Enter the price")}
        {renderInput(
          "Amount",
          "amount",
          "number",
          "Enter the number of coupons available"
        )}
        {renderInput("Start Date", "startDate", "date", undefined)}
        {renderInput("End Date", "endDate", "date", undefined)}
        <button type="submit" className="action-button update">
          Update Coupon
        </button>
      </form>
    </div>
  );
};

export default EditCoupon;
