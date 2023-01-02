import { Box, Grid } from "@mui/material";
import Product from "../components/Product";
import Container from "@mui/material/Container";
import { items } from "../data/data";

const Products = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
