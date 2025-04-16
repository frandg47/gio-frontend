import React from 'react';
import '../css/hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>Soluciones efectivas para tu negocio</h1>
                <p>Explorá nuestros proyectos, servicios y contactanos para más información.</p>
                <a href="#contacto" className="btn-hero">Contactar</a>
            </div>
        </section>
    );
};

export default Hero;
