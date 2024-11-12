import { Coupon } from "../../Models/Coupon";

export const generateUniqueCode = (savedCoupons:Coupon[]): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code: string = ""; // Explicitly type and initialize code
    let isUnique = false;

    while (!isUnique) {
      const codeLength = Math.floor(Math.random() * 2) + 4; // Random length between 4 and 5
      let generatedCode = "";

          // Generate a code of the determined length
      for (let i = 0; i < codeLength; i++) {
        generatedCode += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      isUnique = !savedCoupons.some((coupon) => coupon.code === generatedCode);
      if (isUnique) {
        code = generatedCode;
      }
    }

    return code;
  };