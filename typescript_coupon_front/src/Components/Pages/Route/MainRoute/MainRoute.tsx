import { Route, Routes } from "react-router-dom";
import { Main } from "../../../Layout/Main/Main";
import AddCustomer from "../../AddCustomer/AddCustomer";
import Login from "../../Login/Login";
import { Page404 } from "../../Page404/Page404";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
            <Routes>
                <Route path="/" element={<Main />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/admin/add" element={<AddCustomer />} />

                <Route path="*" element={<Page404 />} />
                
            </Routes>
        </div>
    );
}