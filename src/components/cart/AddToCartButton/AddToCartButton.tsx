import type { Product } from "../../../types";

import { useCart } from "../../../context/CartContext";

import "./AddToCartButton.css";

interface AddToCartButtonProps {
    product: Product;
    quantity: number;
}

function AddToCartButton({
    product,
    quantity,
}: AddToCartButtonProps) {
    const { addToCart } = useCart();

    function handleAddToCart() {
        addToCart(product, quantity);
    }

    return (
        <button
            type="button"
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
        >
            {product.stock === 0
                ? "Agotado"
                : "Agregar al carrito"}
        </button>
    );
}

export default AddToCartButton;