import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import '../css/projectsSection.css';
import allProjects from '../helpers/projects';



const ProjectSection = () => {
    const [activeFilter, setActiveFilter] = useState('todos');

    const filteredProjects =
        activeFilter === 'todos'
            ? allProjects
            : allProjects.filter(p => p.category === activeFilter);

    return (
        <section className="project-section">
            <div className="filter-buttons">
                {['todos', 'casas', 'comercial'].map(category => (
                    <button
                        key={category}
                        className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                        onClick={() => setActiveFilter(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            <div className="project-grid">
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </section>
    );
};

export default ProjectSection;

