import React from 'react';
import '../css/hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>Soluciones efectivas para tu negocio</h1>
                <p>Explorá nuestros proyectos, servicios y contactanos para más información.</p>
                <Link to="/proyectos" className="btn-hero">Nuestros proyectos</Link>
            </div>
        </section>
    );
};

export default Hero;
