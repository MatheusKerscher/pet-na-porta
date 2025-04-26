import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";

import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Home from "./pages/Home";
import CartProvider from "./contexts/CartContext";

function AppRoutes() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
