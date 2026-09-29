import { Link } from "react-router-dom";

import type { Category } from "../../../types";

import "./CategoryCard.css";

interface CategoryCardProps {
    category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
    const imageUrl = category.image?.startsWith("/uploads")
        ? `${
            import.meta.env.VITE_API_URL ??
            "http://localhost:3000"
        }${category.image}`
        : category.image;

    return (
        <Link
            to={`/catalogo/${category.slug}`}
            className="category-card"
        >
            <img
                src={imageUrl}
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