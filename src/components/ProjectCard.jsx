import React from 'react';
import '../css/projectCard.css';

const ProjectCard = ({ image, title, description }) => {
    return (
        <div className="project-card">
            <img src={image} alt={title} className="project-image" />
            <div className="overlay">
                <div className="text-content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;

