import axios from "axios";
import { useEffect, useState } from "react";
import { Coupon } from "../../Models/Coupon";
import "./AddCoupon.css";

const AddCoupon = () => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    id: 0,
    name: "",
    description: "",
    discountType: "Percentage",
    discount: 0,
    startDate: new Date(),
    endDate: undefined,
    price: 0,
    createdByUserId: 1,
    amount: 0,
    isCombinable: true,
    creationDate: new Date(),
    image: null,
    code: "",
    maxUsage: 1,
    currentUsage: 0,
    isAvailable: true,
  });

  const [savedCoupons, setSavedCoupons] = useState<Coupon[]>([]);

  const validateCoupon = (): boolean => {
    const { name, description, discount, price, discountType } = newCoupon;

    if (!name.trim() || !description?.trim()) {
      alert("Name and Description are required");
      return false;
    }

    if (discountType === "Percentage" && (discount! <= 0 || discount! > 100)) {
      alert("Discount percentage must be between 1 and 100");
      return false;
    }

    if (discountType === "Amount" && discount! <= 0) {
      alert("Discount amount must be greater than 0");
      return false;
    }

    if (price <= 0) {
      alert("Price must be greater than 0");
      return false;
    }

    return true;
  };

  const handleSaveCoupon = async () => {
    if (!validateCoupon()) return;

    try {
      const updatedCoupons = [...savedCoupons, newCoupon];
      setSavedCoupons(updatedCoupons);
      localStorage.setItem("coupons", JSON.stringify(updatedCoupons));
      await saveCouponToServer(newCoupon);
      alert("Coupon added successfully!");
      setNewCoupon({
        ...newCoupon,
        name: "",
        description: "",
        discount: 0,
        price: 0,
      });
    } catch (error) {
      console.error("Failed to save coupon:", error);
      alert("Failed to save coupon. Please try again");
    }
  };

  const saveCouponToServer = async (coupon: Coupon) => {
    try {
      const response = await axios.post("/coupons", coupon);
      console.log("Coupon saved to server:", response.data);
    } catch (error) {
      console.error("Failed to save coupon to server:", error);
    }
  };

  useEffect(() => {
    const storedCoupons = localStorage.getItem("coupons");
    if (storedCoupons) setSavedCoupons(JSON.parse(storedCoupons));
  }, []);

  return (
    <div className="add-coupon-container">
      <h2>Add New Coupon</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveCoupon();
        }}
        className="add-coupon-form"
      >
        <label className="input-label">Coupon Name</label>
        <input
          type="text"
          placeholder="Enter the coupon name"
          value={newCoupon.name}
          onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
          className="input-field"
        />

        <label className="input-label">Description</label>
        <textarea
          placeholder="Enter a description for the coupon"
          value={newCoupon.description || ""}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, description: e.target.value })
          }
          className="input-field"
        />

        <label className="input-label">Discount Type</label>
        <select
          value={newCoupon.discountType}
          onChange={(e) =>
            setNewCoupon({
              ...newCoupon,
              discountType: e.target.value as "Amount" | "Percentage",
              discount: 0,
            })
          }
          className="input-field"
        >
          <option value="Percentage">Percentage</option>
          <option value="Amount">Amount</option>
        </select>

        <label className="input-label">
          {newCoupon.discountType === "Percentage"
            ? "Discount (%)"
            : "Discount (Amount)"}
        </label>
        <input
          type="number"
          placeholder={
            newCoupon.discountType === "Percentage"
              ? "Enter the discount percentage"
              : "Enter the discount amount"
          }
          value={newCoupon.discount || 0}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, discount: parseFloat(e.target.value) })
          }
          className="input-field"
        />

        <label className="input-label">Price</label>
        <input
          type="number"
          placeholder="Enter the price"
          value={newCoupon.price}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, price: parseFloat(e.target.value) })
          }
          className="input-field"
        />

        <label className="input-label">Amount</label>
        <input
          type="number"
          placeholder="Enter the number of coupons available"
          value={newCoupon.amount}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, amount: parseInt(e.target.value) })
          }
          className="input-field"
        />

        <label className="input-label">Start Date</label>
        <input
          type="date"
          value={newCoupon.startDate.toISOString().split("T")[0]}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, startDate: new Date(e.target.value) })
          }
          className="input-field"
        />
        <label className="input-label">End Date</label>
        <input
          type="date"
          placeholder="Enter the end date"
          value={newCoupon.endDate?.toISOString().split("T")[0] || ""}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, endDate: new Date(e.target.value) })
          }
          className="input-field"
        />
        <button type="submit" className="action-button save">
          Save Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
