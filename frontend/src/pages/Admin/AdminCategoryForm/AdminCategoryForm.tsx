import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    createAdminCategory,
    getAdminCategory,
    updateAdminCategory,
} from "../../../services/adminService";

import "./AdminCategoryForm.css";

function AdminCategoryForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditing = Boolean(id);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] =
        useState("");
    const [image, setImage] = useState("");

    const [loading, setLoading] =
        useState(isEditing);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        getAdminCategory(Number(id))
            .then((category) => {
                setName(category.name);
                setSlug(category.slug);
                setDescription(
                    category.description || ""
                );
                setImage(
                    category.image || ""
                );
            })
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudo cargar la categoría."
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
                description,
                image,
            };

            if (isEditing) {
                await updateAdminCategory(
                    Number(id),
                    data
                );
            } else {
                await createAdminCategory(
                    data
                );
            }

            navigate("/admin/categorias");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo guardar la categoría."
            );
        }
    }

    if (loading) {
        return (
            <div className="admin-category-form">
                <AdminSidebar />

                <main className="admin-category-form__main">
                    <p>
                        Cargando categoría...
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="admin-category-form">
            <AdminSidebar />

            <main className="admin-category-form__main">
                <header className="admin-category-form__header">
                    <span>
                        Administración
                    </span>

                    <h1>
                        {isEditing
                            ? "Editar categoría"
                            : "Nueva categoría"}
                    </h1>
                </header>

                {error && (
                    <p className="admin-category-form__error">
                        {error}
                    </p>
                )}

                <form
                    className="admin-category-form__form"
                    onSubmit={handleSubmit}
                >
                    <div className="admin-category-form__field">
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

                    <div className="admin-category-form__field">
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

                    <div className="admin-category-form__field">
                        <label htmlFor="description">
                            Descripción
                        </label>

                        <textarea
                            id="description"
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                            rows={5}
                        />
                    </div>

                    <div className="admin-category-form__field">
                        <label htmlFor="image">
                            Imagen
                        </label>

                        <input
                            id="image"
                            type="text"
                            value={image}
                            onChange={(event) =>
                                setImage(
                                    event.target.value
                                )
                            }
                            placeholder="/assets/images/categories/..."
                        />
                    </div>

                    <div className="admin-category-form__actions">
                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/categorias"
                                )
                            }
                        >
                            Cancelar
                        </button>

                        <button type="submit">
                            {isEditing
                                ? "Guardar cambios"
                                : "Crear categoría"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AdminCategoryForm;