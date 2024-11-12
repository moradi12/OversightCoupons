import { Coupon } from "../../Models/Coupon";

export class Report {
  private coupons: Coupon[];

  constructor(coupons: Coupon[]) {
    this.coupons = coupons;
  }

  // Get coupons created by a specific user
  public getCouponsByUser(userId: number): Coupon[] {
    return this.coupons.filter(coupon => coupon.createdByUserId === userId);
  }

  // Get coupons created within a specific date range
  public getCouponsByDateRange(startDate: Date, endDate: Date): Coupon[] {
    return this.coupons.filter(coupon => {
      const creationDate = new Date(coupon.creationDate);
      return creationDate >= startDate && creationDate <= endDate;
    });
  }

  // Get all used coupons
  public getUsedCoupons(): Coupon[] {
    return this.coupons.filter(coupon => coupon.currentUsage > 0);
  }

  // Get all available coupons
  public getAvailableCoupons(): Coupon[] {
    return this.coupons.filter(coupon => coupon.isAvailable && coupon.amount > 0);
  }

  // Get expired coupons
  public getExpiredCoupons(currentDate: Date = new Date()): Coupon[] {
    return this.coupons.filter(coupon => coupon.endDate && new Date(coupon.endDate) < currentDate);
  }

  // Sort coupons by creation date
  public sortByCreationDate(order: "asc" | "desc" = "asc"): Coupon[] {
    return [...this.coupons].sort((a, b) => {
      const dateA = new Date(a.creationDate).getTime();
      const dateB = new Date(b.creationDate).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  // Sort coupons by price
  public sortByPrice(order: "asc" | "desc" = "asc"): Coupon[] {
    return [...this.coupons].sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
  }

  // Validate a coupon code
  public validateCouponCode(code: string): Coupon | null {
    const coupon = this.coupons.find(
      c =>
        c.code === code &&
        c.isAvailable &&
        (!c.endDate || new Date(c.endDate) >= new Date())
    );

    if (!coupon) return null;

    // Ensure max usage limit is not exceeded
    if ((coupon.currentUsage ?? 0) >= coupon.maxUsage) return null;

    return coupon;
  }

  // Redeem a coupon
  public redeemCoupon(code: string, userId: number): { success: boolean; message: string } {
    const coupon = this.validateCouponCode(code);
    if (!coupon) {
      return { success: false, message: "Invalid or expired coupon code." };
    }

    // Check if the user has already redeemed the coupon
    if (coupon.redeemedBy?.includes(userId)) {
      return { success: false, message: "You have already redeemed this coupon." };
    }

    // Update redemption details
    coupon.currentUsage = (coupon.currentUsage ?? 0) + 1;
    coupon.redeemedBy = [...(coupon.redeemedBy ?? []), userId];

    // Mark coupon as unavailable if max usage is reached
    if (coupon.currentUsage >= coupon.maxUsage) {
      coupon.isAvailable = false;
    }

    // Persist changes to localStorage
    localStorage.setItem("coupons", JSON.stringify(this.coupons));

    return { success: true, message: "Coupon redeemed successfully!" };
  }

  // Generate a summary report
  public generateSummary(): string {
    const totalCoupons = this.coupons.length;
    const availableCoupons = this.getAvailableCoupons().length;
    const usedCoupons = this.getUsedCoupons().length;

    return `
      Total Coupons: ${totalCoupons}
      Available Coupons: ${availableCoupons}
      Used Coupons: ${usedCoupons}
    `;
  }
}
