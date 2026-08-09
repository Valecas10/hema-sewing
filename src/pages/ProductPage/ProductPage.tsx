import { useParams } from "react-router-dom";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";

import ProductGallery from "../../components/product/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo";
import RelatedProducts from "../../components/product/RelatedProducts";

import { products } from "../../data";

import "./ProductPage.css";
import Breadcrumbs from "../../components/ui/BreadCrum/Breadcrumbs";

function ProductPage() {
    const { slug } = useParams();

    const product = products.find(
        (product) => product.slug === slug
    );

    console.log(product);
    console.log(slug);
    console.log("product");


    if (!product) {
        return <h1>Producto no encontrado</h1>;
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
                    <ProductGallery product={product} />

                    <ProductInfo product={product} />
                </div>

                <RelatedProducts product={product} />

            </Container>
        </Section>
    );
}

export default ProductPage;