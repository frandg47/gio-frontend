import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../css/heroProjects.css';

const HeroProjects = () => {
    return (
        <section className="hero-projects-section">
            <div className="hero-overlay">
                <h1 className="hero-title">PROYECTOS</h1>
            </div>

            <Carousel fade interval={3000} controls indicators>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/casa1.jpg"
                        alt="Proyecto 1"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/proyecto4.png"
                        alt="Proyecto 2"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/proyecto1.jpg"
                        alt="Proyecto 3"
                    />
                </Carousel.Item>
            </Carousel>
        </section>
    );
};

export default HeroProjects;

