import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../Models/Coupon";
import { CouponCategory } from "../../Models/CouponCategory ";
import "./AddCoupon.css";

export function AddCoupon(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<Coupon>();
  const navigate = useNavigate();

  const addCoupon: SubmitHandler<any> = (data) => {
    axios.post("http://localhost:8080/add/coupons", data)
      .then((response) => {
        console.log("Coupon added successfully:", response.data);
        navigate("/all");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server error:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <div className="add-coupon">
      <h2>Add New Coupon</h2>
      <form onSubmit={handleSubmit(addCoupon)}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input id="title" {...register("title", { required: "Title is required" })} />
          {errors.title && <span className="error">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <span className="error">{errors.description.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            {Object.values(CouponCategory).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="discountType">Discount Type:</label>
          <select
            id="discountType"
            {...register("discountType", { required: "Discount type is required" })}
          >
            <option value="">Select a discount type</option>
            <option value="Amount">Amount</option>
            <option value="Percentage">Percentage</option>
          </select>
          {errors.discountType && <span className="error">{errors.discountType.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="discount">Discount Value:</label>
          <input
            type="number"
            id="discount"
            {...register("discount")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            {...register("startDate", { required: "Start date is required" })}
          />
          {errors.startDate && <span className="error">{errors.startDate.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            {...register("endDate", { required: "End date is required" })}
          />
          {errors.endDate && <span className="error">{errors.endDate.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            {...register("amount", { required: "Amount is required", min: 1 })}
          />
          {errors.amount && <span className="error">{errors.amount.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            step="0.01"
            id="price"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <span className="error">{errors.price.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="createdByUserId">Created By User ID:</label>
          <input
            type="number"
            id="createdByUserId"
            {...register("createdByUserId", { required: "Creator ID is required" })}
          />
          {errors.createdByUserId && <span className="error">{errors.createdByUserId.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="isCombinable">Is Combinable:</label>
          <select
            id="isCombinable"
            {...register("isCombinable", { required: "Combinability is required" })}
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.isCombinable && <span className="error">{errors.isCombinable.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            {...register("image")}
          />
        </div>
        <div className="form-group">
  <label htmlFor="maxUsage">Maximum Usage:</label>
  <input
    type="number"
    id="maxUsage"
    {...register("maxUsage", { required: "Maximum usage is required", min: 1 })}
  />
  {errors.maxUsage && <span className="error">{errors.maxUsage.message}</span>}
</div>

        <button type="submit" className="submit-button">Add Coupon</button>
      </form>
    </div>
  );
}
