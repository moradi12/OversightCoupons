import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";

export function Header(): JSX.Element {
  const { finishProvider, logout } = useContext(AdminContext);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");
    if (loggedIn === "true" && userEmail) {
      setWelcomeMessage(`Welcome back, ${userEmail}!`);
    } else {
      setWelcomeMessage("");
    }
  }, [finishProvider]);

  const handleLoginRedirect = () => {
    navigate("/login");
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
        {welcomeMessage || "Please login"}
      </Typography>
      <ButtonGroup variant="contained" size="small">
        {finishProvider ? (
          <Button
            color="primary"
            onClick={() => {
              logout();
              navigate("/login");
            }}
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
            onClick={handleLoginRedirect}
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
