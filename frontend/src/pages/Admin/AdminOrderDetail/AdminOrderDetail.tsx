import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    getAdminOrder,
    updateAdminOrderStatus,
    type AdminOrder,
} from "../../../services/adminService";

import "./AdminOrderDetail.css";

function AdminOrderDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [order, setOrder] =
        useState<AdminOrder | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [updatingStatus, setUpdatingStatus] =
        useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }

        getAdminOrder(Number(id))
            .then((data) => {
                setOrder(data);
            })
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudo cargar el pedido."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

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

    function formatDate(
        date: string
    ) {
        return new Date(
            date
        ).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    async function handleStatusChange(
        status: string
    ) {
        if (!order) {
            return;
        }

        try {
            setUpdatingStatus(true);

            const updatedOrder =
                await updateAdminOrderStatus(
                    order.id,
                    status
                );

            setOrder(updatedOrder);
        } catch (error) {
            window.alert(
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar el estado"
            );
        } finally {
            setUpdatingStatus(false);
        }
    }

    if (loading) {
        return (
            <div className="admin-order-detail">
                <AdminSidebar />

                <main className="admin-order-detail__main">
                    <p>
                        Cargando pedido...
                    </p>
                </main>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="admin-order-detail">
                <AdminSidebar />

                <main className="admin-order-detail__main">
                    <p>
                        {error ||
                            "No se encontró el pedido."}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/pedidos"
                            )
                        }
                    >
                        Volver a pedidos
                    </button>
                </main>
            </div>
        );
    }

    return (
        <div className="admin-order-detail">
            <AdminSidebar />

            <main className="admin-order-detail__main">
                <header className="admin-order-detail__header">
                    <div>
                        <span>
                            Administración
                        </span>

                        <h1>
                            Pedido #{order.id}
                        </h1>

                        <p>
                            {formatDate(
                                order.createdAt
                            )}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/pedidos"
                            )
                        }
                    >
                        Volver
                    </button>
                </header>

                <div className="admin-order-detail__grid">
                    <section className="admin-order-detail__card">
                        <h2>
                            Cliente
                        </h2>

                        <div>
                            <strong>
                                {order.firstName}{" "}
                                {order.lastName}
                            </strong>

                            <p>
                                {order.email}
                            </p>

                            <p>
                                {order.phone}
                            </p>
                        </div>
                    </section>

                    <section className="admin-order-detail__card">
                        <h2>
                            Entrega
                        </h2>

                        <p>
                            <strong>
                                Método:
                            </strong>{" "}
                            {
                                order.deliveryMethod
                            }
                        </p>

                        {order.address && (
                            <p>
                                <strong>
                                    Dirección:
                                </strong>{" "}
                                {
                                    order.address
                                }
                            </p>
                        )}

                        {order.city && (
                            <p>
                                <strong>
                                    Ciudad:
                                </strong>{" "}
                                {order.city}
                            </p>
                        )}

                        {order.postalCode && (
                            <p>
                                <strong>
                                    Código postal:
                                </strong>{" "}
                                {
                                    order.postalCode
                                }
                            </p>
                        )}
                    </section>
                </div>

                    <div className="admin-order-detail__bottom-grid">
                        <section className="admin-order-detail__card admin-order-detail__products">
                            <h2>
                                Productos
                            </h2>

                            <div className="admin-order-detail__products-list">
                                {order.items.map(
                                    (item) => (
                                        <div
                                            key={item.id}
                                            className="admin-order-detail__product"
                                        >
                                            <div>
                                                <strong>
                                                    {item.product.name}
                                                </strong>

                                                <span>
                                                    Cantidad:{" "}
                                                    {item.quantity}
                                                </span>
                                            </div>

                                            <span>
                                                {formatPrice(
                                                    item.price *
                                                    item.quantity
                                                )}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="admin-order-detail__total">
                                <span>
                                    Total
                                </span>

                                <strong>
                                    {formatPrice(order.total)}
                                </strong>
                            </div>
                        </section>

                        <section className="admin-order-detail__card admin-order-detail__status">
                            <label htmlFor="order-status">
                                Estado del pedido
                            </label>

                            <select
                                id="order-status"
                                value={order.status}
                                onChange={(event) =>
                                    handleStatusChange(
                                        event.target.value
                                    )
                                }
                                disabled={updatingStatus}
                            >
                                <option value="PENDIENTE">
                                    Pendiente
                                </option>

                                <option value="CONFIRMADO">
                                    Confirmado
                                </option>

                                <option value="PREPARANDO">
                                    Preparando
                                </option>

                                <option value="ENVIADO">
                                    Enviado
                                </option>

                                <option value="ENTREGADO">
                                    Entregado
                                </option>
                            </select>

                            {updatingStatus && (
                                <span>
                                    Guardando...
                                </span>
                            )}
                        </section>
                    </div>
            </main>
        </div>
    );
}

export default AdminOrderDetail;