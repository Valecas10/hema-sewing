import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout/Layout";

import Home from "../pages/Home/Home";
import Catalogo from "../pages/Catalogo/Catalogo";
import Producto from "../pages/Producto/Producto";
import Carrito from "../pages/Carrito/Carrito";
import Checkout from "../pages/Checkout/Checkout";
import Tracking from "../pages/Tracking/Tracking";
import Admin from "../pages/Admin/Admin";

export default function AppRouter() {
    return (
        <Routes>

            <Route element={<Layout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/catalogo"
                    element={<Catalogo />}
                />

                <Route
                    path="/producto/:id"
                    element={<Producto />}
                />

                <Route
                    path="/carrito"
                    element={<Carrito />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/tracking"
                    element={<Tracking />}
                />

                <Route
                    path="/admin"
                    element={<Admin />}
                />

            </Route>

        </Routes>
    );
}