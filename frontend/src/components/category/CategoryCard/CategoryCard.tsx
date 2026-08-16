import { Link } from "react-router-dom";

import type { Category } from "../../../types";

import "./CategoryCard.css";

interface CategoryCardProps {
    category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link
            to={`/catalogo/${category.slug}`}
            className="category-card"
        >
            <img
                src={category.image}
                alt={category.name}
                className="category-card__image"
            />

            <div className="category-card__overlay">
                <h3>{category.name}</h3>
            </div>
        </Link>
    );
}

export default CategoryCard;