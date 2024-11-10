import { CouponUtils } from "../Utils/CouponUtils";

export class Coupon {
  id: number;
  name: string;
  description?: string; 
  createdByUserId: number; 
  creationDate: Date; 
  discountType?: "Amount" | "Percentage";
  discount?: number; 
  expirationDate?: Date; 
  code: string; 
  isCombinable: boolean; 
  maxUsage: number; 
  currentUsage: number; 
  amount: number; 
  price: number; 
  startDate: Date; 
  endDate?: Date;
  image: any; 
  isAvailable: boolean;

  constructor({
    id,
    name,
    description,
    discountType,
    discount,
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
    discountType?: "Amount" | "Percentage";
    discount?: number;
    startDate: Date;
    endDate?: Date;
    price: number;
    createdByUserId: number;
    amount: number;
    isCombinable: boolean;
    creationDate: Date;
    image: any;
    code?: string;
    maxUsage: number;
    currentUsage?: number;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.discountType = discountType;
    this.discount = discount;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.createdByUserId = createdByUserId;
    this.amount = amount;
    this.isCombinable = isCombinable;
    this.creationDate = creationDate;
    this.image = image;
    this.maxUsage = maxUsage;
    this.currentUsage = currentUsage;
    this.code = code || CouponUtils.generateCode();
    this.isAvailable = CouponUtils.calculateAvailability(this); 
  }
}