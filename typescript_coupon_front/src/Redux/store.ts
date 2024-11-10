import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { adminReducer } from './AdminReducer';
import couponReducer from './CouponSlice';

const rootReducer = combineReducers({
  admin: adminReducer,
  coupons: couponReducer, // Using the slice reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Allow complex non-serializable data if needed
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
