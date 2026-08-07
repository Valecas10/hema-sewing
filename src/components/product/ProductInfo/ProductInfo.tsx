import type { Product } from "../../../types";

import "./ProductInfo.css";

interface ProductInfoProps {
    product: Product;
}

function ProductInfo({
    product,
}: ProductInfoProps) {
    return (
        <div className="product-info">
            <span className="product-info__category">
                {product.category.name}
            </span>

            <p className="product-info__description">
                {product.description}
            </p>

            <p className="product-info__price">
                ${product.price}
            </p>

            <button className="product-info__button">
                Agregar al carrito
            </button>
        </div>
    );
}

export default ProductInfo;