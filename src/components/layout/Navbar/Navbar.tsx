import { NavLink } from "react-router-dom";
import Container from "../../ui/Container";
import { useCart } from "../../../context/CartContext";

import "./Navbar.css";

function Navbar() {

    const { items } = useCart();

    const cartCount = items.reduce(
        (total, item) => total + item.quantity,
        0
    );
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
                            🛒

                            {cartCount > 0 && (
                                <span className="navbar__cart-count">
                                    {cartCount}
                                </span>
                            )}
                    </NavLink>

                </div>
            </Container>
        </header>
    );
}

export default Navbar;