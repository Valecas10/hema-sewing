import { Link } from "react-router-dom";

import "./Breadcrumbs.css";

interface BreadcrumbItem {
    label: string;
    path: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

function Breadcrumbs({
    items,
}: BreadcrumbsProps) {
    return (
        <nav className="breadcrumbs">
            {items.map((item, index) => (
                <span key={item.path}>
                    <Link to={item.path}>
                        {item.label}
                    </Link>

                    {index < items.length - 1 && (
                        <span> / </span>
                    )}
                </span>
            ))}
        </nav>
    );
}

export default Breadcrumbs;