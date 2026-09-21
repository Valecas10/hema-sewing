import { useEffect, useState } from "react";

import AdminSidebar from "../../../components/admin/AdminSidebar/AdminSidebar";

import {
    getAdminContactInfo,
    updateAdminContactInfo,
    type AdminContactInfo,
} from "../../../services/adminService";

import "./AdminContact.css";

function AdminContact() {
    const [contact, setContact] =
        useState<AdminContactInfo | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    useEffect(() => {
        getAdminContactInfo()
            .then((data) => {
                setContact(data);
            })
            .catch((error) => {
                setError(
                    error instanceof Error
                        ? error.message
                        : "No se pudo cargar la información."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function updateField(
        field: keyof AdminContactInfo,
        value: string | boolean
    ) {
        setContact((current) => {
            if (!current) {
                return current;
            }

            return {
                ...current,
                [field]: value,
            };
        });
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!contact) {
            return;
        }

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const updated =
                await updateAdminContactInfo({
                    email: contact.email,
                    phone: contact.phone,

                    instagram:
                        contact.instagram || "",
                    facebook:
                        contact.facebook || "",
                    tiktok:
                        contact.tiktok || "",
                    whatsapp:
                        contact.whatsapp || "",

                    instagramEnabled:
                        contact.instagramEnabled,
                    facebookEnabled:
                        contact.facebookEnabled,
                    tiktokEnabled:
                        contact.tiktokEnabled,
                    whatsappEnabled:
                        contact.whatsappEnabled,
                });

            setContact(updated);

            setMessage(
                "La información se guardó correctamente."
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudieron guardar los cambios."
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="admin-contact">
                <AdminSidebar />

                <main className="admin-contact__main">
                    <p>
                        Cargando información...
                    </p>
                </main>
            </div>
        );
    }

    if (!contact) {
        return (
            <div className="admin-contact">
                <AdminSidebar />

                <main className="admin-contact__main">
                    <p>
                        {error ||
                            "No se encontró la información de contacto."}
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="admin-contact">
            <AdminSidebar />

            <main className="admin-contact__main">
                <header className="admin-contact__header">
                    <div>
                        <span>
                            Administración
                        </span>

                        <h1>
                            Información de contacto
                        </h1>
                    </div>
                </header>

                {message && (
                    <div className="admin-contact__message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="admin-contact__error">
                        {error}
                    </div>
                )}

                <form
                    className="admin-contact__form"
                    onSubmit={handleSubmit}
                >
                    <section className="admin-contact__card">
                        <h2>
                            Datos de contacto
                        </h2>

                        <div className="admin-contact__field">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={contact.email}
                                onChange={(event) =>
                                    updateField(
                                        "email",
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="admin-contact__field">
                            <label htmlFor="phone">
                                Teléfono
                            </label>

                            <input
                                id="phone"
                                type="text"
                                value={contact.phone}
                                onChange={(event) =>
                                    updateField(
                                        "phone",
                                        event.target.value
                                    )
                                }
                                required
                            />
                        </div>
                    </section>

                    <section className="admin-contact__card">
                        <div className="admin-contact__card-header">
                            <div>
                                <h2>
                                    Redes sociales
                                </h2>

                                <p>
                                    Podés ocultar cualquier
                                    red sin eliminar su enlace.
                                </p>
                            </div>
                        </div>

                        <div className="admin-contact__social">
                            <div className="admin-contact__social-info">
                                <strong>
                                    Instagram
                                </strong>

                                <span>
                                    Perfil de Instagram
                                </span>
                            </div>

                            <input
                                type="url"
                                value={
                                    contact.instagram ||
                                    ""
                                }
                                placeholder="https://instagram.com/..."
                                onChange={(event) =>
                                    updateField(
                                        "instagram",
                                        event.target.value
                                    )
                                }
                            />

                            <label className="admin-contact__switch">
                                <input
                                    type="checkbox"
                                    checked={
                                        contact.instagramEnabled
                                    }
                                    onChange={(event) =>
                                        updateField(
                                            "instagramEnabled",
                                            event.target.checked
                                        )
                                    }
                                />

                                <span>
                                    Activa
                                </span>
                            </label>
                        </div>

                        <div className="admin-contact__social">
                            <div className="admin-contact__social-info">
                                <strong>
                                    Facebook
                                </strong>

                                <span>
                                    Página de Facebook
                                </span>
                            </div>

                            <input
                                type="url"
                                value={
                                    contact.facebook ||
                                    ""
                                }
                                placeholder="https://facebook.com/..."
                                onChange={(event) =>
                                    updateField(
                                        "facebook",
                                        event.target.value
                                    )
                                }
                            />

                            <label className="admin-contact__switch">
                                <input
                                    type="checkbox"
                                    checked={
                                        contact.facebookEnabled
                                    }
                                    onChange={(event) =>
                                        updateField(
                                            "facebookEnabled",
                                            event.target.checked
                                        )
                                    }
                                />

                                <span>
                                    Activa
                                </span>
                            </label>
                        </div>

                        <div className="admin-contact__social">
                            <div className="admin-contact__social-info">
                                <strong>
                                    TikTok
                                </strong>

                                <span>
                                    Perfil de TikTok
                                </span>
                            </div>

                            <input
                                type="url"
                                value={
                                    contact.tiktok ||
                                    ""
                                }
                                placeholder="https://tiktok.com/@..."
                                onChange={(event) =>
                                    updateField(
                                        "tiktok",
                                        event.target.value
                                    )
                                }
                            />

                            <label className="admin-contact__switch">
                                <input
                                    type="checkbox"
                                    checked={
                                        contact.tiktokEnabled
                                    }
                                    onChange={(event) =>
                                        updateField(
                                            "tiktokEnabled",
                                            event.target.checked
                                        )
                                    }
                                />

                                <span>
                                    Activa
                                </span>
                            </label>
                        </div>

                        <div className="admin-contact__social">
                            <div className="admin-contact__social-info">
                                <strong>
                                    WhatsApp
                                </strong>

                                <span>
                                    Número de WhatsApp
                                </span>
                            </div>

                            <input
                                type="text"
                                value={
                                    contact.whatsapp ||
                                    ""
                                }
                                placeholder="54911..."
                                onChange={(event) =>
                                    updateField(
                                        "whatsapp",
                                        event.target.value
                                    )
                                }
                            />

                            <label className="admin-contact__switch">
                                <input
                                    type="checkbox"
                                    checked={
                                        contact.whatsappEnabled
                                    }
                                    onChange={(event) =>
                                        updateField(
                                            "whatsappEnabled",
                                            event.target.checked
                                        )
                                    }
                                />

                                <span>
                                    Activa
                                </span>
                            </label>
                        </div>
                    </section>

                    <div className="admin-contact__actions">
                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Guardando..."
                                : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AdminContact;