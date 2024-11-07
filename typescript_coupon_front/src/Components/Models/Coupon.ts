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


  // testing
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
    code,
    createdByUserId,
    amount,
    isCombinable,
    creationDate,
    image,
  }:
  
  
  
  //another 1 
  {
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
  })
  
  
  {
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
    this.image = image;
    this.isAvailable = this.calculateAvailability();
  }

  // calc method 


  calculateDiscountedPrice(): number {
    if (this.discountType === "Percentage" && this.discount) {
      return this.price - (this.price * this.discount) / 100;
    } else if (this.discountType === "Amount" && this.discount) {
      return this.price - this.discount;
    }
    return this.price;
  }


  //check if avil
  calculateAvailability(): boolean {
    return this.amount > 0;
  }
}
