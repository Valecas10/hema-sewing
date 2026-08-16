import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

function Card({
    children,
    className = "",
    ...props
}: CardProps) {
    return (
        <article
            className={`card ${className}`}
            {...props}
        >
            {children}
        </article>
    );
}

export default Card;