import { Route, Routes } from "react-router-dom";
import { Main } from "../../../Layout/Main/Main";
import ProtectedRoutes from "../../../Utils/protectedRoutes";
import AddCoupon from "../../AddCoupon/AddCoupon";
import AddCustomer from "../../AddCustomer/AddCustomer";
import AllCoupons from "../../AllCoupons/AllCoupons";
import AllCustomers from "../../AllCustomers/AllCustomers";
import Login from "../../Login/Login";
import MasterCouponComponent from "../../Master/MasterCouponComponent";
import { Page404 } from "../../Page404/Page404";

export function MainRoute(): JSX.Element {
  return (
    <div className="MainRoutes">
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/add" element={<AddCustomer />} />
          <Route path="/all/customers" element={<AllCustomers />} />
          <Route path="/master" element={<MasterCouponComponent />} />

        </Route>
      

        {/* Public Routes */}
        <Route
          path="/admin/coupon/add"
          element={<AddCoupon couponToEdit={null} />}
        />
        <Route path="/" element={<Main />} />
        <Route path="/all" element={<AllCoupons />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/coupon/apply" element={<ApplyCouponWrapper />} /> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
