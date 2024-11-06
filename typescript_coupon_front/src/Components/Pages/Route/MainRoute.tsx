import { Route, Routes } from "react-router-dom";
import { Main } from "../../Layout/Main/Main";
import Login from "../Login/Login";
import { Page404 } from "../Page404/Page404";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
            <Routes>
                <Route path="/" element={<Main />} />
                {/* <Route path="/add" element={<AddCoupon />} /> */}
                {/* <Route path="/all" element={<AllCoupons />} /> */}
                 <Route path="/login" element={<Login />} />

                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}