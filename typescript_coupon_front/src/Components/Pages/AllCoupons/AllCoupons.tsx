import { Component } from "react";
import "./AllCoupons.css";
// import axios from "axios"; // Uncomment when integrating backend

// Define the structure of a coupon
interface Coupon {
  id: number;
  title: string;
  description: string;
  discount: number;
  category?: string;
  price?: number;
}
interface AllCouponsState {
  coupons: Coupon[];
}
class AllCoupons extends Component<{}, AllCouponsState> {
  state: AllCouponsState = {
    coupons: [],
  };

  componentDidMount() {
    this.loadCoupons();
  }

  loadCoupons = () => {
    try {
      const storedCoupons = localStorage.getItem("coupons");
      if (storedCoupons) {
        const coupons = JSON.parse(storedCoupons).map(
          (coupon: Coupon, index: number) => ({
            ...coupon,
            id: coupon.id || index, // Ensure each coupon has a unique ID
          })
        );

        this.setState({ coupons });
        console.log("Coupons loaded from localStorage:", coupons);
      }
    } catch (error) {
      console.error("Error loading coupons:", error);
    }
  };

  render() {
    const { coupons } = this.state;

    return (
      <div className="all-coupons-container">
        <h2>All Coupons</h2>
        {coupons.length === 0 ? (
          <p>No coupons available.</p>
        ) : (
          <ul className="coupon-list">
            {coupons.map((coupon) => (
              <li key={coupon.id} className="coupon-item">
                <strong>{coupon.title}</strong>: {coupon.description} (
                {coupon.discount}% off)
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default AllCoupons;
