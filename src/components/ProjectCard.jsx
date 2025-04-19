import React from 'react';
import { Link } from 'react-router-dom';
import '../css/projectCard.css';

const ProjectCard = ({ _id, coverImage, title, description }) => {
    return (
        <Link to={`/proyectos/${_id}`} className="project-card">
            <img src={coverImage} alt={title} className="project-image" />
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


