import ProductCard from "../ProductCard";

import type { Product } from "../../../types";

import "./RelatedProducts.css";

interface RelatedProductsProps {
    product: Product;
    products: Product[];
}

function RelatedProducts({
    product,
    products,
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
                {relatedProducts.map((relatedProduct) => (
                    <ProductCard
                        key={relatedProduct.id}
                        product={relatedProduct}
                    />
                ))}
            </div>
        </section>
    );
}

export default RelatedProducts;