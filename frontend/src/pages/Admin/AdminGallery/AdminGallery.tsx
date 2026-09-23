import { useEffect, useState } from "react";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    uploadGalleryImage,
    deleteAdminGalleryImage,
    getAdminGallery,
    updateAdminGalleryImage,
    type AdminGalleryImage,
} from "../../../services/adminService";

import "./AdminGallery.css";

function AdminGallery() {
    const [images, setImages] =
        useState<AdminGalleryImage[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [selectedFile, setSelectedFile] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState("");

    const [alt, setAlt] =
        useState("");

    const [error, setError] =
        useState("");

    const [message, setMessage] =
        useState("");

    useEffect(() => {
        loadGallery();
    }, []);

    async function loadGallery() {
        try {
            setLoading(true);
            setError("");

            const data =
                await getAdminGallery();

            setImages(
                [...data].sort(
                    (a, b) =>
                        a.order - b.order
                )
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo cargar la galería."
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleAddImage(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!selectedFile) {
            setError(
                "Tenés que seleccionar una imagen."
            );

            return;
        }

        try {
            setSaving(true);
            setError("");
            setMessage("");

            const image =
                await uploadGalleryImage(
                    selectedFile,
                    alt.trim(),
                    images.length
                );

            setImages((current) => [
                ...current,
                image,
            ]);

            setSelectedFile(null);
            setPreview("");
            setAlt("");

            const fileInput =
                document.getElementById(
                    "gallery-image"
                ) as HTMLInputElement | null;

            if (fileInput) {
                fileInput.value = "";
            }

            setMessage(
                "Imagen agregada correctamente."
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo agregar la imagen."
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleToggle(
        image: AdminGalleryImage
    ) {
        try {
            setError("");

            const updated =
                await updateAdminGalleryImage(
                    image.id,
                    {
                        active:
                            !image.active,
                    }
                );

            setImages((current) =>
                current.map((item) =>
                    item.id === updated.id
                        ? updated
                        : item
                )
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar la imagen."
            );
        }
    }

    async function handleDelete(
        image: AdminGalleryImage
    ) {
        const confirmed =
            window.confirm(
                "¿Seguro que querés eliminar esta imagen?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteAdminGalleryImage(
                image.id
            );

            setImages((current) =>
                current
                    .filter(
                        (item) =>
                            item.id !== image.id
                    )
                    .map((item, index) => ({
                        ...item,
                        order: index,
                    }))
            );

            setMessage(
                "Imagen eliminada correctamente."
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar la imagen."
            );
        }
    }

    async function moveImage(
        index: number,
        direction: "up" | "down"
    ) {
        const newIndex =
            direction === "up"
                ? index - 1
                : index + 1;

        if (
            newIndex < 0 ||
            newIndex >= images.length
        ) {
            return;
        }

        const currentImages = [
            ...images,
        ];

        const temp =
            currentImages[index];

        currentImages[index] =
            currentImages[newIndex];

        currentImages[newIndex] =
            temp;

        const reordered =
            currentImages.map(
                (image, itemIndex) => ({
                    ...image,
                    order: itemIndex,
                })
            );

        setImages(reordered);

        try {
            setError("");

            await Promise.all(
                reordered.map((image) =>
                    updateAdminGalleryImage(
                        image.id,
                        {
                            order: image.order,
                        }
                    )
                )
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo guardar el orden."
            );

            await loadGallery();
        }
    }

    return (
        <div className="admin-gallery">
            <AdminSidebar />

            <main className="admin-gallery__main">
                <header className="admin-gallery__header">
                    <span>
                        Contenido del inicio
                    </span>

                    <h1>
                        Galería
                    </h1>

                    <p>
                        Administrá las imágenes
                        que aparecen en la página
                        principal.
                    </p>
                </header>

                <section className="admin-gallery__add">
                    <div className="admin-gallery__card-header">
                        <h2>
                            Agregar imagen
                        </h2>

                        <p>
                            Seleccioná una imagen desde tu
                            computadora.
                        </p>
                    </div>

                    {preview && (
                        <div className="admin-gallery__preview">
                            <img
                                src={preview}
                                alt="Vista previa"
                            />
                        </div>
                    )}

                    <form
                        onSubmit={handleAddImage}
                        className="admin-gallery__form"
                    >
                        <div className="admin-gallery__field">
                            <label htmlFor="gallery-image">
                                Imagen
                            </label>

                            <input
                                id="gallery-image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/avif"
                                onChange={(event) => {
                                    const file =
                                        event.target.files?.[0];

                                    if (!file) {
                                        return;
                                    }

                                    setSelectedFile(file);

                                    setPreview(
                                        URL.createObjectURL(file)
                                    );

                                    setError("");
                                }}
                            />
                        </div>

                        <div className="admin-gallery__field">
                            <label>
                                Texto alternativo
                            </label>

                            <input
                                type="text"
                                value={alt}
                                placeholder="Descripción de la imagen"
                                onChange={(event) =>
                                    setAlt(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={
                                saving ||
                                !selectedFile
                            }
                        >
                            {saving
                                ? "Subiendo..."
                                : "Agregar imagen"}
                        </button>
                    </form>
                </section>

                {message && (
                    <div className="admin-gallery__message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="admin-gallery__error">
                        {error}
                    </div>
                )}

                <section className="admin-gallery__list">
                    <div className="admin-gallery__list-header">
                        <div>
                            <h2>
                                Imágenes
                            </h2>

                            <p>
                                El orden determina
                                la posición en el
                                crossover del inicio.
                            </p>
                        </div>

                        <span>
                            {images.length}{" "}
                            {images.length === 1
                                ? "imagen"
                                : "imágenes"}
                        </span>
                    </div>

                    {loading ? (
                        <p>
                            Cargando galería...
                        </p>
                    ) : images.length === 0 ? (
                        <div className="admin-gallery__empty">
                            <h3>
                                La galería está vacía
                            </h3>

                            <p>
                                Agregá la primera
                                imagen para comenzar.
                            </p>
                        </div>
                    ) : (
                        <div className="admin-gallery__grid">
                            {images.map(
                                (
                                    image,
                                    index
                                ) => (
                                    <article
                                        key={
                                            image.id
                                        }
                                        className={`admin-gallery__item ${
                                            !image.active
                                                ? "is-inactive"
                                                : ""
                                        }`}
                                    >
                                        <div className="admin-gallery__image">
                                            <img
                                                src={
                                                    image.url.startsWith("http")
                                                        ? image.url
                                                        : `http://localhost:3000${image.url}`
                                                }
                                                alt={image.alt || "Imagen de galería"}
                                            />

                                            <span className="admin-gallery__order">
                                                {index +
                                                    1}
                                            </span>

                                            {!image.active && (
                                                <span className="admin-gallery__inactive">
                                                    Inactiva
                                                </span>
                                            )}
                                        </div>

                                        <div className="admin-gallery__item-content">
                                            <span className="admin-gallery__item-alt">
                                                {image.alt ||
                                                    "Sin descripción"}
                                            </span>

                                            <div className="admin-gallery__item-actions">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        moveImage(
                                                            index,
                                                            "up"
                                                        )
                                                    }
                                                    disabled={
                                                        index ===
                                                        0
                                                    }
                                                    aria-label="Mover arriba"
                                                >
                                                    ↑
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        moveImage(
                                                            index,
                                                            "down"
                                                        )
                                                    }
                                                    disabled={
                                                        index ===
                                                        images.length -
                                                            1
                                                    }
                                                    aria-label="Mover abajo"
                                                >
                                                    ↓
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-gallery__toggle"
                                                    onClick={() =>
                                                        handleToggle(
                                                            image
                                                        )
                                                    }
                                                >
                                                    {image.active
                                                        ? "Desactivar"
                                                        : "Activar"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-gallery__delete"
                                                    onClick={() =>
                                                        handleDelete(
                                                            image
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default AdminGallery;