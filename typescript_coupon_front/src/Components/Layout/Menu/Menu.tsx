import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export function Menu(): JSX.Element {

/**
 * MUI design
 */

const buttonStyle = {
    color: "white",
    backgroundColor: "#1976d2",
    margin: "0 10px",
    borderRadius: "20px",
    padding: "5px 15px",
    "&:hover": {backgroundColor: "#115293",textDecoration: "none",}
  };

///Typography ///

  return (
    <Box
      sx={{
        backgroundColor: "#e3f2fd",
        padding: "1px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", }}>  <Typography
        variant="h4"
        color="black"
        gutterBottom
        sx={{ fontFamily: "Arial, Helvetica, sans-serif",fontWeight: "bold",fontSize: "2rem",
        }}
      >
        Coupon System Menu
      </Typography>{" "}
      <Button component={NavLink} to="/all" sx={buttonStyle}>
        Coupon List
      </Button>
      <Button component={NavLink} to="/admin/customers" sx={buttonStyle}>
        Customer List
      </Button>
      <Button component={NavLink} to="/admin/add/customer" sx={buttonStyle}>
        Add Customer </Button>
      <Button component={NavLink} to="/admin/reports/" sx={buttonStyle}> Reports</Button>
    </Box>
  );
}
