import { Link } from "react-router-dom";

import "./OrderConfirmation.css";

function OrderConfirmation() {
    return (
        <main className="order-confirmation">
            <div className="order-confirmation__container">
                <div className="order-confirmation__content">
                    <h1>¡Pedido recibido!</h1>

                    <p>
                        Gracias por tu compra en
                        Hema Sewing.
                    </p>

                    <p>
                        Recibimos tu pedido
                        correctamente.
                    </p>

                    <Link
                        to="/catalogo"
                        className="order-confirmation__button"
                    >
                        Volver al catálogo
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default OrderConfirmation;