import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SearchBar from "../../components/catalog/SearchBar/SearchBar";
import FabricFilter from "../../components/catalog/FabricFilter";
import EmbroideryFilter from "../../components/catalog/EmbroideryFilter";
import SortSelect from "../../components/catalog/SortSelect";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import ProductGrid from "../../components/catalog/ProductGrid";
import Breadcrumbs from "../../components/ui/BreadCrum/Breadcrumbs";

import {
    getProducts,
    getCategories,
    getFabrics,
} from "../../services/productService";

import type {
    Product,
    Category,
    Fabric,
} from "../../types";

import "./CatalogCategory.css";

function CatalogCategory() {
    const { slug } = useParams();

    const [products, setProducts] =
        useState<Product[]>([]);

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [fabrics, setFabrics] =
        useState<Fabric[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [fabric, setFabric] =
        useState("all");

    const [embroidery, setEmbroidery] =
        useState("all");

    const [sort, setSort] =
        useState("name-asc");

    useEffect(() => {
        Promise.all([
            getProducts(),
            getCategories(),
            getFabrics(),
        ])
            .then(
                ([
                    productsData,
                    categoriesData,
                    fabricsData,
                ]) => {
                    setProducts(productsData);
                    setCategories(categoriesData);
                    setFabrics(fabricsData);
                }
            )
            .catch(() => {
                setError(
                    "No se pudieron cargar los datos."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const category = categories.find(
        (item) => item.slug === slug
    );

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
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
                            label: category?.name || "",
                            path: `/catalogo/${slug}`,
                        },
                    ]}
                />

                <SearchBar
                    value={search}
                    onChange={setSearch}
                />

                <div className="catalog-category__filters">
                    <FabricFilter
                        fabrics={fabrics}
                        value={fabric}
                        onChange={setFabric}
                    />

                    <EmbroideryFilter
                        value={embroidery}
                        onChange={setEmbroidery}
                    />

                    <SortSelect
                        value={sort}
                        onChange={setSort}
                    />
                </div>

                <ProductGrid
                    products={products}
                    categorySlug={slug}
                    search={search}
                    fabric={fabric}
                    embroidery={embroidery}
                    sort={sort}
                />
            </Container>
        </Section>
    );
}

export default CatalogCategory;