import React, { useState } from 'react';
import "../css/navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <a href="/" className="logo">
                <img src="/LOGO 2.png" alt="logo" width={100} height={50} />
            </a>

            <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
                <a href="/" onClick={() => setMenuOpen(false)}>Inicio</a>
                <a href="/proyectos" onClick={() => setMenuOpen(false)}>Proyectos</a>
                <a href="/nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>Contacto</a>
            </nav>

            <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    );
};

export default Navbar;
