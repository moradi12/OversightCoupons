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

  constructor(
    id: number,
    name: string,
    description: string,
    category: CouponCategory,
    discountType: "Amount" | "Percentage" | undefined,
    discount: number | undefined,
    title: string,
    startDate: Date,
    endDate: Date | undefined,
    price: number,
    code: string,
    createdByUserId: number,
    amount: number,
    isCombinable: boolean,
    creationDate: Date
  ) {
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
    this.code = code;
    this.createdByUserId = createdByUserId;
    this.amount = amount;
    this.isCombinable = isCombinable;
    this.creationDate = creationDate;
  }

  calculateDiscountedPrice(): number {
    if (this.discountType === "Percentage" && this.discount) {
      return this.price - (this.price * this.discount) / 100;
    } else if (this.discountType === "Amount" && this.discount) {
      return this.price - this.discount;
    }
    return this.price;
  }
}