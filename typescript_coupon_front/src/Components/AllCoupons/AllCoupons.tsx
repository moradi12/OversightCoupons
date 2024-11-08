import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../Models/Coupon";
import { getAllCoupons } from "../Utils/CouponsCommands";

export function AllCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [purchaseError, setPurchaseError] = useState<string | null>(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     fetchCoupons();
    // }, []);

    const fetchCoupons = () => {
        getAllCoupons()
            .then(response => setCoupons(response))
            .catch(error => console.error("Error fetching coupons:", error));
    };

    const handleEdit = (couponId: number) => {
        navigate(`/editCoupon/${couponId}`);
    };

    return (
        <div className="AllCoupons">
            <h1>Coupons</h1>
            {purchaseError && <p className="error-message">{purchaseError}</p>}
            <div className="coupon-list">
                {coupons.map(coupon => (
                    <div key={coupon.id} className="coupon-item">
                        <button onClick={() => handleEdit(coupon.id)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
