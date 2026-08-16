import type { Product } from "../../../types";

import "./ProductInfo.css";

import AddToCartButton from "../../cart/AddToCartButton";

import { useState } from "react";


interface ProductInfoProps {
    product: Product;
}

function ProductInfo({
    product,
}: ProductInfoProps) {

    const [quantity, setQuantity] = useState(1);

    function increaseQuantity() {
        if (
            product.stock === -1 ||
            quantity < product.stock
        ) {
            setQuantity(quantity + 1);
        }
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const available = product.stock === -1 || product.stock > 0;

    return (
        <div className="product-info">
            <span className="product-info__category">
                {product.category.name}
            </span>

            <p className="product-info__stock">
                {available ? "Disponible" : "Agotado"}
            </p>

            {product.stock !== -1 && (
                <p className="product-info__remaining-stock">
                    Stock disponible: {product.stock}
                </p>
            )}

            <div className="product-info__quantity">
                 <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                >
                    −
                </button>

                <span>{quantity}</span>

                <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={
                        product.stock !== -1 &&
                        quantity >= product.stock
                    }
                >
                    +
                </button>
            </div>

            <p className="product-info__description">
                {product.description}
            </p>

            <p className="product-info__price">
                ${product.price}
            </p>

            <AddToCartButton
                product={product}
                quantity={quantity}
            />
        </div>
    );
}

export default ProductInfo;