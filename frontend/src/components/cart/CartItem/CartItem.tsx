import type { CartItem as CartItemType } from "../../../context/CartContext";

import { useCart } from "../../../context/CartContext";

import "./CartItem.css";

interface CartItemProps {
    item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
    const {
        updateQuantity,
        removeFromCart,
    } = useCart();

    const { product, quantity } = item;

    function increaseQuantity() {
        if (
            product.stock === -1 ||
            quantity < product.stock
        ) {
            updateQuantity(
                product.id,
                quantity + 1
            );
        }
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            updateQuantity(
                product.id,
                quantity - 1
            );
        }
    }

    return (
        <article className="cart-item">
            <img
                src={product.images[0].url}
                alt={product.images[0].alt}
                className="cart-item__image"
            />

            <div className="cart-item__info">
                <h3 className="cart-item__name">
                    {product.name}
                </h3>

                <p className="cart-item__price">
                    ${product.price}
                </p>

                <div className="cart-item__quantity">
                    <button
                        type="button"
                        onClick={decreaseQuantity}
                    >
                        −
                    </button>

                    <span>{quantity}</span>

                    <button
                        type="button"
                        onClick={increaseQuantity}
                    >
                        +
                    </button>
                </div>

                <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() =>
                        removeFromCart(product.id)
                    }
                >
                    Eliminar
                </button>
            </div>
        </article>
    );
}

export default CartItem;