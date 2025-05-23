// import { useParams } from 'react-router-dom';
import '../css/projectdetail.css';

import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { axiosInstance } from '../config/axiosInstance';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams, useNavigate } from 'react-router-dom';


const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const getProject = async () => {
        try {
            const res = await axiosInstance.get(`/proyectos/${id}`);
            setProject(res.data.project);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar el proyecto',
                text: error.response?.data?.mensaje || 'Error desconocido'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProject();
    }, [id]);

    const slides = project?.gallery?.map(img => ({ src: img.url })) || [];

    return (
        <>
            <section
                className="hero-section-detail"
                style={{
                    backgroundImage: loading
                        ? 'none'
                        : `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${project.coverImage.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '80vh'
                }}
            >
                <div className={`hero-content-detail ${!loading ? 'loaded' : ''}`}>
                    {loading ? <Skeleton height={40} width="60%" /> : <h3>{project.title.toUpperCase()}</h3>}
                    <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
                </div>
            </section>

            <div className="project-details">
                {loading ? (
                    <>
                        <Skeleton count={3} />
                        <div className="image-gallery">
                            {[1, 2, 3, 4].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    height={200}
                                    width={'100%'}
                                    style={{ borderRadius: '10px', marginBottom: '1rem' }}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <p>{project.description}</p>
                        <p>{project.details}</p>

                        <div className="image-gallery">
                            {project.gallery.map((image, idx) => (
                                <div key={idx} className="gallery-item">
                                    <div className="image-wrapper">
                                        <img
                                            src={image.url}
                                            alt={`Imagen ${idx + 1}`}
                                            onClick={() => {
                                                setIndex(idx);
                                                setOpen(true);
                                            }}
                                            className="gallery-img"
                                        />
                                        {/* <div className="hover-overlay">
                                            <span>Ver</span>
                                        </div> */}
                                    </div>
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
                    </>
                )}
            </div>
        </>
    );
};

export default ProjectDetails;






