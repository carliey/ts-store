import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../contexts/CartContext";

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
};
const Product = ({ id, name, price, image }: Props) => {
  const {
    getItemQuantity,
    increaseItemQuatity,
    decreaseItemQuatity,
    removeFromCart,
  } = useCart();

  const quantity = getItemQuantity(id);

  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia
        sx={{ height: 200, objectFit: "cover" }}
        image={image}
        title={name}
      />
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{name}</Typography>
          <Typography variant="caption">{formatCurrency(price)}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        {quantity === 0 ? (
          <Button
            size="small"
            variant="contained"
            fullWidth
            onClick={() => increaseItemQuatity(id)}
          >
            + Add To Cart
          </Button>
        ) : (
          <Stack gap={1} alignContent="center" alignItems="center" width="100%">
            <Stack direction="row" alignItems="center" gap={1}>
              <Button
                variant="contained"
                onClick={() => increaseItemQuatity(id)}
              >
                +
              </Button>
              <Typography variant="body1">
                {quantity} <Typography variant="caption">in cart</Typography>
              </Typography>
              <Button
                variant="contained"
                onClick={() => decreaseItemQuatity(id)}
              >
                -
              </Button>
            </Stack>
            <Button
              variant="contained"
              color="error"
              onClick={() => removeFromCart(id)}
            >
              Remove
            </Button>
          </Stack>
        )}
      </CardActions>
    </Card>
  );
};

export default Product;
