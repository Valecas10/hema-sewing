import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    getAdminCategories,
    type AdminCategory,
} from "../../../services/adminService";

import "./AdminCategories.css";

function AdminCategories() {
    const navigate = useNavigate();

    const [categories, setCategories] =
        useState<AdminCategory[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        getAdminCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudieron cargar las categorías."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    async function handleDelete(
        id: number
    ) {
        const confirmed = window.confirm(
            "¿Estás seguro de que querés eliminar esta categoría?"
        );

        if (!confirmed) {
            return;
        }

        const token =
            localStorage.getItem("adminToken");

        try {
            const response = await fetch(
                `http://localhost:3000/api/admin/categories/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const result =
                    await response.json();

                throw new Error(
                    result.message ||
                        "No se pudo eliminar la categoría"
                );
            }

            setCategories((current) =>
                current.filter(
                    (category) =>
                        category.id !== id
                )
            );
        } catch (error) {
            window.alert(
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar la categoría"
            );
        }
    }

    return (
        <div className="admin-categories">
            <AdminSidebar />

            <main className="admin-categories__main">
                <header className="admin-categories__header">
                    <div>
                        <span className="admin-categories__eyebrow">
                            Administración
                        </span>

                        <h1>Categorías</h1>
                    </div>

                    <button
                        type="button"
                        className="admin-categories__add"
                        onClick={() =>
                            navigate(
                                "/admin/categorias/nueva"
                            )
                        }
                    >
                        + Nueva categoría
                    </button>
                </header>

                {loading && (
                    <p>
                        Cargando categorías...
                    </p>
                )}

                {error && (
                    <p>
                        {error}
                    </p>
                )}

                {!loading &&
                    !error && (
                        <section className="admin-categories__grid">
                            {categories.map(
                                (category) => (
                                    <article
                                        key={
                                            category.id
                                        }
                                        className="admin-categories__card"
                                    >
                                        {category.image && (
                                            <img
                                                src={
                                                    category.image
                                                }
                                                alt={
                                                    category.name
                                                }
                                            />
                                        )}

                                        <div className="admin-categories__info">
                                            <h2>
                                                {
                                                    category.name
                                                }
                                            </h2>

                                            <span>
                                                /
                                                {
                                                    category.slug
                                                }
                                            </span>

                                            {category.description && (
                                                <p>
                                                    {
                                                        category.description
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div className="admin-categories__actions">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/categorias/${category.id}/editar`
                                                    )
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        category.id
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </article>
                                )
                            )}
                        </section>
                    )}
            </main>
        </div>
    );
}

export default AdminCategories;