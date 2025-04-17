import { useParams } from 'react-router-dom';
import projects from '../helpers/projects.js';
import '../css/projectdetail.css';  

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === parseInt(id));  // Convertir el id a un número

    if (!project) {
        return <p>Proyecto no encontrado</p>;
    }
    console.log(project)
    return (
        <>
            {/* Hero Section con la imagen de portada */}
            <section 
                className="hero-section" 
                style={{ backgroundImage: `url(${project.image})` }}  // Solo aplicamos el fondo aquí
            >
                <div className="hero-content">
                    <h3>{project.title.toUpperCase()}</h3>
                </div>
            </section>

            {/* Detalles del Proyecto */}
            <div className="project-details">
                <h2>{project.title}</h2>
                <p>{project.description}</p>

                {/* Galería de imágenes */}
                <div className="image-gallery">
                    {project.images.map((image, index) => (
                        <div key={index} className="gallery-item">
                            <img src={image} alt={`Gallery image ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProjectDetails;



