import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";

export function Menu(): JSX.Element {
  const { finishProvider } = useContext(AdminContext);

  /**
   * MUI design
   */
  const buttonStyle = {
    color: "white",
    backgroundColor: "#1976d2",
    margin: "0 10px",
    borderRadius: "20px",
    padding: "5px 15px",
    "&:hover": { backgroundColor: "#115293", textDecoration: "none" },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#e3f2fd",
        padding: "1px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        color="black"
        gutterBottom
        sx={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Coupon System Menu
      </Typography>
      <Button component={NavLink} to="/all" sx={buttonStyle}>
        Coupon List
      </Button>
      {finishProvider && (
        <>
          <Button component={NavLink} to="/all/customers" sx={buttonStyle}>
            Customer List
          </Button>
          <Button component={NavLink} to="/admin/add/" sx={buttonStyle}>
            Add Customer
          </Button>
          <Button component={NavLink} to="/admin/reports/" sx={buttonStyle}>
            Reports
          </Button>
          <Button component={NavLink} to="/admin/coupon/add" sx={buttonStyle}>
            Add Coupon
          </Button>

          <Button component={NavLink} to="/master" sx={buttonStyle}>
            Generated Master
          </Button>
        </>
      )}
    </Box>
  );
}
