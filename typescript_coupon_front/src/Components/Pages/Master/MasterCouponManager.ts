export interface MasterCoupon {
  code: string;
  discountType: "Amount" | "Percentage";
  discountValue: number;
}

class MasterCouponManager {
  private masterCoupons: MasterCoupon[] = [
    {
      code: "MASTERFIXED100", // Fixed discount
      discountType: "Amount",
      discountValue: 100,
    },
    {
      code: "MASTERPERCENT50", // 50% off
      discountType: "Percentage",
      discountValue: 50,
    },
  ];

  // Get all master coupons
  getAllCoupons(): MasterCoupon[] {
    return [...this.masterCoupons];
  }

  // Apply a master coupon to an order total
  applyCoupon(
    inputCode: string,
    orderTotal: number
  ): { discountedPrice: number; discountAmount: number; isValid: boolean } {
    const coupon = this.masterCoupons.find((c) => c.code === inputCode);
    if (!coupon) {
      // Return without applying a discount
      return { discountedPrice: orderTotal, discountAmount: 0, isValid: false };
    }

    const discount =
      coupon.discountType === "Amount"
        ? coupon.discountValue
        : (coupon.discountValue / 100) * orderTotal;

    const discountedPrice = Math.max(orderTotal - discount, 0); // Prevent negative totals
    return { discountedPrice, discountAmount: discount, isValid: true };
  }

  // Generate a new unique master coupon
  generateCoupon(
    discountType: "Amount" | "Percentage",
    discountValue: number
  ): MasterCoupon {
    const code = `MASTER-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCoupon: MasterCoupon = { code, discountType, discountValue };
    this.masterCoupons.push(newCoupon);
    return newCoupon;
  }
}

export default new MasterCouponManager();
