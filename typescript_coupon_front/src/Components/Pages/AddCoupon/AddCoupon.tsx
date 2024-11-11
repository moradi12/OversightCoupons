import { useEffect, useState } from "react";
import { Coupon } from "../../Models/Coupon";
import { notify } from "../../Utils/notif";
import "./AddCoupon.css";

const blankCoupon: Coupon = {
  id: 0,
  title: "",
  category: "",
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
};

const AddCoupon = ({ couponToEdit }: { couponToEdit: Coupon | null }) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(
    couponToEdit || blankCoupon
  );
  const [savedCoupons, setSavedCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const storedCoupons = localStorage.getItem("coupons");
    if (storedCoupons) setSavedCoupons(JSON.parse(storedCoupons));
  }, []);

  const validateCoupon = (): boolean => {
    const { name, description, discount, price, discountType } = newCoupon;

    if (!name.trim() || !description?.trim()) {
      notify.error("Name and Description are required");
      return false;
    }

    if (discountType === "Percentage" && (discount! <= 0 || discount! > 100)) {
      notify.error("Discount percentage must be between 1 and 100");
      return false;
    }

    if (discountType === "Amount" && discount! <= 0) {
      notify.error("Discount amount must be greater than 0");
      return false;
    }

    if (price <= 0) {
      notify.error("Price must be greater than 0");
      return false;
    }

    return true;
  };

  const changeCoupon = () => {
    const couponsAfterUpdate = savedCoupons.map((coupon) =>
      coupon.id === couponToEdit?.id ? newCoupon : coupon
    );
    setSavedCoupons(couponsAfterUpdate);
    localStorage.setItem("coupons", JSON.stringify(couponsAfterUpdate));
    notify.success("Coupon updated successfully!");
  };

  const addCoupon = () => {
    const newCouponWithId ={
      ...newCoupon,
      id:
        savedCoupons.length > 0
          ? savedCoupons[savedCoupons.length - 1].id + 1
          : 1,
    }
    setSavedCoupons([...savedCoupons, newCouponWithId]);
    localStorage.setItem(
      "coupons",
      JSON.stringify([...savedCoupons, newCouponWithId])
    );
    setNewCoupon(blankCoupon); // Reset to blank coupon
    notify.success("Coupon added successfully!");
  };

  const handleSaveCoupon = () => {
    if (!validateCoupon()) return;

    try {
      couponToEdit ? changeCoupon() : addCoupon();
    } catch (error) {
      console.error("Failed to save coupon:", error);
      notify.error("Failed to save coupon. Please try again");
    }
  };

  return (
    <div className="add-coupon-container">
      <h2>{couponToEdit ? "Edit Coupon" : "Add New Coupon"}</h2>
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
          value={newCoupon.startDate.toString().split("T")[0]}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, startDate: new Date(e.target.value) })
          }
          className="input-field"
        />
        <label className="input-label">End Date</label>
        <input
          type="date"
          placeholder="Enter the end date"
          value={newCoupon.endDate?.toString().split("T")[0] || ""}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, endDate: new Date(e.target.value) })
          }
          className="input-field"
        />
        <button type="submit" className="action-button save">
          {couponToEdit ? "Update Coupon" : "Save Coupon"}
        </button>
      </form>
    </div>
  );
};

export default AddCoupon;
