import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    getAdminProducts,
    type AdminProduct,
} from "../../../services/adminService";

import "./AdminProducts.css";

function AdminProducts() {
    const [products, setProducts] =
        useState<AdminProduct[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getAdminProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudieron cargar los productos."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="admin-products">
            <AdminSidebar />

            <main className="admin-products__main">
                <header className="admin-products__header">
                    <div>
                        <span className="admin-products__eyebrow">
                            Administración
                        </span>

                        <h1>Productos</h1>
                    </div>

                    <button
                        type="button"
                        className="admin-products__add"
                        onClick={() =>
                            navigate("/admin/productos/nuevo")
                        }
                    >
                        + Nuevo producto
                    </button>
                </header>

                {loading && (
                    <p>Cargando productos...</p>
                )}

                {error && (
                    <p>{error}</p>
                )}

                {!loading &&
                    !error && (
                        <section className="admin-products__table-wrapper">
                            <table className="admin-products__table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Categoría</th>
                                        <th>Tela</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Destacado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(
                                        (product) => (
                                            <tr
                                                key={
                                                    product.id
                                                }
                                            >
                                                <td>
                                                    <div className="admin-products__product">
                                                        {product
                                                            .images
                                                            .length >
                                                            0 && (
                                                            <img
                                                                src={
                                                                    product
                                                                        .images[0]
                                                                        .url
                                                                }
                                                                alt={
                                                                    product
                                                                        .images[0]
                                                                        .alt ||
                                                                    product.name
                                                                }
                                                            />
                                                        )}

                                                        <span>
                                                            {
                                                                product.name
                                                            }
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    {
                                                        product
                                                            .category
                                                            .name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        product
                                                            .fabric
                                                            .name
                                                    }
                                                </td>

                                                <td>
                                                    $
                                                    {product.price.toLocaleString(
                                                        "es-AR"
                                                    )}
                                                </td>

                                                <td>
                                                    <span
                                                        className={
                                                            product.stock ===
                                                            -1
                                                                ? "stock-unlimited"
                                                                : product.stock <=
                                                                  3
                                                                ? "stock-low"
                                                                : ""
                                                        }
                                                    >
                                                        {product.stock ===
                                                        -1
                                                            ? "Ilimitado"
                                                            : product.stock}
                                                    </span>
                                                </td>

                                                <td>
                                                    {product.featured
                                                        ? "Sí"
                                                        : "No"}
                                                </td>

                                                <td>
                                                    <div className="admin-products__actions">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/productos/${product.id}/editar`
                                                                )
                                                            }
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
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

export default AdminProducts;