import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";

import "./CartSummary.css";

function CartSummary() {
    const { items } = useCart();

    const subtotal = items.reduce(
        (total, item) =>
            total +
            item.product.price * item.quantity,
        0
    );

    return (
        <aside className="cart-summary">
            <h2>Resumen del pedido</h2>

            <div className="cart-summary__row">
                <span>Subtotal</span>

                <span>
                    ${subtotal.toLocaleString("es-AR")}
                </span>
            </div>

            <div className="cart-summary__total">
                <span>Total</span>

                <span>
                    ${subtotal.toLocaleString("es-AR")}
                </span>
            </div>

            <Link
                to="/checkout"
                className="cart-summary__button"
            >
                Continuar compra
            </Link>
        </aside>
    );
}

export default CartSummary;