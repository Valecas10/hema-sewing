import { useCart } from "../../../context/CartContext";

import "./CheckoutSummary.css";

function CheckoutSummary() {
    const { items } = useCart();

    const subtotal = items.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );

    return (
        <aside className="checkout-summary">
            <h2>Resumen del pedido</h2>

            <div className="checkout-summary__products">
                {items.map((item) => (
                    <div
                        key={item.product.id}
                        className="checkout-summary__product"
                    >
                        <div>
                            <p className="checkout-summary__name">
                                {item.product.name}
                            </p>

                            <p className="checkout-summary__quantity">
                                Cantidad: {item.quantity}
                            </p>
                        </div>

                        <span>
                            $
                            {(
                                item.product.price *
                                item.quantity
                            ).toLocaleString("es-AR")}
                        </span>
                    </div>
                ))}
            </div>

            <div className="checkout-summary__subtotal">
                <span>Subtotal</span>

                <span>
                    ${subtotal.toLocaleString("es-AR")}
                </span>
            </div>

            <div className="checkout-summary__total">
                <span>Total</span>

                <span>
                    ${subtotal.toLocaleString("es-AR")}
                </span>
            </div>
        </aside>
    );
}

export default CheckoutSummary;