import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    deleteAdminFabric,
    getAdminFabrics,
    type AdminFabric,
} from "../../../services/adminService";

import "./AdminFabric.css";

function AdminFabrics() {
    const navigate = useNavigate();

    const [fabrics, setFabrics] =
        useState<AdminFabric[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        getAdminFabrics()
            .then((data) => {
                setFabrics(data);
            })
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudieron cargar las telas."
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
            "¿Estás seguro de que querés eliminar esta tela?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteAdminFabric(id);

            setFabrics((current) =>
                current.filter(
                    (fabric) =>
                        fabric.id !== id
                )
            );
        } catch (error) {
            window.alert(
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar la tela"
            );
        }
    }

    return (
        <div className="admin-fabrics">
            <AdminSidebar />

            <main className="admin-fabrics__main">
                <header className="admin-fabrics__header">
                    <div>
                        <span className="admin-fabrics__eyebrow">
                            Administración
                        </span>

                        <h1>Telas</h1>
                    </div>

                    <button
                        type="button"
                        className="admin-fabrics__add"
                        onClick={() =>
                            navigate(
                                "/admin/telas/nueva"
                            )
                        }
                    >
                        + Nueva tela
                    </button>
                </header>

                {loading && (
                    <p>Cargando telas...</p>
                )}

                {error && (
                    <p>{error}</p>
                )}

                {!loading &&
                    !error && (
                        <section className="admin-fabrics__table-wrapper">
                            <table className="admin-fabrics__table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Slug</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {fabrics.map(
                                        (fabric) => (
                                            <tr
                                                key={
                                                    fabric.id
                                                }
                                            >
                                                <td>
                                                    {
                                                        fabric.id
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        fabric.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        fabric.slug
                                                    }
                                                </td>

                                                <td>
                                                    <div className="admin-fabrics__actions">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/telas/${fabric.id}/editar`
                                                                )
                                                            }
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    fabric.id
                                                                )
                                                            }
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

export default AdminFabrics;