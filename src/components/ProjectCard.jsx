import React from 'react';
import { Link } from 'react-router-dom';
import '../css/projectCard.css';

const ProjectCard = ({ id, image, title, description }) => {
    return (
        <Link to={`/proyectos/${id}`} className="project-card">
            <img src={image} alt={title} className="project-image" />
            <div className="overlay">
                <div className="text-content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;


