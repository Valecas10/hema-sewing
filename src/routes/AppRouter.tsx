import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home"; 
import Catalogo from "../pages/Catalogo/Catalogo";
import Producto from "../pages/Producto/Producto";
import Carrito from "../pages/Carrito/Carrito";
import Checkout from "../pages/Checkout/Checkout";
import Tracking from "../pages/Tracking/Tracking";
import Admin from "../pages/Admin/Admin";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/catalogo" element={<Catalogo />} />

        <Route path="/producto/:id" element={<Producto />} />

        <Route path="/carrito" element={<Carrito />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/tracking" element={<Tracking />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}