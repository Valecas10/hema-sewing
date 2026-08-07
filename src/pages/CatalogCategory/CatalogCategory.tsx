import { useParams } from "react-router-dom";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import ProductGrid from "../../components/catalog/ProductGrid";

function CatalogCategory() {
    const { slug } = useParams();

    return (
        <Section>
            <Container>
                <ProductGrid categorySlug={slug} />
            </Container>
        </Section>
    );
}

export default CatalogCategory;