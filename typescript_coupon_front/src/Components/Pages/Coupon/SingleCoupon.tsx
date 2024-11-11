import { useState } from "react";
import { Coupon } from "../../Models/Coupon";
import AddCoupon from "../AddCoupon/AddCoupon";
import { DeleteCoupon } from "../DeleteCoupon/DeleteCoupon";

const SingleCoupon = ({
  coupon,
  savedCoupons,
  setSavedCoupons,
  isAdmin,
}: {
  coupon: Coupon;
  savedCoupons: Coupon[];
  setSavedCoupons: (coupons: Coupon[]) => void;
  isAdmin: boolean;
}) => {
  // State to manage whether the edit form is displayed
  const [isEdit, setIsEdit] = useState(false);

  return (
    // Each coupon is rendered as a list item
    <li key={coupon.id} className="coupon-item">
      {/* Display coupon name, title, and ID */}
      <div>
        <strong>{coupon.name}</strong> - <strong>{coupon.title}</strong> -{" "}
        <strong>{coupon.id}</strong>
      </div>
      {/* Display description if the user is an admin */}
      {isAdmin && <div>Description: {coupon.description}</div>}
      {/* Display discount type */}
      <div>Discount Type: {coupon.discountType || "Percentage"}</div>

      {/* Display discount value */}
      <div>Discount: {coupon.discount}%</div>

      {/* Display price */}
      <div>
        Price: ${coupon.price !== undefined ? coupon.price : "Not Available"}
      </div>

      {/* Display amount */}
      <div>
        Amount: {coupon.amount !== undefined ? coupon.amount : "Not Available"}
      </div>

      {/* Display category if it exists */}
      {coupon.category && <div>Category: {coupon.category}</div>}

      {/* Display start date */}
      {coupon.startDate && (
        <div>Start Date: {new Date(coupon.startDate).toLocaleDateString()}</div>
      )}
      {/* Display end date on a new line */}
      {coupon.endDate && (
        <div>End Date: {new Date(coupon.endDate).toLocaleDateString()}</div>
      )}

      {/* Delete coupon button and functionality */}
      <DeleteCoupon
        couponId={coupon.id}
        savedCoupons={savedCoupons}
        setSavedCoupons={setSavedCoupons}
      />

      {/* Button to toggle the edit form */}
      <button onClick={() => setIsEdit(true)}>Edit</button>

      {/* Edit form displayed when isEdit is true */}
      {isEdit && (
        <div>
          {/* Reuse AddCoupon component for editing, passing the coupon to edit */}
          <AddCoupon couponToEdit={coupon} />

          {/* Button to cancel editing */}
          <button onClick={() => setIsEdit(false)}>Cancel</button>
        </div>
      )}
    </li>
  );
};

export default SingleCoupon;
