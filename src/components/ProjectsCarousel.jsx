import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '../css/carousel.css';

const ProjectsCarousel = () => {


    const projects = [
        { image: '/proyecto1.jpg', title: 'POLO TECNOLOGICO' },
        { image: '/proyecto2.png', title: 'DUPLEX' },
        { image: '/proyecto3.png', title: 'SEDRINK' },
        { image: '/proyecto4.png', title: 'CASA LZ' }
    ];

    return (
        <section className="projects-carousel-section">
            <h2 className="carousel-title">Nuestros Proyectos</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
            >
                {projects.map((project, index) => (
                    <SwiperSlide key={index}>
                        <div className="carousel-slide">
                            <img src={project.image} alt={project.title} className="carousel-img" />
                            <div className="carousel-overlay">
                                <h3>{project.title}</h3>
                                <Link to="/proyectos">
                                    <button>Ver más</button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ProjectsCarousel;
