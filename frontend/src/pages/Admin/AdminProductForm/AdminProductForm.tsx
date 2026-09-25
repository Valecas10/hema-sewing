import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    createAdminProduct,
    getAdminCategories,
    getAdminFabrics,
    getAdminProduct,
    updateAdminProduct,
    uploadProductImage,
    type AdminCategory,
    type AdminFabric,
} from "../../../services/adminService";

import "./AdminProductForm.css";

interface ProductImageForm {
    id?: number;
    url: string;
    alt: string;
    order: number;
}

function AdminProductForm() {
    const [productImages, setProductImages] =
        useState<ProductImageForm[]>([]);

    const [uploadingImage, setUploadingImage] =
        useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const isEditing = Boolean(id);

    const [categories, setCategories] =
        useState<AdminCategory[]>([]);

    const [fabrics, setFabrics] =
        useState<AdminFabric[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] =
        useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] =
        useState("");
    const [fabricId, setFabricId] =
        useState("");
    const [featured, setFeatured] =
        useState(false);
    const [embroidery, setEmbroidery] =
        useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const [
                    categoriesData,
                    fabricsData,
                ] = await Promise.all([
                    getAdminCategories(),
                    getAdminFabrics(),
                ]);

                setCategories(categoriesData);
                setFabrics(fabricsData);

                if (id) {
                    const product =
                        await getAdminProduct(
                            Number(id)
                        );

                    setName(product.name);
                    setSlug(product.slug);
                    setDescription(
                        product.description ?? ""
                    );
                    setPrice(
                        String(product.price)
                    );
                    setStock(
                        String(product.stock)
                    );
                    setCategoryId(
                        String(product.category.id)
                    );
                    setFabricId(
                        String(product.fabric.id)
                    );
                    setFeatured(
                        product.featured
                    );
                    setEmbroidery(
                        product.embroidery
                    );

                    setProductImages(
                        product.images
                            .sort(
                                (a, b) =>
                                    a.order - b.order
                            )
                            .map((image) => ({
                                id: image.id,
                                url: image.url,
                                alt:
                                    image.alt ??
                                    product.name,
                                order: image.order,
                            }))
                    );
                }
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudieron cargar los datos."
                );
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id]);

    async function handleAddImage(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        try {
            setError("");
            setUploadingImage(true);

            const uploadedImage =
                await uploadProductImage(
                    file,
                    name
                );

            setProductImages((currentImages) => [
                ...currentImages,
                {
                    url: uploadedImage.url,
                    alt:
                        uploadedImage.alt ||
                        name,
                    order: currentImages.length,
                },
            ]);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo subir la imagen."
            );
        } finally {
            setUploadingImage(false);
            event.target.value = "";
        }
    }

    function handleRemoveImage(index: number) {
        setProductImages((currentImages) =>
            currentImages
                .filter(
                    (_, imageIndex) =>
                        imageIndex !== index
                )
                .map((image, imageIndex) => ({
                    ...image,
                    order: imageIndex,
                }))
        );
    }

    function handleMoveImage(
        index: number,
        direction: "left" | "right"
    ) {
        setProductImages((currentImages) => {
            const newImages = [...currentImages];

            const newIndex =
                direction === "left"
                    ? index - 1
                    : index + 1;

            if (
                newIndex < 0 ||
                newIndex >= newImages.length
            ) {
                return currentImages;
            }

            [
                newImages[index],
                newImages[newIndex],
            ] = [
                newImages[newIndex],
                newImages[index],
            ];

            return newImages.map(
                (image, imageIndex) => ({
                    ...image,
                    order: imageIndex,
                })
            );
        });
    }

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
                price: Number(price),
                stock: Number(stock),
                categoryId: Number(categoryId),
                fabricId: Number(fabricId),
                featured,
                embroidery,
            };

            const images = productImages.map(
                (image, index) => ({
                    url: image.url,
                    alt: image.alt || name,
                    order: index,
                })
            );

            if (isEditing) {
                await updateAdminProduct(
                    Number(id),
                    {
                        ...data,
                        images,
                    }
                );
            } else {
                await createAdminProduct({
                    ...data,
                    images,
                });
            }

            navigate("/admin/productos");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : isEditing
                    ? "No se pudo actualizar el producto."
                    : "No se pudo crear el producto."
            );
        }
    }

    if (loading) {
        return (
            <div className="admin-product-form">
                <AdminSidebar />

                <main className="admin-product-form__main">
                    <p>
                        Cargando formulario...
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="admin-product-form">
            <AdminSidebar />

            <main className="admin-product-form__main">
                <header className="admin-product-form__header">
                    <div>
                        <span className="admin-product-form__eyebrow">
                            Administración
                        </span>

                        <h1>
                            {isEditing
                                ? "Editar producto"
                                : "Nuevo producto"}
                        </h1>
                    </div>
                </header>

                {error && (
                    <p className="admin-product-form__error">
                        {error}
                    </p>
                )}

                <form
                    className="admin-product-form__form"
                    onSubmit={handleSubmit}
                >
                    <div className="admin-product-form__field">
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

                    <div className="admin-product-form__field">
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
                            placeholder="tote-bag-margarita"
                            required
                        />
                    </div>

                    <div className="admin-product-form__field">
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
                            required
                        />
                    </div>

                    <div className="admin-product-form__row">
                        <div className="admin-product-form__field">
                            <label htmlFor="price">
                                Precio
                            </label>

                            <input
                                id="price"
                                type="number"
                                min="0"
                                value={price}
                                onChange={(event) =>
                                    setPrice(
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="admin-product-form__field">
                            <label htmlFor="stock">
                                Stock
                            </label>

                            <input
                                id="stock"
                                type="number"
                                min="-1"
                                value={stock}
                                onChange={(event) =>
                                    setStock(
                                        event.target.value
                                    )
                                }
                                placeholder="-1 = ilimitado"
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-product-form__row">
                        <div className="admin-product-form__field">
                            <label htmlFor="category">
                                Categoría
                            </label>

                            <select
                                id="category"
                                value={categoryId}
                                onChange={(event) =>
                                    setCategoryId(
                                        event.target.value
                                    )
                                }
                                required
                            >
                                <option value="">
                                    Seleccionar categoría
                                </option>

                                {categories.map(
                                    (category) => (
                                        <option
                                            key={
                                                category.id
                                            }
                                            value={
                                                category.id
                                            }
                                        >
                                            {
                                                category.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div className="admin-product-form__field">
                            <label htmlFor="fabric">
                                Tela
                            </label>

                            <select
                                id="fabric"
                                value={fabricId}
                                onChange={(event) =>
                                    setFabricId(
                                        event.target.value
                                    )
                                }
                                required
                            >
                                <option value="">
                                    Seleccionar tela
                                </option>

                                {fabrics.map(
                                    (fabric) => (
                                        <option
                                            key={
                                                fabric.id
                                            }
                                            value={
                                                fabric.id
                                            }
                                        >
                                            {fabric.name}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="admin-product-form__images">
                        <div className="admin-product-form__images-header">
                            <div>
                                <label>
                                    Imágenes del producto
                                </label>

                                <small>
                                    Podés agregar varias
                                    imágenes y ordenar
                                    la galería.
                                </small>
                            </div>

                            <label className="admin-product-form__upload-button">
                                {uploadingImage
                                    ? "Subiendo..."
                                    : "Agregar imagen"}

                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/avif"
                                    onChange={
                                        handleAddImage
                                    }
                                    disabled={
                                        uploadingImage
                                    }
                                    hidden
                                />
                            </label>
                        </div>

                        {productImages.length === 0 ? (
                            <div className="admin-product-form__images-empty">
                                <p>
                                    Todavía no agregaste
                                    imágenes.
                                </p>
                            </div>
                        ) : (
                            <div className="admin-product-form__images-grid">
                                {productImages.map(
                                    (
                                        image,
                                        index
                                    ) => (
                                        <div
                                            className="admin-product-form__image-card"
                                            key={
                                                image.id ??
                                                `${image.url}-${index}`
                                            }
                                        >
                                            <div className="admin-product-form__image-preview">
                                                <img
                                                    src={
                                                        image.url.startsWith(
                                                            "/uploads"
                                                        )
                                                            ? `${
                                                                import.meta
                                                                    .env
                                                                    .VITE_API_URL ??
                                                                "http://localhost:3000"
                                                            }${image.url}`
                                                            : image.url
                                                    }
                                                    alt={
                                                        image.alt ||
                                                        name
                                                    }
                                                />

                                                <span>
                                                    {index ===
                                                    0
                                                        ? "Principal"
                                                        : `Imagen ${
                                                            index +
                                                            1
                                                        }`}
                                                </span>
                                            </div>

                                            <div className="admin-product-form__image-actions">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleMoveImage(
                                                            index,
                                                            "left"
                                                        )
                                                    }
                                                    disabled={
                                                        index ===
                                                        0
                                                    }
                                                >
                                                    ←
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleMoveImage(
                                                            index,
                                                            "right"
                                                        )
                                                    }
                                                    disabled={
                                                        index ===
                                                        productImages.length -
                                                            1
                                                    }
                                                >
                                                    →
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveImage(
                                                            index
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    <div className="admin-product-form__options">
                        <label>
                            <input
                                type="checkbox"
                                checked={featured}
                                onChange={(event) =>
                                    setFeatured(
                                        event.target.checked
                                    )
                                }
                            />

                            Producto destacado
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={embroidery}
                                onChange={(event) =>
                                    setEmbroidery(
                                        event.target.checked
                                    )
                                }
                            />

                            Permite bordado
                        </label>
                    </div>

                    <div className="admin-product-form__actions">
                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/admin/productos"
                                )
                            }
                        >
                            Cancelar
                        </button>

                        <button type="submit">
                            {isEditing
                                ? "Guardar cambios"
                                : "Crear producto"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AdminProductForm;