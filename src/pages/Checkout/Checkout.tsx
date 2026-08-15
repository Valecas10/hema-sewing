import CheckoutForm, {
    type CheckoutFormData,
} from "../../components/checkout/CheckoutForm";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Toast from "../../components/ui/Toast/Toast";

import { createOrder } from "../../services/orderService";

import "./Checkout.css";

function Checkout() {
    const [error, setError] = useState("");
    const { items, clearCart } = useCart();
    const navigate = useNavigate();

    async function handleOrderSubmit(
        data: CheckoutFormData
    ) {
        setError("");

        try {
            const order = await createOrder({
                ...data,
                items: items.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
            });

            console.log("Pedido creado:", order);

            clearCart();

            navigate("/pedido-confirmado");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo crear el pedido."
            );
        }
    }

    return (
        <main className="checkout-page">
            <div className="checkout-page__container">
                <h1>Finalizar compra</h1>

                <div className="checkout-page__content">
                    {error && (
                        <Toast
                            message={error}
                            type="error"
                            onClose={() => setError("")}
                        />
                    )}
                    <CheckoutForm
                        onSubmit={handleOrderSubmit}
                    />

                    <CheckoutSummary />
                </div>
            </div>
        </main>
    );
}

export default Checkout;