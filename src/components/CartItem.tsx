import React from "react";
import { useCart } from "../contexts/CartContext";
import { items } from "../data/data";
import { Stack, Typography, Box } from "@mui/material";
import { formatCurrency } from "../utils/formatCurrency";

type Props = {
  id: number;
  quantity: number;
};
const CartItem = ({ id, quantity }: Props) => {
  const { removeFromCart } = useCart();
  const item = items.find((item) => item.id === id);

  if (!item) {
    return null;
  }
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "125px",
          height: "75px",
          objectFit: "cover",
        }}
      />
      <Stack direction="row" justifyContent="space-between" flex={1}>
        <Stack>
          <Typography
            sx={{
              "& span": {
                fontSize: ".1rem",
                fontWeight: "300",
              },
            }}
          >
            {item.name + " "}
            {quantity > 1 && <span>x{quantity}</span>}
          </Typography>
          <Typography variant="caption">
            {formatCurrency(item.price)}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography>{formatCurrency(item.price * quantity)}</Typography>
          <Typography
            sx={{
              border: "1px solid grey",
              p: ".2rem",
            }}
            onClick={() => removeFromCart(item.id)}
          >
            X
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItem;
