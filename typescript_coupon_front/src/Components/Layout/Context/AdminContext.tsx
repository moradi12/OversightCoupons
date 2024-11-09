import React, { createContext, useState } from "react";
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

export const AdminContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [finishProvider, setFinishProvider] = useState(false);
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
    window.location.reload();
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
