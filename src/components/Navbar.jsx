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


    const handleSectionClick = (sectionId) => {
        setMenuOpen(false);

        if (location.pathname === "/") {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate("/", { state: { scrollTo: sectionId } });
        }
    };

    const handleLogoClick = () => {
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <header className="main-header">
            <span className="main-logo" onClick={handleLogoClick}>
                <img src="/LOGO 2.png" alt="logo" width={100} height={50} />
            </span>

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
                {/* <Link
                    to="/nosotros"
                    className={isActive("/nosotros") ? "active-link" : ""}
                    onClick={() => setMenuOpen(false)}
                >
                    Nosotros
                </Link> */}
                <button className="link-button" onClick={() => handleSectionClick("about")}>
                    Nosotros
                </button>
                <button className="link-button" onClick={() => handleSectionClick("contact")}>
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



