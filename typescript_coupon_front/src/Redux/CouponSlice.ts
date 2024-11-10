import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "../Components/Models/Coupon";

interface CouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: null,
};

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    fetchCouponsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCouponsSuccess: (state, action: PayloadAction<Coupon[]>) => {
      state.loading = false;
      state.error = null;
      state.coupons = action.payload;
    },
    fetchCouponsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupons.push(action.payload);
    },
    deleteCoupon: (state, action: PayloadAction<number>) => {
      state.coupons = state.coupons.filter((coupon) => coupon.id !== action.payload);
    },
  },
});

export const {
  fetchCouponsStart,
  fetchCouponsSuccess,
  fetchCouponsFailure,
  addCoupon,
  deleteCoupon,
} = couponSlice.actions;

export default couponSlice.reducer;
