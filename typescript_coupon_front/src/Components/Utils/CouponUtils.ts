import { Coupon } from "../Models/Coupon";

export class CouponUtils {

/// Master Coupon Discount
//MASTERPERCENT15
//MASTERFIXED20

  /**
   * Calculate the discounted price based on the discount type and value
   */
  static calculateDiscountedPrice(coupon: Coupon, orderTotal: number): number {
    const { discountType, discount } = coupon;

    if (discountType === "Percentage" && discount) {
      // Set the final price to the fixed value
      return discount;
    }
    
    if (discountType === "Percentage" && discount) {
      // Apply percentage discount
      return orderTotal * (1 - discount / 100);
    }

    if (discountType === "Amount" && discount) {
      // Apply fixed discount amount
      return Math.max(orderTotal - discount, 0); // Ensure the final price is not negative
    }

    // If no discount is applied, return the original order total
    return orderTotal;
  }

  /**
   * Check if the coupon is still available for usage
   */
  static calculateAvailability(coupon: Coupon): boolean {
    const { amount, currentUsage, maxUsage, endDate } = coupon;
    return (
      amount > 0 &&
      currentUsage < maxUsage &&
      (!endDate || new Date() <= endDate)
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
    coupon.isAvailable = CouponUtils.calculateAvailability(coupon);
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
