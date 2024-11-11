// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import couponReducer from '../Redux/CouponSlice'; // Adjust the path accordingly

const rootReducer = combineReducers({
  coupons: couponReducer, 
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
