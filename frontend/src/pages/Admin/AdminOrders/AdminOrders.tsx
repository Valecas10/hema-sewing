import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    getAdminOrders,
    type AdminOrder,
} from "../../../services/adminService";

import "./AdminOrders.css";

function AdminOrders() {
    const navigate = useNavigate();

    const [orders, setOrders] =
        useState<AdminOrder[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        getAdminOrders()
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudieron cargar los pedidos."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function formatDate(
        date: string
    ) {
        return new Date(
            date
        ).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    function formatPrice(
        price: number
    ) {
        return new Intl.NumberFormat(
            "es-AR",
            {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
            }
        ).format(price);
    }

    return (
        <div className="admin-orders">
            <AdminSidebar />

            <main className="admin-orders__main">
                <header className="admin-orders__header">
                    <div>
                        <span className="admin-orders__eyebrow">
                            Administración
                        </span>

                        <h1>Pedidos</h1>
                    </div>
                </header>

                {loading && (
                    <p>
                        Cargando pedidos...
                    </p>
                )}

                {error && (
                    <p>
                        {error}
                    </p>
                )}

                {!loading &&
                    !error &&
                    orders.length === 0 && (
                        <div className="admin-orders__empty">
                            <h2>
                                No hay pedidos
                            </h2>

                            <p>
                                Los pedidos realizados
                                desde la tienda
                                aparecerán aquí.
                            </p>
                        </div>
                    )}

                {!loading &&
                    !error &&
                    orders.length > 0 && (
                        <section className="admin-orders__table-wrapper">
                            <table className="admin-orders__table">
                                <thead>
                                    <tr>
                                        <th>
                                            Pedido
                                        </th>

                                        <th>
                                            Cliente
                                        </th>

                                        <th>
                                            Fecha
                                        </th>

                                        <th>
                                            Total
                                        </th>

                                        <th>
                                            Estado
                                        </th>

                                        <th>
                                            Acción
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(
                                        (
                                            order
                                        ) => (
                                            <tr
                                                key={
                                                    order.id
                                                }
                                            >
                                                <td>
                                                    #
                                                    {
                                                        order.id
                                                    }
                                                </td>

                                                <td>
                                                    <strong>
                                                        {
                                                            order.firstName
                                                        }{" "}
                                                        {
                                                            order.lastName
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            order.email
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    {formatDate(
                                                        order.createdAt
                                                    )}
                                                </td>

                                                <td>
                                                    {formatPrice(
                                                        order.total
                                                    )}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`admin-orders__status admin-orders__status--${order.status.toLowerCase()}`}
                                                    >
                                                        {
                                                            order.status
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/pedidos/${order.id}`
                                                            )
                                                        }
                                                    >
                                                        Ver pedido
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </section>
                    )}
            </main>
        </div>
    );
}

export default AdminOrders;