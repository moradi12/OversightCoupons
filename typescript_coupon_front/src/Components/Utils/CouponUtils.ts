import { Coupon } from "../Models/Coupon";

const MASTER_CODES = [
  { code: "MASTER50", discountType: "Amount", discountValue: 50 },
  { code: "MASTER30", discountType: "Amount", discountValue: 30 },
];

export class CouponUtils {
  /**
   * Calculate the discounted price based on the discount type and value
   */
  static calculateDiscountedPrice(coupon: Coupon, orderTotal: number): { discountedPrice: number; discountAmount: number } {
    let discountAmount = 0;

    if (coupon.discountType === "Percentage" && coupon.discount) {
      discountAmount = (coupon.discount / 100) * orderTotal;
    } else if (coupon.discountType === "Amount" && coupon.discount) {
      discountAmount = coupon.discount;
    }

    const discountedPrice = Math.max(orderTotal - discountAmount, 0); // Ensure the final price is not negative
    return { discountedPrice, discountAmount };
  }

  /**
   * Apply a coupon or master code to the order total
   */
  static applyCoupon(
    inputCode: string,
    coupon: Coupon,
    orderTotal: number
  ): { discountedPrice: number; discountAmount: number } {
    // Check master codes
    const masterCode = MASTER_CODES.find((mc) => mc.code === inputCode);
    if (masterCode) {
      const discountAmount = masterCode.discountType === "Percentage"
        ? (masterCode.discountValue / 100) * orderTotal
        : masterCode.discountValue;
      const discountedPrice = Math.max(orderTotal - discountAmount, 0);
      return { discountedPrice, discountAmount };
    }

    // Check regular coupon
    if (inputCode === coupon.code && coupon.isAvailable) {
      return this.calculateDiscountedPrice(coupon, orderTotal);
    }

    throw new Error("Invalid or unavailable coupon.");
  }

  /**
   * Check if the coupon is still available for usage
   */
  static calculateAvailability(coupon: Coupon): boolean {
    const { amount, currentUsage, maxUsage, endDate } = coupon;
    return (
      amount > 0 &&
      currentUsage < maxUsage &&
      (!endDate || new Date() <= new Date(endDate))
    );
  }

  /**
   * Increment the usage count of the coupon if it can still be used
   */
  static incrementUsage(coupon: Coupon): void {
    if (coupon.isMasterCoupon) {
      // Master coupons have unlimited usage, do nothing here
      return;
    }

    if (!coupon.isAvailable) {
      throw new Error("Coupon is not available.");
    }
    if (coupon.currentUsage >= coupon.maxUsage) {
      throw new Error("Coupon has reached its maximum usage limit.");
    }
    coupon.currentUsage++;
    coupon.isAvailable = this.calculateAvailability(coupon);
  }

  /**
   * Generate a random unique code for the coupon
   */
  static generateCode(): string {
    const timestamp = Date.now().toString();
    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
    return `${timestamp}-${randomDigits}`;
  }

  /**
   * Determine if the coupon can be combined with other offers
   */
  static canCombine(coupon: Coupon): boolean {
    return coupon.isCombinable;
  }
}
