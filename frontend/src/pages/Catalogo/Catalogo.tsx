import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";

import CategoryGrid from "../../components/category/CategoryGrid";
import Breadcrumbs from "../../components/ui/BreadCrum/Breadcrumbs";

function Catalogo() {
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
                        }]}
                 />
                <CategoryGrid />
            </Container>
        </Section>
    );
}

export default Catalogo;