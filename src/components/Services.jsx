import React from 'react';
import '../css/services.css';  

const Services = () => {
    return (
        <section className="services-section">
            <h2 className="section-title">Servicios</h2>
            <div className="services-container">
                <div className="service-card">
                    <img 
                        src="../../public/diseño-arquitectonico.jpg" 
                        alt="Diseño arquitectónico" 
                        className="service-img" 
                    />
                    <h3>Diseño Arquitectónico</h3>
                    <p>Creación de planos y diseños innovadores que se ajustan a las necesidades y estética de cada cliente.</p>
                </div>
                <div className="service-card">
                    <img 
                        src="../../public/asesoria-tecnica.jpg" 
                        alt="Asesoría técnica" 
                        className="service-img" 
                    />
                    <h3>Asesoría Técnica</h3>
                    <p>Asesoramiento experto para proyectos de construcción y remodelación, con un enfoque en la sostenibilidad y funcionalidad.</p>
                </div>
                <div className="service-card">
                    <img 
                        src="../../public/gestion-proyectos.jpg" 
                        alt="Gestión de Proyectos" 
                        className="service-img" 
                    />
                    <h3>Gestión de Proyectos</h3>
                    <p>Planificación, coordinación y supervisión de la ejecución de proyectos arquitectónicos de principio a fin.</p>
                </div>
                <div className="service-card">
                    <img 
                        src="../../public/restauracion.jpg" 
                        alt="Restauración y Conservación" 
                        className="service-img" 
                    />
                    <h3>Restauración y Conservación</h3>
                    <p>Servicios especializados en la restauración de edificios históricos, preservando su patrimonio y valores arquitectónicos.</p>
                </div>
            </div>
        </section>
    );
}

export default Services;
