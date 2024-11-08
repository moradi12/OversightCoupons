import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const {finishProvider} = useContext(AdminContext);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setWelcomeMessage(`Welcome back, ${localStorage.getItem("userEmail")}!`);
    }
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setWelcomeMessage("See you next time!");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#e3f2fd",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" sx={{ color: "#1976d2" }}>
        {welcomeMessage}
      </Typography>
      <ButtonGroup variant="contained" size="small">
        {finishProvider ? (
          <Button
            color="primary"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#d32f2f",
              "&:hover": { backgroundColor: "#9a0007" },
              borderRadius: "2px",
              padding: "5px 10px",
            }}
          >
            Logout
          </Button>
        ) : (
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
        )}
      </ButtonGroup>
    </Box>
  );
}
