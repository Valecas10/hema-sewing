import { useEffect, useState } from "react";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    getAdminDashboard,
    type AdminDashboardData,
} from "../../../services/adminService";

import "./AdminDashboard.css";

function AdminDashboard() {
    const [dashboard, setDashboard] =
        useState<AdminDashboardData | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        getAdminDashboard()
            .then((data) => {
                setDashboard(data);
            })
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudo cargar el dashboard."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="admin-dashboard">
            <AdminSidebar />

            <main className="admin-dashboard__main">
                <header className="admin-dashboard__header">
                    <div>
                        <span className="admin-dashboard__eyebrow">
                            Administración
                        </span>

                        <h1>Dashboard</h1>
                    </div>
                </header>

                {loading && (
                    <p>Cargando información...</p>
                )}

                {error && (
                    <p>{error}</p>
                )}

                {dashboard && !loading && !error && (
                    <section className="admin-dashboard__content">
                        <div className="admin-dashboard__stats">
                            <article className="admin-dashboard__card">
                                <span>
                                    Productos
                                </span>

                                <strong>
                                    {dashboard.productsCount}
                                </strong>
                            </article>

                            <article className="admin-dashboard__card">
                                <span>
                                    Pedidos
                                </span>

                                <strong>
                                    {dashboard.ordersCount}
                                </strong>
                            </article>

                            <article className="admin-dashboard__card">
                                <span>
                                    Stock bajo
                                </span>

                                <strong>
                                    {
                                        dashboard
                                            .lowStockProducts
                                            .length
                                    }
                                </strong>
                            </article>
                        </div>

                        <div className="admin-dashboard__sections">
                            <section className="admin-dashboard__panel">
                                <h2>
                                    Productos con stock bajo
                                </h2>

                                {dashboard
                                    .lowStockProducts
                                    .length === 0 ? (
                                    <p>
                                        No hay productos
                                        con stock bajo.
                                    </p>
                                ) : (
                                    <ul>
                                        {dashboard.lowStockProducts.map(
                                            (product) => (
                                                <li
                                                    key={
                                                        product.id
                                                    }
                                                >
                                                    <span>
                                                        {
                                                            product.name
                                                        }
                                                    </span>

                                                    <strong>
                                                        {
                                                            product.stock
                                                        }
                                                    </strong>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </section>

                            <section className="admin-dashboard__panel">
                                <h2>
                                    Últimos pedidos
                                </h2>

                                {dashboard.recentOrders
                                    .length === 0 ? (
                                    <p>
                                        Todavía no hay
                                        pedidos.
                                    </p>
                                ) : (
                                    <ul>
                                        {dashboard.recentOrders.map(
                                            (order) => (
                                                <li
                                                    key={
                                                        order.id
                                                    }
                                                >
                                                    <span>
                                                        Pedido #
                                                        {
                                                            order.id
                                                        }{" "}
                                                        —{" "}
                                                        {
                                                            order.firstName
                                                        }{" "}
                                                        {
                                                            order.lastName
                                                        }
                                                    </span>

                                                    <strong>
                                                        $
                                                        {order.total.toLocaleString(
                                                            "es-AR"
                                                        )}
                                                    </strong>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </section>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default AdminDashboard;