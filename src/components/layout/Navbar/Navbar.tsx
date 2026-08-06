import { NavLink } from "react-router-dom";
import Container from "../../ui/Container";

import "./Navbar.css";

function Navbar() {
    return (
        <header className="navbar">
            <Container>
                <div className="navbar__content">

                    <NavLink
                        to="/"
                        className="navbar__logo"
                    >
                        HEMA SEWING
                    </NavLink>

                    <nav className="navbar__nav">

                        <NavLink to="/">
                            Inicio
                        </NavLink>

                        <NavLink to="/catalogo">
                            Catálogo
                        </NavLink>

                        <NavLink to="/contacto">
                            Contacto
                        </NavLink>

                    </nav>

                    <NavLink
                        to="/carrito"
                        className="navbar__cart"
                    >
                        Carrito
                    </NavLink>

                </div>
            </Container>
        </header>
    );
}

export default Navbar;