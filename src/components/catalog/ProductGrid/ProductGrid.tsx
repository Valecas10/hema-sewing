import ProductCard from "../../product/ProductCard";

import { products } from "../../../data";

import "./ProductGrid.css";

interface ProductGridProps {
    categorySlug?: string;
}

function ProductGrid({
    categorySlug,
}: ProductGridProps) {
    const filteredProducts = categorySlug
        ? products.filter(
              (product) =>
                  product.category.slug === categorySlug
          )
        : products;
    return (
        <div className="product-grid">
            {filteredProducts.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}

export default ProductGrid;