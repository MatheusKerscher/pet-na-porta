import { BrowserRouter, Route, Routes } from "react-router-dom";

import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Home from "./pages/Home";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
