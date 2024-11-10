import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminContext } from "../Layout/Context/AdminContext";

const ProtectedRoutes = () => {
  const { finishProvider } = useContext(AdminContext);

  if (!finishProvider) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the children components
  return <Outlet />;
};

export default ProtectedRoutes;
