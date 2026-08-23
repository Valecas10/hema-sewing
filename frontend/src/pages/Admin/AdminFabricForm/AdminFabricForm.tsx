import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    createAdminFabric,
    getAdminFabric,
    updateAdminFabric,
} from "../../../services/adminService";

import "./AdminFabricForm.css";

function AdminFabricForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = Boolean(id);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");

    const [loading, setLoading] =
        useState(isEditing);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        getAdminFabric(Number(id))
            .then((fabric) => {
                setName(fabric.name);
                setSlug(fabric.slug);
            })
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudo cargar la tela."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        try {
            const data = {
                name,
                slug,
            };

            if (isEditing) {
                await updateAdminFabric(
                    Number(id),
                    data
                );
            } else {
                await createAdminFabric(data);
            }

            navigate("/admin/telas");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo guardar la tela."
            );
        }
    }

    if (loading) {
        return (
            <div className="admin-fabric-form">
                <AdminSidebar />

                <main className="admin-fabric-form__main">
                    <p>
                        Cargando tela...
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="admin-fabric-form">
            <AdminSidebar />

            <main className="admin-fabric-form__main">
                <header className="admin-fabric-form__header">
                    <span>
                        Administración
                    </span>

                    <h1>
                        {isEditing
                            ? "Editar tela"
                            : "Nueva tela"}
                    </h1>
                </header>

                {error && (
                    <p className="admin-fabric-form__error">
                        {error}
                    </p>
                )}

                <form
                    className="admin-fabric-form__form"
                    onSubmit={handleSubmit}
                >
                    <div className="admin-fabric-form__field">
                        <label htmlFor="name">
                            Nombre
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="admin-fabric-form__field">
                        <label htmlFor="slug">
                            Slug
                        </label>

                        <input
                            id="slug"
                            type="text"
                            value={slug}
                            onChange={(event) =>
                                setSlug(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="admin-fabric-form__actions">
                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/telas"
                                )
                            }
                        >
                            Cancelar
                        </button>

                        <button type="submit">
                            {isEditing
                                ? "Guardar cambios"
                                : "Crear tela"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AdminFabricForm;