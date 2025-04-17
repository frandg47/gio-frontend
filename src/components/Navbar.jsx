import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../css/navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        if (path === "/proyectos") {
            return location.pathname.startsWith("/proyectos");
        }
        return location.pathname === path;
    };
    

    const handleContactClick = () => {
        setMenuOpen(false);

        if (location.pathname === "/") {
            // Ya estamos en la home, solo scrollear
            const section = document.getElementById("contact");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Navegar a la home y pasar estado
            navigate("/", { state: { scrollTo: "contact" } });
        }
    };

    return (
        <header className="main-header">
            <a href="#" className="main-logo" onClick={() => setMenuOpen(false)}>
                <img src="/LOGO 2.png" alt="logo" width={100} height={50} />
            </a>

            <nav className={`main-navbar ${menuOpen ? 'menu-active' : ''}`}>
                <Link
                    to="/"
                    className={isActive("/") ? "active-link" : ""}
                    onClick={() => setMenuOpen(false)}
                >
                    Inicio
                </Link>
                <Link
                    to="/proyectos"
                    className={isActive("/proyectos") ? "active-link" : ""}
                    onClick={() => setMenuOpen(false)}
                >
                    Proyectos
                </Link>
                <Link
                    to="/nosotros"
                    className={isActive("/nosotros") ? "active-link" : ""}
                    onClick={() => setMenuOpen(false)}
                >
                    Nosotros
                </Link>
                <button
                    className="link-button"
                    onClick={handleContactClick}
                >
                    Contacto
                </button>
            </nav>

            <div className={`main-menu-toggle ${menuOpen ? 'toggle-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    );
};

export default Navbar;



