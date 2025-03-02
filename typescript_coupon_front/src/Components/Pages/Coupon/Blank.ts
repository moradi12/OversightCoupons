import { Coupon } from "../../Models/Coupon";

//Defines a pre-set structure with default values for all Coupon model properties, 
//minimizing the risk of runtime errors caused by missing or undefined fields when creating new coupons!!
export const blankCoupon: Coupon = {
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
    isMasterCoupon : true,
  };