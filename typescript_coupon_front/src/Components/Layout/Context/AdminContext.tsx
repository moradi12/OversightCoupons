import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IUserContextProvider from "../../Models/IUserContextProvider";
import { UserDetails } from "../../Models/UserDetails";

export const AdminContext = createContext<IUserContextProvider>({
  UserDetails: null,
  finishProvider: false,
  login: () => false,
  logout: () => {},
  addUser: () => {},
});

export const AdminContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [finishProvider, setFinishProvider] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [UserDetails, setUserDetails] = useState<UserDetails[] | null>();

  useEffect(() => {
    const stored = localStorage.getItem("userDetails");
    setUserDetails(
      stored
        ? JSON.parse(stored)
        : [
            {
              id: 1,
              email: "admin@admin.com",
              password: "admin12345",
            },
          ]
    );
  }, []);

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

  const addUser = (email: string, password: string) => {
    const newDetail = {
      id: UserDetails ? UserDetails.length + 1 : 1,
      email,
      password,
    };
    const newDetails = [...(UserDetails || []), newDetail];
    setUserDetails((prev) => [...(prev || []), newDetail]);
    localStorage.setItem("userDetails", JSON.stringify(newDetails));
  };

  return (
    <AdminContext.Provider
      value={{
        UserDetails,
        finishProvider,
        login,
        logout,
        addUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
