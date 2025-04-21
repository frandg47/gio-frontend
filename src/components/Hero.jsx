import React from 'react';
import '../css/hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <>
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Hacemos posible tu proyecto</h1>
                    <Link to="/proyectos" className="btn-hero">Nuestros proyectos</Link>
                </div>
            </section>
            <div className="hero-presentation">
                <h2>GIO</h2>
                <h5>Construcción & Diseño</h5>
                <p>somos un estudio joven que diseña con los pies en la tierra. Nos especializamos en crear proyectos funcionales, estéticos y, sobre todo, ajustados al bolsillo del cliente. Sabemos lo que cuesta construir, por eso cada diseño está pensado para ser posible, accesible y bien resuelto desde el primer boceto hasta el último detalle.</p>
            </div>
        </>
    );
};

export default Hero;
