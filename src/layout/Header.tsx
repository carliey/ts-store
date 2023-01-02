import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "../contexts/CartContext";

function Header() {
  const { cartQuantity, openCart, closeCart, isOpen } = useCart();

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", mb: 9, zIndex: 1 }}>
      <AppBar>
        <Toolbar>
          <Stack direction="row" gap={2} flex={1}>
            <Typography variant="h6" component={NavLink} to="/">
              Home
            </Typography>
            <Typography variant="h6" component={NavLink} to="/products">
              Products
            </Typography>
            <Typography variant="h6" component={NavLink} to="/about">
              About
            </Typography>
          </Stack>
          {cartQuantity > 0 && (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Avatar
                  sx={{
                    width: 22,
                    height: 22,
                    background: "coral",
                    fontSize: "12px",
                  }}
                >
                  {cartQuantity}
                </Avatar>
              }
              onClick={openCart}
            >
              <Avatar
                sx={{ background: "transparent", border: "1px solid white" }}
              >
                <ShoppingCart />
              </Avatar>
            </Badge>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;
