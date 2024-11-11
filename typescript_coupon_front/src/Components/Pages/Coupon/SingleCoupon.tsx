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
  const [isEdit, setIsEdit] = useState(false);

  return (
    <li key={coupon.id} className="coupon-item">
      {/* Coupon Basic Information */}
      <div>
        <strong>{coupon.name}</strong> - <strong>{coupon.title}</strong> -{" "}
        <strong>ID: {coupon.id}</strong>
      </div>

      {/* Description (only for admin) */}
      {isAdmin && <div>Description: {coupon.description}</div>}

      {/* Display Discount Information */}
      <div>Discount Type: {coupon.discountType || "Percentage"}</div>
      <div>
        Discount:{" "}
        {coupon.discountType === "Percentage"
          ? `${coupon.discount}%`
          : `$${coupon.discount}`}
      </div>

      {/* Price and Amount */}
      <div>
        Price: ${coupon.price !== undefined ? coupon.price : "Not Available"}
      </div>
      <div>Amount: {coupon.amount !== undefined ? coupon.amount : "N/A"}</div>

      {/* Category */}
      {coupon.category && <div>Category: {coupon.category}</div>}

      {/* Dates */}
      {coupon.startDate && (
        <div>
          Start Date: {new Date(coupon.startDate).toLocaleDateString()}
        </div>
      )}
      {coupon.endDate && (
        <div>
          End Date: {new Date(coupon.endDate).toLocaleDateString()}
        </div>
      )}

      {/* Display Coupon Code */}
      <div>Code: {coupon.code}</div>

      {/* New Fields */}
      <div>Is Combinable: {coupon.isCombinable ? "Yes" : "No"}</div>
      <div>Max Usage: {coupon.maxUsage}</div>
      <div>Current Usage: {coupon.currentUsage}</div>
      <div>Is Available: {coupon.isAvailable ? "Yes" : "No"}</div>
      <div>Created By User ID: {coupon.createdByUserId}</div>

      {/* Display Creation Date */}
      {coupon.creationDate && (
        <div>
          Creation Date: {new Date(coupon.creationDate).toLocaleString()}
        </div>
      )}

      {/* Delete Coupon */}
      <DeleteCoupon
        couponId={coupon.id}
        savedCoupons={savedCoupons}
        setSavedCoupons={setSavedCoupons}
      />

      {/* Edit Coupon */}
      <button onClick={() => setIsEdit(true)}>Edit</button>
      {isEdit && (
        <div>
          <AddCoupon couponToEdit={coupon} />
          <button onClick={() => setIsEdit(false)}>Cancel</button>
        </div>
      )}
    </li>
  );
};

export default SingleCoupon;
