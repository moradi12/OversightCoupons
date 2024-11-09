import { UserDetails } from "./UserDetails";

export default interface IUserContextProvider {
  UserDetails: UserDetails[] | null | undefined;
  setUserDetails: (
    userDetails:
      | UserDetails[] 
      | null 
      | ((prevDetails: UserDetails[] | null) => UserDetails[] | null)
  ) => void;
  finishProvider: boolean;
  setFinishProvider: (finishProvider: boolean) => void;
  
  // הוספת פונקציות login ו-logout
  login: (email: string, password: string) => boolean;
  logout: () => void;
}
