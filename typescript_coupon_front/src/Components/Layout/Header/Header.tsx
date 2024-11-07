import { Box, Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);


  /**
 * login
 */

  
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "10px 20px", 
        backgroundColor: "#e3f2fd",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <ButtonGroup variant="contained" size="small">
        <Button
          color="primary"
          onClick={handleLogin}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
            borderRadius: "2px",
            padding: "5px 10px",
          }}
        >
          Login
        </Button>
        <Button
          color="secondary"
          onClick={handleRegister}
          sx={{
            backgroundColor: "#9c27b0",
            "&:hover": { backgroundColor: "#6d1b7b" },
            borderRadius: "20px",
            padding: "5px 15px",
          }}
        >
          Register
        </Button>
      </ButtonGroup>
    </Box>
  );
}
