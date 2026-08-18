import { useState } from "react";
import { loginAdmin } from "../../../services/adminService";
import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        try {
            const result = await loginAdmin({
                email,
                password,
            });

            localStorage.setItem(
                "adminToken",
                result.token
            );

            localStorage.setItem(
                "admin",
                JSON.stringify(result.admin)
            );

            navigate("/admin");
        } catch (error) {
            console.error(
                "Error al iniciar sesión:",
                error
            );
        }
    }

    return (
        <main className="admin-login">
            <div className="admin-login__card">
                <div className="admin-login__header">
                    <span className="admin-login__brand">
                        HEMA SEWING
                    </span>

                    <span className="admin-login__label">
                        ADMIN
                    </span>

                    <h1>
                        Iniciar sesión
                    </h1>

                    <p>
                        Accedé al panel de administración.
                    </p>
                </div>

                <form
                    className="admin-login__form"
                    onSubmit={handleSubmit}
                >
                    <div className="admin-login__field">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="admin-login__field">
                        <label htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="admin-login__submit"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </main>
    );
}

export default AdminLogin;