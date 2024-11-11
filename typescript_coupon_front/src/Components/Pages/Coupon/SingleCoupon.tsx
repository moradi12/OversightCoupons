import { useState } from "react";
import { Coupon } from "../../Models/Coupon";
import { deleteCoupon } from "../../Utils/CouponsCommands";
import AddCoupon from "../AddCoupon/AddCoupon";

const SingleCoupon = ({ coupon }: { coupon: Coupon }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <li key={coupon.id} className="coupon-item">
      <div>
        <strong>{coupon.name}</strong> - <strong>{coupon.title}</strong> - <strong>{coupon.id}</strong>
      </div>
      <div>Description: {coupon.description}</div>
      <div>Discount Type: {coupon.discountType || "Percentage"}</div>
      <div>Discount: {coupon.discount}%</div>
      <div>
        Price: ${coupon.price !== undefined ? coupon.price : "Not Available"}
      </div>
      <div>Amount: {coupon.amount !== undefined ? coupon.amount : "N/A"}</div>
      {coupon.category && <div>Category: {coupon.category}</div>}
      {coupon.startDate && <div>Start Date: {coupon.startDate.toString()}</div>}
      {coupon.endDate && <div>End Date: {coupon.endDate.toString()}</div>}
      <button onClick={() => deleteCoupon(coupon.id)}>Delete</button>
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
