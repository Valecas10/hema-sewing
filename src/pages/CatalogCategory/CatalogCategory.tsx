import { useParams } from "react-router-dom";
import { categories } from "../../data/categories";

import { useState } from "react";

import SearchBar from "../../components/catalog/SearchBar/SearchBar";
import FabricFilter from "../../components/catalog/FabricFilter";
import EmbroideryFilter from "../../components/catalog/EmbroideryFilter";
import SortSelect from "../../components/catalog/SortSelect";

import { fabrics } from "../../data/fabrics";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import ProductGrid from "../../components/catalog/ProductGrid";
import Breadcrumbs from "../../components/ui/BreadCrum/Breadcrumbs";

import "./CatalogCategory.css";


function CatalogCategory() {
    const { slug } = useParams();

    const category = categories.find(
        (item) => item.slug === slug
    );

    const [search, setSearch] = useState("");
    const [fabric, setFabric] = useState("all");
    const [embroidery, setEmbroidery] = useState("all");
    const [sort, setSort] = useState("name-asc");

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
                        }  
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