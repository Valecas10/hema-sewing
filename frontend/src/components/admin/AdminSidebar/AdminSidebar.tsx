import { NavLink } from "react-router-dom";

import "./AdminSidebar.css";

function AdminSidebar() {
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar__header">
                <span className="admin-sidebar__brand">
                    HEMA SEWING
                </span>

                <span className="admin-sidebar__label">
                    ADMIN
                </span>
            </div>

            <nav className="admin-sidebar__nav">
                <NavLink
                    to="/admin"
                    end
                    className="admin-sidebar__link"
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/productos"
                    className="admin-sidebar__link"
                >
                    Productos
                </NavLink>

                <NavLink
                    to="/admin/categorias"
                    className="admin-sidebar__link"
                >
                    Categorías
                </NavLink>

                <NavLink
                    to="/admin/telas"
                    className="admin-sidebar__link"
                >
                    Telas
                </NavLink>

                <NavLink
                    to="/admin/pedidos"
                    className="admin-sidebar__link"
                >
                    Pedidos
                </NavLink>
            </nav>

            <div className="admin-sidebar__footer">
                <button
                    type="button"
                    className="admin-sidebar__logout"
                    onClick={() => {
                        localStorage.removeItem("adminToken");
                        localStorage.removeItem("admin");

                        window.location.href =
                            "/admin/login";
                    }}
                >
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;