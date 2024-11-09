import { Route, Routes } from "react-router-dom";
import { Main } from "../../../Layout/Main/Main";
import { AddCoupon } from "../../AddCoupon/AddCoupon";
import AddCustomer from "../../AddCustomer/AddCustomer";
import AllCustomers from "../../AllCustomers/AllCustomers";
import Login from "../../Login/Login";
import { Page404 } from "../../Page404/Page404";

export function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/admin/add" element={<AddCustomer />} />
          <Route path="/admin/coupon/add" element={<AddCoupon />} />
        {/* </Route> */}

        {/* Public Routes */}
        <Route path="/all/customers" element={<AllCustomers />} />
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}