// Save an array of coupons to localStorage
export const saveCouponsToLocalStorage = (coupons: any[]) => {
  localStorage.setItem("coupons", JSON.stringify(coupons)); // convert array to JSON and save
};

// Retrieve an array of coupons from localStorage
export const getCouponsFromLocalStorage = (): any[] => {
  const coupons = localStorage.getItem("coupons"); // get JSON string from localStorage
  return coupons ? JSON.parse(coupons) : []; // parse JSON or return an empty array
};
