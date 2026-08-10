import CheckoutForm, {
    type CheckoutFormData,
} from "../../components/checkout/CheckoutForm";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

import "./Checkout.css";

function Checkout() {
    const [orderData, setOrderData] =
        useState<CheckoutFormData | null>(null);

    const { items, clearCart } = useCart();
    const navigate = useNavigate();

    function handleOrderSubmit(data: CheckoutFormData) {
        setOrderData(data);

        console.log("Pedido:", {
            customer: data,
            items,
        });

        clearCart();

        navigate("/pedido-confirmado");
    }

    return (
        <main className="checkout-page">
            <div className="checkout-page__container">
                <h1>Finalizar compra</h1>

                <div className="checkout-page__content">
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