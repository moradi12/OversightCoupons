import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IUserContextProvider from "../../Models/IUserContextProvider";
import { UserDetails } from "../../Models/UserDetails";

// Required methods
export const AdminContext = createContext<IUserContextProvider>({
  UserDetails: null,
  finishProvider: false,
  login: () => false,
  logout: () => {},
  addUser: () => {},
  deleteUser: () => {},
  editUserPassword: () => {}, 
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
  const [UserDetails, setUserDetails] = useState<UserDetails[] | null>(null);

  // Load user details from localStorage on component mount
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

  // Login functionality
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

  // Logout functionality
  const logout = () => {
    setFinishProvider(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // Add new user
  const addUser = (email: string, password: string) => {
    const newDetail = {
      id: UserDetails ? UserDetails.length + 1 : 1,
      email,
      password,
    };
    const newDetails = [...(UserDetails || []), newDetail];
    setUserDetails(newDetails);
    localStorage.setItem("userDetails", JSON.stringify(newDetails));
  };

  // Delete a user by ID
  const deleteUser = (id: number) => {
    const updatedDetails = UserDetails?.filter((user) => user.id !== id) || null;
    setUserDetails(updatedDetails);
    localStorage.setItem("userDetails", JSON.stringify(updatedDetails));
  };

  // Edit user password
  const editUserPassword = (id: number, newPassword: string) => {
    const updatedDetails =
      UserDetails?.map((user) =>
        user.id === id ? { ...user, password: newPassword } : user
      ) || null;
    setUserDetails(updatedDetails);
    localStorage.setItem("userDetails", JSON.stringify(updatedDetails));
  };

  return (
    <AdminContext.Provider
      value={{
        UserDetails,
        finishProvider,
        login,
        logout,
        addUser,
        deleteUser,
        editUserPassword, 
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
