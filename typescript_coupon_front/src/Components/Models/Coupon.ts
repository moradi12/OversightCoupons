import { CouponCategory } from "../Models/CouponCategory ";

export class Coupon {
  id: number;
  name: string;
  description?: string;
  category: CouponCategory;
  discountType: "Amount" | "Percentage" | undefined;
  discount?: number;
  title: string;
  startDate: Date;
  endDate?: Date;
  price: number;
  code: string;
  createdByUserId: number;
  amount: number;
  isCombinable: boolean;
  creationDate: Date;
  image: any;
  isAvailable: boolean;
  maxUsage: number; 
  currentUsage: number; 

  constructor({
    id,
    name,
    description,
    category,
    discountType,
    discount,
    title,
    startDate,
    endDate,
    price,
    createdByUserId,
    amount,
    isCombinable,
    creationDate,
    image,
    code,
    maxUsage,
    currentUsage = 0, 
  }: {
    id: number;
    name: string;
    description?: string;
    category: CouponCategory;
    discountType: "Amount" | "Percentage" | undefined;
    discount?: number;
    title: string;
    startDate: Date;
    endDate?: Date;
    price: number;
    createdByUserId: number;
    amount: number;
    isCombinable: boolean;
    creationDate: Date;
    image: any;
    code?: string; // Auto-generated if not provided
    maxUsage: number; 
    currentUsage?: number; 
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.discountType = discountType;
    this.discount = discount;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.createdByUserId = createdByUserId;
    this.amount = amount;
    this.isCombinable = isCombinable;
    this.creationDate = creationDate;
    this.image = image;
    this.isAvailable = this.calculateAvailability();
    this.maxUsage = maxUsage;
    this.currentUsage = currentUsage;

    // Auto-generate code if not provided!!!!
    this.code = code || this.generateCode();
  }

  /**
   * Calculate the discounted price based on the discount type and value
   */
  calculateDiscountedPrice(): number {
    if (this.discountType === "Percentage" && this.discount) {
      return this.price - (this.price * this.discount) / 100;
    } else if (this.discountType === "Amount" && this.discount) {
      return this.price - this.discount;
    }
    return this.price;
  }

  /**
   * Check if the coupon is still available for usage.
   */
  calculateAvailability(): boolean {
    return this.amount > 0 && this.currentUsage < this.maxUsage;
  }

  /**
   * Increment the usage count of the coupon if it can still be used
   */
  incrementUsage(): void {
    if (this.currentUsage >= this.maxUsage) {
      throw new Error("Coupon has reached its maximum usage limit.");
    }
    this.currentUsage++;
  }

  /**
   * Generate a random unique code for the coupon
   */
  private generateCode(): string {
    const timestamp = Date.now().toString();
    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit random number
    return `${timestamp}-${randomDigits}`;
  }

  /**
   * Determine if the coupon can be combined with other offers
   */
  canCombine(): boolean {
    return this.isCombinable;
  }
}
