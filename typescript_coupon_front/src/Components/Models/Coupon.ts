import { CouponCategory } from "./CouponCategory ";

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
    code?: string; //  auto-generated if not provided!
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

    // auto-generate code if not provided
    this.code = code || this.generateCode();
  }

  // Calculate discounted price
  calculateDiscountedPrice(): number {
    if (this.discountType === "Percentage" && this.discount) {
      return this.price - (this.price * this.discount) / 100;
    } else if (this.discountType === "Amount" && this.discount) {
      return this.price - this.discount;
    }
    return this.price;
  }

  // Check if available
  calculateAvailability(): boolean {
    return this.amount > 0;
  }

  // Generate a random unique code
  private generateCode(): string {
    const timestamp = Date.now().toString();
    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit random number!!
    return `${timestamp}-${randomDigits}`;
  }
}
