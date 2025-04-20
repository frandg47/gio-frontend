import React from 'react';
import '../css/services.css';  

const Services = () => {
    return (
        <section className="services-section">
            {/* <h2 className="section-title">Servicios</h2> */}
            <div className="services-container">
                <div className="service-card">
                    <img 
                        src="/diseño-arquitectonico.jpg" 
                        alt="Diseño arquitectónico" 
                        className="service-img" 
                    />
                    <h3>Diseño Arquitectónico</h3>
                    <p>Creación de planos y diseños innovadores que se ajustan a las necesidades y estética de cada cliente.</p>
                </div>
                <div className="service-card">
                    <img 
                        src="/asesoria-tecnica.jpg" 
                        alt="Asesoría técnica" 
                        className="service-img" 
                    />
                    <h3>Asesoría Técnica</h3>
                    <p>Asesoramiento experto para proyectos de construcción y remodelación, con un enfoque en la sostenibilidad y funcionalidad.</p>
                </div>
                <div className="service-card">
                    <img 
                        src="/gestion-proyectos.jpg" 
                        alt="Gestión de Proyectos" 
                        className="service-img" 
                    />
                    <h3>Gestión de Proyectos</h3>
                    <p>Planificación, coordinación y supervisión de la ejecución de proyectos arquitectónicos de principio a fin.</p>
                </div>
            </div>
        </section>
    );
}

export default Services;
