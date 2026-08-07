import CategoryCard from "../CategoryCard";

import { categories } from "../../../data";

import "./CategoryGrid.css";

function CategoryGrid() {
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