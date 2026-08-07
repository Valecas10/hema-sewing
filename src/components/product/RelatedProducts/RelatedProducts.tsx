import ProductCard from "../ProductCard";

import { products } from "../../../data";

import type { Product } from "../../../types";

import "./RelatedProducts.css";

interface RelatedProductsProps {
    product: Product;
}

function RelatedProducts({
    product,
}: RelatedProductsProps) {
    const relatedProducts = products
        .filter(
            (item) =>
                item.category.slug ===
                    product.category.slug &&
                item.id !== product.id
        )
        .slice(0, 3);

    return (
        <section className="related-products">
            <h2>Productos relacionados</h2>

            <div className="related-products__grid">
                {relatedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}

export default RelatedProducts;