import { useContext } from "react";
import { AdminContext } from "../../Layout/Context/AdminContext";

const AllCustomers = () => {
  const { UserDetails } = useContext(AdminContext);
  return (
    <ul>
      {UserDetails?.map((user) => {
        return <li key={user.id}>{user.email}</li>;
      })}
    </ul>
  );
};

export default AllCustomers;
