import { useCart } from "../../context/CartContext";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

import "./Carrito.css";

function Carrito() {
    const { items, clearCart } = useCart();

    return (
        <main className="cart-page">
            <section className="section">
                <div className="cart-page__container">

                    <h1 className="carrito__title">
                        Tu Selección
                    </h1>

                    {items.length > 0 && (
                        <button
                            type="button"
                            className="cart-page__clear"
                            onClick={clearCart}
                        >
                            Vaciar carrito
                        </button>
                    )}

                    {items.length === 0 ? (
                        <p className="cart-page__empty">
                            No hay productos seleccionados.
                        </p>
                    ) : (
                        <div className="cart-page__content">

                            <section className="cart-page__items">
                                {items.map((item) => (
                                    <CartItem
                                        key={item.product.id}
                                        item={item}
                                    />
                                ))}
                            </section>

                            <CartSummary />

                        </div>
                    )}

                </div>
            </section>
        </main>
    );
}

export default Carrito;