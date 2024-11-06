import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Menu(): JSX.Element {
  const [menuType, setMenuType] = useState("guest");

  const adminMenu = (
    <>
      |<NavLink to="/all">Coupon List</NavLink> |
      <NavLink to="/admin/customers">Customer List</NavLink>
    </>
  );
  const handleMenu = () => {
    switch (menuType) {
      case "ADMIN":
        return <span>Welcome, Guest!</span>;
    }
  };
  return <div className="Menu">{handleMenu()}</div>;
}
