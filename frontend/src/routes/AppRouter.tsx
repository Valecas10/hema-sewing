import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout/Layout";

import Home from "../pages/Home/Home";
import Catalogo from "../pages/Catalogo/Catalogo";
import Carrito from "../pages/Carrito/Carrito";
import Checkout from "../pages/Checkout/Checkout";
import Tracking from "../pages/Tracking/Tracking";
import CatalogCategory from "../pages/CatalogCategory";
import ProductPage from "../pages/ProductPage";
import { CartProvider } from "../context/CartContext";
import OrderConfirmation from "../pages/OrderConfirmation/OrderConfirmation";
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import ProtectedAdminRoute from "../components/admin/ProtectedAdminRoute/ProtectedAdminRoute";
import AdminProducts from "../pages/Admin/AdminProducts/AdminProducts";
import AdminProductForm from "../pages/Admin/AdminProductForm/AdminProductForm";

export default function AppRouter() {
    return (
        <CartProvider>

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
                        path="/catalogo/:slug"
                        element={<CatalogCategory />}
                    />

                    <Route
                        path="/producto/:slug"
                        element={<ProductPage />}
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
                        path="/pedido-confirmado"
                        element={<OrderConfirmation />}
                    />

                    <Route
                        path="/tracking"
                        element={<Tracking />}
                    />

                </Route>
                <Route>

                    <Route
                        path="/admin/login"
                        element={<AdminLogin />}
                    />

                    <Route element={<ProtectedAdminRoute />}>
                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin/productos"
                            element={<AdminProducts />}
                        />

                        <Route
                            path="/admin/productos/nuevo"
                            element={<AdminProductForm />}
                        />

                        <Route
                            path="/admin/productos/:id/editar"
                            element={<AdminProductForm />}
                        />
                    </Route>

                </Route>

            </Routes>
            
        </CartProvider>
    );
}