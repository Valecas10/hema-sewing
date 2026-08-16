import { Link } from "react-router-dom";

import Card from "../../ui/Card";

import type { Product } from "../../../types";

import "./ProductCard.css";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            to={`/producto/${product.slug}`}
            className="product-card__link"
        >
            <Card className="product-card">
                <img
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    className="product-card__image"
                />

                <div className="product-card__content">
                    <h3 className="product-card__title">
                        {product.name}
                    </h3>

                    <p className="product-card__price">
                        ${product.price}
                    </p>
                </div>
            </Card>
        </Link>
    );
}

export default ProductCard;