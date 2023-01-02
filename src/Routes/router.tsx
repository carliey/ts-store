import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../layout";
import About from "../pages/About";
import Home from "../pages/Home";
import Products from "../pages/Products";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="about" element={<About />} />
    </Route>
  )
);
