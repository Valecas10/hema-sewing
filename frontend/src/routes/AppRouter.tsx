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
import AdminCategories from "../pages/Admin/AdminCategories/AdminCategories";
import AdminCategoryForm from "../pages/Admin/AdminCategoryForm/AdminCategoryForm";
import AdminFabrics from "../pages/Admin/AdminFabric/AdminFabric";
import AdminFabricForm from "../pages/Admin/AdminFabricForm/AdminFabricForm";
import AdminOrders from "../pages/Admin/AdminOrders/AdminOrders";
import AdminOrderDetail from "../pages/Admin/AdminOrderDetail/AdminOrderDetail";
import AdminContact from "../pages/Admin/AdminContact/AdminContact";
import Contact from "../pages/Contact/Contact";
import AdminGallery from "../pages/Admin/AdminGallery/AdminGallery";

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

                    <Route
                        path="/contacto"
                        element={<Contact />}
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

                        <Route
                            path="/admin/categorias"
                            element={<AdminCategories />}
                        />

                        <Route
                            path="/admin/categorias/nueva"
                            element={<AdminCategoryForm />}
                        />

                        <Route
                            path="/admin/categorias/:id/editar"
                            element={<AdminCategoryForm />}
                        />

                        <Route
                            path="/admin/telas"
                            element={<AdminFabrics />}
                        />
                        
                        <Route
                            path="/admin/telas/nueva"
                            element={<AdminFabricForm />}
                        />

                        <Route
                            path="/admin/telas/:id/editar"
                            element={<AdminFabricForm />}
                        />

                        <Route
                            path="/admin/pedidos"
                            element={<AdminOrders />}
                        />

                        <Route
                            path="/admin/pedidos/:id"
                            element={<AdminOrderDetail />}
                        />

                        <Route
                            path="/admin/contacto"
                            element={<AdminContact />}
                        />

                        <Route
                            path="/admin/galeria"
                            element={<AdminGallery />}
                        />
                    </Route>

                </Route>

            </Routes>
            
        </CartProvider>
    );
}