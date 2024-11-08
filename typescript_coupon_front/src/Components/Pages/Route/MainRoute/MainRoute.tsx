import { Route, Routes } from "react-router-dom";
import { Main } from "../../../Layout/Main/Main";
import ProtectedRoutes from "../../../Utils/protectedRoutes";
import AddCustomer from "../../AddCustomer/AddCustomer";
import Login from "../../Login/Login";
import { Page404 } from "../../Page404/Page404";

export function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route element={<ProtectedRoutes />}></Route>
        <Route path="/" element={<Main />} />
        <Route path="/admin/add" element={<AddCustomer />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
