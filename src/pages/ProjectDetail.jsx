import { useParams } from 'react-router-dom';
import projects from '../helpers/projects.js';
import '../css/projectdetail.css';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import Zoom from 'yet-another-react-lightbox/plugins/zoom';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === parseInt(id));
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    if (!project) return <p>Proyecto no encontrado</p>;

    const slides = project.images.map(img => ({ src: img }));

    return (
        <>
            <section
                className="hero-section-detail"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="hero-content-detail">
                    <h3>{project.title.toUpperCase()}</h3>
                </div>
            </section>

            <div className="project-details">
                <p>{project.description}</p>

                <div className="image-gallery">
                    {project.images.map((image, idx) => (
                        <div key={idx} className="gallery-item">
                            <img
                                src={image}
                                alt={`Imagen ${idx + 1}`}
                                onClick={() => {
                                    setIndex(idx);
                                    setOpen(true);
                                }}
                                className="gallery-img"
                            />
                        </div>
                    ))}
                </div>

                {open && (
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={slides}
                        index={index}
                        plugins={[Zoom]}
                        zoom={{ maxZoomPixelRatio: 2, doubleTapDelay: 300 }}
                    />
                )}
            </div>
        </>
    );
};

export default ProjectDetails;





