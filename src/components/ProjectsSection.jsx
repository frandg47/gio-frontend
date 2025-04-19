import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import '../css/projectsSection.css';
import allProjects from '../helpers/projects';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import { axiosInstance } from '../config/axiosInstance.js'




const ProjectSection = () => {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('todos');
    const [loading, setLoading] = useState(true);

    const getProjects = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/proyectos");
            setProjects(response.data.projects);
            console.log("response", response.data.projects);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Ocurrió un problema! Error ${error.response?.data?.status || ''}`,
                text: `${error.response?.data?.mensaje || 'Error desconocido'}`
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    const filteredProjects =
        activeFilter === 'todos'
            ? projects
            : projects.filter(p => p.category.toLowerCase() === activeFilter);

    return (
        <section className="project-section">
            <div className="filter-buttons">
                {['todos', 'Residencial', 'Comercial'].map(category => (
                    <button
                        key={category}
                        className={`filter-btn ${activeFilter.toLowerCase() === category.toLowerCase() ? 'active' : ''}`}
                        onClick={() => setActiveFilter(category.toLowerCase())}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            <div className="project-grid">
                {loading ? (
                    [...Array(6)].map((_, i) => <Skeleton key={i} height={250} />)
                ) : (
                    filteredProjects.map(project => (
                        <ProjectCard key={project._id} {...project} />
                    ))
                )}
            </div>
        </section>
    );
};

export default ProjectSection;


