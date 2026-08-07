import Container from "../../ui/Container";

import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <div className="footer__content">

                    <div className="footer__brand">
                        <h2>HEMA SEWING</h2>
                        <p>
                            Productos textiles confeccionados artesanalmente.
                        </p>
                    </div>

                    <nav className="footer__links">
                        <a href="/">Inicio</a>
                        <a href="/catalogo">Catálogo</a>
                        <a href="/contacto">Contacto</a>
                    </nav>

                </div>

                <div className="footer__bottom">
                    © {new Date().getFullYear()} Hema Sewing.
                </div>
            </Container>
        </footer>
    );
}

export default Footer;