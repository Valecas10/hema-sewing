import ProductCard from "../../product/ProductCard";

import { products } from "../../../data";

import "./ProductGrid.css";

function ProductGrid() {
    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}

export default ProductGrid;