export const saveCouponsToLocalStorage = (coupons: any[]) => {
    localStorage.setItem("coupons", JSON.stringify(coupons));
  };
  
  export const getCouponsFromLocalStorage = (): any[] => {
    const coupons = localStorage.getItem("coupons");
    return coupons ? JSON.parse(coupons) : [];
  };
  