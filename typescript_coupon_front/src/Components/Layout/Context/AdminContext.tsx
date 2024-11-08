import React, { createContext, useState } from "react";
import IUserContextProvider from "../../Models/IUserContextProvider";
import { UserDetails } from "../../Models/UserDetails";

export const AdminContext = createContext<IUserContextProvider>({
  UserDetails: null,
  setUserDetails: () => {}, // Default no-op
  finishProvider: false,
  setFinishProvider: () => {}, // Default no-op
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

  return (
    <AdminContext.Provider
      value={{
        UserDetails,
        setUserDetails,
        finishProvider,
        setFinishProvider,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
