import React from "react";
import Drawer from "@mui/material/Drawer";
import { useCart } from "../contexts/CartContext";
import { Box, Stack, Typography } from "@mui/material";
import CartItem from "./CartItem";
import { items } from "../data/data";
import { formatCurrency } from "../utils/formatCurrency";

const Cart = () => {
  const { closeCart, isOpen, cartItems } = useCart();

  const total = cartItems.reduce((sum, cartItem) => {
    const item = items.find((i) => i.id === cartItem.id);
    return sum + (item?.price || 0) * cartItem.quantity;
  }, 0);

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeCart}>
      <Box
        sx={{
          width: { xs: "80vw", sm: "50vw", md: "40vw", lg: "30vw" },
          padding: 2,
        }}
      >
        <Stack gap={2}>
          <Stack
            direction={"row"}
            width="100%"
            justifyContent={"space-between"}
          >
            <Typography>Cart</Typography>
            <Typography sx={{ cursor: "pointer" }} onClick={closeCart}>
              X
            </Typography>
          </Stack>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <Typography
            sx={{ textAlign: "right", fontWeight: 800, fontSize: ".9rem" }}
          >
            Total: {formatCurrency(total)}
          </Typography>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default Cart;
