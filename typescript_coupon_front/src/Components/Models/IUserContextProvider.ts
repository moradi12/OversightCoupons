import { UserDetails } from "./UserDetails";

export default interface IUserContextProvider{

    UserDetails : UserDetails | null;
    setUserDetails : (userDetails : UserDetails | null) => void;
    finishProvider : boolean;
    setFinishProvider : (finishProvider: boolean) => void;
}