import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Header(): JSX.Element {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <header className="Header">
      <h1>Oversight Coupon System</h1>
      <ButtonGroup variant="contained" size="small">
        <Button color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Button color="secondary" onClick={handleRegister}>
          Register
        </Button>
      </ButtonGroup>
    </header>
  );
}
