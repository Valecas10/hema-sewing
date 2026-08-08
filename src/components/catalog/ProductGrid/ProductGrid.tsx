import ProductCard from "../../product/ProductCard";

import { products } from "../../../data";

import "./ProductGrid.css";

interface ProductGridProps {
    categorySlug?: string;
    search?: string;
    fabric?: string;
    embroidery?: string;
    sort?: string;
}

function ProductGrid({
    categorySlug,
    search = "",
    fabric = "all",
    embroidery = "all",
    sort = "name-asc",
}: ProductGridProps) {
    const filteredProducts = products.filter((product) => {
    const matchesCategory =
        !categorySlug ||
        product.category.slug === categorySlug;

    const matchesSearch =
        product.name
            .toLowerCase()
            .includes(search.toLowerCase());
    
    const matchesFabric =
        fabric === "all" ||
        product.fabric.slug === fabric;

    const matchesEmbroidery =
        embroidery === "all" ||
        (embroidery === "embroidered" &&
            product.embroidery) ||
        (embroidery === "not-embroidered" &&
            !product.embroidery);


    return (
        matchesCategory &&
        matchesSearch &&
        matchesFabric &&
        matchesEmbroidery
        );
    });
    const sortedProducts = [...filteredProducts].sort(
        (a, b) => {
            switch (sort) {
                case "name-asc":
                    return a.name.localeCompare(b.name);

                case "name-desc":
                    return b.name.localeCompare(a.name);

                case "price-asc":
                    return a.price - b.price;

                case "price-desc":
                    return b.price - a.price;

                default:
                    return 0;
            }
        }
    );

    return (
        <div className="product-grid">
            {sortedProducts.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}

export default ProductGrid;