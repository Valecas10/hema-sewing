import { useEffect, useState } from "react";

import CategoryCard from "../CategoryCard";

import { getCategories } from "../../../services/productService";

import type { Category } from "../../../types";

import "./CategoryGrid.css";

function CategoryGrid() {
    const [categories, setCategories] =
        useState<Category[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch(() => {
                setError(
                    "No se pudieron cargar las categorías."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Cargando categorías...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="category-grid">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                />
            ))}
        </div>
    );
}

export default CategoryGrid;