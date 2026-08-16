import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";

import ProductGallery from "../../components/product/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo";
import RelatedProducts from "../../components/product/RelatedProducts";

import type { Product } from "../../types";
import {
    getProductBySlug,
    getProducts,
} from "../../services/productService";

import "./ProductPage.css";
import Breadcrumbs from "../../components/ui/BreadCrum/Breadcrumbs";



function ProductPage() {
    const { slug } = useParams();

    const [product, setProduct] =
        useState<Product | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [products, setProducts] =
        useState<Product[]>([]);

    useEffect(() => {
        if (!slug) {
            setError("Producto no encontrado.");
            setLoading(false);
            return;
        }

        Promise.all([
            getProductBySlug(slug),
            getProducts(),
        ])
            .then(([productData, productsData]) => {
                setProduct(productData);
                setProducts(productsData);
            })
            .catch(() => {
                setError(
                    "No se pudo cargar el producto."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <p>Cargando producto...</p>;
    }

    if (error || !product) {
        return (
            <p>
                {error || "Producto no encontrado."}
            </p>
        );
    }

    return (
        <Section>
            <Container>
                <Breadcrumbs
                    items={[
                        {
                            label: "Inicio",
                            path: "/",
                        },
                        {
                            label: "Catálogo",
                            path: "/catalogo",
                        },
                        {
                            label: product.category.name,
                            path: `/catalogo/${product.category.slug}`,
                        },
                        {
                            label: product.name,
                            path: `/producto/${product.slug}`,
                        },
                    ]}
                />

                <h1 className="product-page__title">
                    {product.name}
                </h1>

                <div className="product-page__content">
                    <ProductGallery
                        product={product}
                    />

                    <ProductInfo
                        product={product}
                    />
                </div>

                <RelatedProducts
                    product={product}
                    products={products}
                />
            </Container>
        </Section>
    );
}

export default ProductPage;