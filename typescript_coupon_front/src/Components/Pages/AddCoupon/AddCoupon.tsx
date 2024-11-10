import axios from "axios"; // Placeholder for future Axios use
import { useEffect, useState } from "react";
import "./AddCoupon.css";

const AddCoupon = () => {
  const [newCoupon, setNewCoupon] = useState({
    title: "",
    description: "",
    discount: 0,
  });

  const [savedCoupons, setSavedCoupons] = useState<
    { title: string; description: string; discount: number }[]
  >([]);

  /**
   * Validates the input for the coupon.
   * Ensures title, description, and discount are valid.
   */
  const validateCoupon = (): boolean => {
    const { title, description, discount } = newCoupon;

    if (!title.trim() || !description.trim()) {
      alert("Both title and description are required.");
      return false;
    }

    if (discount <= 0 || discount > 100) {
      alert("Discount must be between 1 and 100.");
      return false;
    }

    return true;
  };

  /**
   * Save a new coupon.
   * Updates the state and localStorage and prepares for future Axios integration.
   */
  const handleSaveCoupon = async () => {
    if (!validateCoupon()) return;

    try {
      const updatedCoupons = [...savedCoupons, newCoupon];
      setSavedCoupons(updatedCoupons);

      // Save to localStorage
      localStorage.setItem("coupons", JSON.stringify(updatedCoupons));

      // Placeholder for future Axios request
      await saveCouponToServer(newCoupon);

      console.log("Coupon added:", newCoupon);
      alert("Coupon added successfully!");

      // Clear the form
      setNewCoupon({ title: "", description: "", discount: 0 });
    } catch (error) {
      console.error("Failed to save coupon:", error);
      alert("Failed to save coupon. Please try again.");
    }
  };

  /**
   * Placeholder function for Axios integration.
   * Prepares for saving to a backend server in the future.
   */
  const saveCouponToServer = async (coupon: {
    title: string;
    description: string;
    discount: number;
  }) => {
    try {
      // Simulate an Axios POST request
      const response = await axios.post("/api/coupons", coupon);
      console.log("Coupon saved to server:", response.data);
    } catch (error) {
      console.error("Failed to save coupon to server:", error);
      // Optionally, handle Axios-specific errors here
    }
  };

  /**
   * Load coupons from localStorage on component mount.
   */
  useEffect(() => {
    const storedCoupons = localStorage.getItem("coupons");
    if (storedCoupons) {
      setSavedCoupons(JSON.parse(storedCoupons));
    }
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
        <input
          type="text"
          placeholder="Coupon Title"
          value={newCoupon.title}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, title: e.target.value })
          }
          className="input-field"
        />
        <textarea
          placeholder="Coupon Description"
          value={newCoupon.description}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, description: e.target.value })
          }
          className="input-field"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={newCoupon.discount}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, discount: parseFloat(e.target.value) })
          }
          className="input-field"
        />
        <button type="submit" className="action-button save">
          Save Coupon
        </button>
      </form>

      <h3>Saved Coupons</h3>
      <ul className="coupon-list">
        {savedCoupons.map((coupon, index) => (
          <li key={index} className="coupon-item">
            <strong>{coupon.title}</strong>: {coupon.description} (
            {coupon.discount}% off)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCoupon;
