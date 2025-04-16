import React, { useState } from 'react';
import "../css/navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="main-header">
            <a href="#" className="main-logo">
                <img src="/LOGO 2.png" alt="logo" width={100} height={50} />
            </a>

            <nav className={`main-navbar ${menuOpen ? 'menu-active' : ''}`}>
                <a href="/" onClick={() => setMenuOpen(false)}>Inicio</a>
                <a href="/proyectos" onClick={() => setMenuOpen(false)}>Proyectos</a>
                <a href="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>Contacto</a>
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


