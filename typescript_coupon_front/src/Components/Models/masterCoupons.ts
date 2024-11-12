interface MasterCoupon {
    code: string;
    discountType: "Amount" | "Percentage";
    discountValue: number;
  }
  
  const masterCoupons: MasterCoupon[] = [
    {
      code: "MASTERFIXED100",  // Fixed price discount
      discountType: "Amount",
      discountValue: 100,
    },
    {
      code: "MASTERPERCENT50", // 50% off
      discountType: "Percentage",
      discountValue: 50,
    },
    
    {
      code: "SUMMER20", // Summer promotion 20% off
      discountType: "Percentage",
      discountValue: 20,
    },
    {
      code: "WELCOME10", // Welcome discount
      discountType: "Amount",
      discountValue: 10,
    },



  ];
  

  
  export default masterCoupons;
  