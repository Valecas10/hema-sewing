import Container from "../../ui/Container";
import Section from "../../ui/Section";

import ProductCard from "../../product/ProductCard";

import { products } from "../../../data";

import "./FeaturedProducts.css";
import Button from "../../ui/Button";

import { Link } from "react-router-dom";

function FeaturedProducts() {

    const featuredProducts = products
        .filter(product => product.featured)
        .slice(0, 3);

    return (
        <Section>

            <Container>

                <div className="featured-products">

                    <h2 className="featured-products__title">
                        Nuestros productos
                    </h2>

                    <div className="featured-products__grid">

                        {featuredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}

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