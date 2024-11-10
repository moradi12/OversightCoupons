import { UserDetails } from "./UserDetails";

export default interface IUserContextProvider {
  UserDetails: UserDetails[] | null | undefined;
  finishProvider: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addUser: (email: string, password: string) => void;
  deleteUser: (id: number) => void; 
  editUserPassword: (id: number, newPassword: string) => void; 
}
