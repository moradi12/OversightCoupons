import { CouponUtils } from "../Utils/CouponUtils";

export class Coupon {
  title: string;
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
  image?: any;
  isAvailable: boolean;
  category?: any;
  isMasterCoupon: boolean;
  redeemedBy?: number[]; 

  /**
   * The constructor initializes a `Coupon` instance with its properties
   * - Ensures all fields are properly set with defaults where needed
   * - Generates unique codes and calculates availability automatically
   * - Centralizes initialization for consistency and scalability
   * - Simplifies object creation and reduces errors
   */


  constructor({
    title,
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
    category,
    isMasterCoupon = true, 
  }: {
    title: string;
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
    image?: any;
    code?: string;
    maxUsage: number;
    currentUsage?: number;
    category?: any; 
    isMasterCoupon?: boolean;
    redeemedCount?: number; 
    redeemedBy?: number[]; 
  }) {
    this.title = title;
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
    this.category = category;
    this.isMasterCoupon = isMasterCoupon;
  }
}
