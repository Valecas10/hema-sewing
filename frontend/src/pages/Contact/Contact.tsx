import { useEffect, useState } from "react";

import {
    getContactInfo,
    type ContactInfo,
} from "../../services/contactService";

import "./Contact.css";

function Contact() {
    const [contact, setContact] =
        useState<ContactInfo | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        getContactInfo()
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

    if (loading) {
        return (
            <main className="contact-page">
                <div className="contact-page__loading">
                    Cargando...
                </div>
            </main>
        );
    }

    if (error || !contact) {
        return (
            <main className="contact-page">
                <div className="contact-page__error">
                    {error ||
                        "No se pudo cargar la información de contacto."}
                </div>
            </main>
        );
    }

    const socialNetworks = [
        {
            name: "Instagram",
            url: contact.instagram,
            enabled:
                contact.instagramEnabled,
            icon: "instagram",
        },
        {
            name: "Facebook",
            url: contact.facebook,
            enabled:
                contact.facebookEnabled,
            icon: "facebook",
        },
        {
            name: "TikTok",
            url: contact.tiktok,
            enabled:
                contact.tiktokEnabled,
            icon: "tiktok",
        },
        {
            name: "WhatsApp",
            url: contact.whatsapp
                ? `https://wa.me/${contact.whatsapp.replace(
                      /\D/g,
                      ""
                  )}`
                : null,
            enabled:
                contact.whatsappEnabled,
            icon: "whatsapp",
        },
    ];

    return (
        <main className="contact-page">
            <section className="contact-page__hero">
                <span className="contact-page__eyebrow">
                    Contacto
                </span>

                <h1>
                    Estamos para ayudarte
                </h1>

                <p>
                    Encontranos en nuestras redes
                    o escribinos directamente.
                </p>
            </section>

            <section className="contact-page__content">
                <div className="contact-page__social-card">
                    <div className="contact-page__section-heading">
                        <span>
                            Redes sociales
                        </span>

                        <h2>
                            Seguinos
                        </h2>
                    </div>

                    <div className="contact-page__social-grid">
                        {socialNetworks
                            .filter(
                                (social) =>
                                    social.enabled &&
                                    social.url
                            )
                            .map((social) => (
                                <a
                                    key={
                                        social.name
                                    }
                                    href={
                                        social.url ||
                                        "#"
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-page__social-link"
                                >
                                    <span
                                        className={`contact-page__social-icon contact-page__social-icon--${social.icon}`}
                                    >
                                        {social.icon === "instagram" && (
                                            <svg
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <rect
                                                    x="3"
                                                    y="3"
                                                    width="18"
                                                    height="18"
                                                    rx="5"
                                                />
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="4"
                                                />
                                                <circle
                                                    cx="17.5"
                                                    cy="6.5"
                                                    r="1"
                                                    className="contact-page__icon-fill"
                                                />
                                            </svg>
                                        )}

                                        {social.icon === "facebook" && (
                                            <svg
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1z" />
                                            </svg>
                                        )}

                                        {social.icon === "tiktok" && (
                                            <svg
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path d="M16 3c.3 2.1 1.5 3.4 3.5 3.7v3.1c-1.4 0-2.7-.4-3.7-1.1v6.5c0 3.3-2.3 5.8-5.7 5.8C7 21 5 18.8 5 16c0-2.9 2.2-5.1 5.1-5.1.4 0 .8 0 1.2.1v3.2c-.4-.1-.7-.2-1.1-.2-1.2 0-2.1.8-2.1 2s.9 2 2.1 2c1.4 0 2.3-.9 2.3-2.5V3H16z" />
                                            </svg>
                                        )}

                                        {social.icon === "whatsapp" && (
                                            <svg
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3zm0 15.5c-1.4 0-2.7-.4-3.8-1.1l-.3-.2-2.8.7.7-2.7-.2-.3A6.5 6.5 0 1 1 12 18.5zm3.6-4.8c-.2-.1-1.3-.7-1.5-.7-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.9-.1.1-.3.2-.5.1-1.4-.7-2.3-1.2-3.2-2.7-.2-.3.2-.3.6-1 .1-.2.1-.3 0-.4-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.5 2.3 3.7 3.2 1.4.6 2 .7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.2-1-.1-.1-.2-.2-.5-.3z" />
                                            </svg>
                                        )}
                                    </span>
                                    <span>
                                        {
                                            social.name
                                        }
                                    </span>

                                    <span className="contact-page__arrow">
                                        ↗
                                    </span>
                                </a>
                            ))}
                    </div>
                </div>

                <div className="contact-page__info-card">
                    <div className="contact-page__section-heading">
                        <span>
                            Información
                        </span>

                        <h2>
                            Contacto directo
                        </h2>
                    </div>

                    <div className="contact-page__info-list">
                        <a
                            href={`mailto:${contact.email}`}
                            className="contact-page__info-item"
                        >
                            <span className="contact-page__info-label">
                                Email
                            </span>

                            <span className="contact-page__info-value">
                                {contact.email}
                            </span>
                        </a>

                        <a
                            href={`tel:${contact.phone}`}
                            className="contact-page__info-item"
                        >
                            <span className="contact-page__info-label">
                                Teléfono
                            </span>

                            <span className="contact-page__info-value">
                                {contact.phone}
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Contact;