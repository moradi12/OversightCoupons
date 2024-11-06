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
  isStackable: boolean;
  createdAt: Date;

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
    isStackable: boolean,
    createdAt: Date
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
    this.isStackable = isStackable;
    this.createdAt = createdAt;
  }
}
