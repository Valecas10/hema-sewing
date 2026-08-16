import { useEffect, useState } from "react";

import Container from "../../ui/Container";
import Section from "../../ui/Section";

import ProductCard from "../../product/ProductCard";

import {
    getProducts,
} from "../../../services/productService";

import type { Product } from "../../../types";

import "./FeaturedProducts.css";
import Button from "../../ui/Button";

import { Link } from "react-router-dom";

function FeaturedProducts() {
    const [products, setProducts] =
        useState<Product[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        getProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch(() => {
                setError(
                    "No se pudieron cargar los productos."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const featuredProducts = products
        .filter((product) => product.featured)
        .slice(0, 3);

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Section>
            <Container>
                <div className="featured-products">

                    <h2 className="featured-products__title">
                        Nuestros productos
                    </h2>

                    <div className="featured-products__grid">

                        {featuredProducts.map(
                            (product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            )
                        )}

                    </div>

                    <div className="featured-products__actions">
                        <Link to="/catalogo">
                            <Button>
                                Ver catálogo completo
                            </Button>
                        </Link>
                    </div>

                </div>
            </Container>
        </Section>
    );
}

export default FeaturedProducts;