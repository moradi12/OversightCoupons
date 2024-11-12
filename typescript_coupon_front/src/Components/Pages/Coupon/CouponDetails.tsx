import { Coupon } from "../../Models/Coupon";

interface CouponDetailsProps {
  coupon: Coupon;
  isAdmin: boolean;
}

const CouponDetails: React.FC<CouponDetailsProps> = ({ coupon, isAdmin }) => {
  return (
    <div className="coupon-details">
      <div>
        <strong>{coupon.name}</strong> - <strong>{coupon.title}</strong> -{" "}
        <strong>ID: {coupon.id}</strong>
      </div>

      {isAdmin && <div>Description: {coupon.description}</div>}

      <div>Discount Type: {coupon.discountType || "Percentage"}</div>
      <div>
        Discount:{" "}
        {coupon.discountType === "Percentage"
          ? `${coupon.discount}%`
          : `$${coupon.discount}`}
      </div>

      <div>
        Price: ${coupon.price !== undefined ? coupon.price : "Not Available"}
      </div>
      <div>
        Available Amount: {coupon.amount !== undefined ? coupon.amount : "N/A"}
      </div>

      {coupon.category && <div>Category: {coupon.category}</div>}

      {coupon.startDate && (
        <div>Start Date: {new Date(coupon.startDate).toLocaleDateString()}</div>
      )}
      {coupon.endDate && (
        <div>End Date: {new Date(coupon.endDate).toLocaleDateString()}</div>
      )}

      <div>Is Combinable: {coupon.isCombinable ? "Yes" : "No"}</div>
      <div>Max Usage: {coupon.maxUsage}</div>
      <div>Current Usage: {coupon.currentUsage}</div>
      <div>Created By User ID: {coupon.createdByUserId}</div>

      {coupon.creationDate && (
        <div>
          Creation Date: {new Date(coupon.creationDate).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default CouponDetails;
