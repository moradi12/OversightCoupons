import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import IUserContextProvider from "../../Models/IUserContextProvider";
import { UserDetails } from "../../Models/UserDetails";

export const AdminContext = createContext<IUserContextProvider>({
  UserDetails: null,
  setUserDetails: () => {},
  finishProvider: false,
  setFinishProvider: () => {},
  login: () => false,
  logout: () => {},
});

export const AdminContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate(); // Use navigate to redirect
  const [finishProvider, setFinishProvider] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  ); // Initialize based on localStorage
  const [UserDetails, setUserDetails] = useState<UserDetails[] | null>([
    {
      id: 1,
      email: "admin@admin.com",
      password: "admin12345",
    },
  ]);

  const login = (email: string, password: string): boolean => {
    const user = UserDetails?.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setFinishProvider(true);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setFinishProvider(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <AdminContext.Provider
      value={{
        UserDetails,
        setUserDetails,
        finishProvider,
        setFinishProvider,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
