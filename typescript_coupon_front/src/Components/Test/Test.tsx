import { Coupon } from "../Models/Coupon";
import { CouponCategory } from "../Models/CouponCategory ";
export class Test {
    static runTests(): void {
      console.log("Running Coupon Class Tests..");
  
      /**
 * running test of coupons (Need DB)
 */
      const coupons = [
        new Coupon({
          id: 1,
          name: "Black Friday",
          description: "50% off on all items",
          category: CouponCategory.RetailCoupons,
          discountType: "Percentage",
          discount: 50,
          title: "Black Friday Deal",
          startDate: new Date("2024-11-01"),
          endDate: new Date("2025-11-30"),
          price: 100,
          code: "BLACK50",
          createdByUserId: 1,
          amount: 10,
          isCombinable: true,
          creationDate: new Date(),
          image: "image.jpg",
        }),
        new Coupon({
          id: 2,
          name: "Winter Sale",
          description: "30% off on all winter clothing",
          category: CouponCategory.Clothing,
          discountType: "Percentage",
          discount: 30,
          title: "Winter Collection",
          startDate: new Date("2024-12-01"),
          endDate: new Date("2024-12-31"),
          price: 150,
          code: "WINTER30",
          createdByUserId: 2,
          amount: 0,
          isCombinable: false,
          creationDate: new Date(),
          image: "winterimage.jpg",
        }),
        new Coupon({
          id: 3,
          name: "Summer Discount",
          description: "Buy 1 get 1 free on summer clothes",
          category: CouponCategory.Clothing,
          discountType: "Amount",
          discount: 50,
          title: "Summer Special",
          startDate: new Date("2024-06-01"),
          endDate: new Date("2024-06-30"),
          price: 100,
          code: "SUMMER50",
          createdByUserId: 3,
          amount: 15,
          isCombinable: true,
          creationDate: new Date(),
          image: "summer_discount_image.jpg",
        }),
      ];
  


      coupons.forEach((coupon) => {
        console.log(`Testing Coupon: ${coupon.name}`);
        console.log(`Discounted Price: ${coupon.calculateDiscountedPrice()}`);
        console.log(`Is Available: ${coupon.calculateAvailability()}`);
        console.log("------------------------------------");
      });
    }
  }
  
  Test.runTests();