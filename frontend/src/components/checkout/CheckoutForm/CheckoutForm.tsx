import { useState } from "react";

import "./CheckoutForm.css";

export interface CheckoutFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: "pickup" | "shipping";
    address: string;
    city: string;
    postalCode: string;
}

interface CheckoutFormProps {
    onSubmit: (data: CheckoutFormData) => void;
}

function CheckoutForm({
    onSubmit,
}: CheckoutFormProps) {
    const [deliveryMethod, setDeliveryMethod] =
        useState("pickup");

    return (
        <form
            className="checkout-form"
            onSubmit={(event) => {
                event.preventDefault();

                const formData =
                    new FormData(event.currentTarget);

                onSubmit({
                    firstName:
                        formData.get("firstName") as string,

                    lastName:
                        formData.get("lastName") as string,

                    email:
                        formData.get("email") as string,

                    phone:
                        formData.get("phone") as string,

                    deliveryMethod:
                        formData.get(
                            "deliveryMethod"
                        ) as "pickup" | "shipping",

                    address:
                        formData.get("address") as string,

                    city:
                        formData.get("city") as string,

                    postalCode:
                        formData.get(
                            "postalCode"
                        ) as string,
                });
            }}
        >
            {/* Datos de contacto */}

            <section className="checkout-form__section">
                <h2>Datos de contacto</h2>

                <div className="checkout-form__row">
                    <div className="checkout-form__field">
                        <label htmlFor="firstName">
                            Nombre
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="given-name"
                            required
                        />
                    </div>

                    <div className="checkout-form__field">
                        <label htmlFor="lastName">
                            Apellido
                        </label>

                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            required
                        />
                    </div>
                </div>

                <div className="checkout-form__field">
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="checkout-form__field">
                    <label htmlFor="phone">
                        Teléfono
                    </label>

                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                    />
                </div>
            </section>

            {/* Método de entrega */}

            <section className="checkout-form__section">
                <h2>Método de entrega</h2>

                <div className="checkout-form__options">
                    <label className="checkout-form__option">
                        <input
                            type="radio"
                            name="deliveryMethod"
                            value="pickup"
                            checked={
                                deliveryMethod ===
                                "pickup"
                            }
                            onChange={(event) =>
                                setDeliveryMethod(
                                    event.target.value
                                )
                            }
                        />

                        <span>Retiro</span>
                    </label>

                    <label className="checkout-form__option">
                        <input
                            type="radio"
                            name="deliveryMethod"
                            value="shipping"
                            checked={
                                deliveryMethod ===
                                "shipping"
                            }
                            onChange={(event) =>
                                setDeliveryMethod(
                                    event.target.value
                                )
                            }
                        />

                        <span>Envío</span>
                    </label>
                </div>

                {deliveryMethod === "shipping" && (
                    <div className="checkout-form__shipping">
                        <div className="checkout-form__field">
                            <label htmlFor="address">
                                Dirección
                            </label>

                            <input
                                id="address"
                                name="address"
                                type="text"
                                autoComplete="street-address"
                                required
                            />
                        </div>

                        <div className="checkout-form__row">
                            <div className="checkout-form__field">
                                <label htmlFor="city">
                                    Ciudad
                                </label>

                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    autoComplete="address-level2"
                                    required
                                />
                            </div>

                            <div className="checkout-form__field">
                                <label htmlFor="postalCode">
                                    Código postal
                                </label>

                                <input
                                    id="postalCode"
                                    name="postalCode"
                                    type="text"
                                    autoComplete="postal-code"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <button
                type="submit"
                className="checkout-form__submit"
            >
                Confirmar pedido
            </button>
        </form>
    );
}

export default CheckoutForm;