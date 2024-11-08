import { createContext, useState } from "react";
import IUserContextProvider from "../../Models/IUserContextProvider";
import { UserDetails } from "../../Models/UserDetails";

export const AdminContext = createContext<IUserContextProvider>({
  UserDetails:null,
  setUserDetails: () => {},
  finishProvider: false,
  setFinishProvider: () => {},
});
const mockUser: UserDetails = {
  id: 1,
  password: "admin12345",
  email: "admin@admin.com",
  // any other fields required by IUser interface
};

export const AdminContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [finishProvider, setFinishProvider] = useState(false);
  const [UserDetails, setUserDetails] = useState<UserDetails | null>(mockUser); // Align state with interface

  return (
    <AdminContext.Provider value={{ UserDetails, finishProvider, setFinishProvider, setUserDetails }}>
      {children}
    </AdminContext.Provider>
  );
};
