import { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState([]);

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/proyectos");
      setProjects(response.data.projects);
      console.log("response", response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el proyecto de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/proyectos/${id}`);
        await getProjects(); // Recargar lista
        Swal.fire("¡Eliminado!", "El proyecto ha sido eliminado.", "success");
      } catch (err) {
        console.error("Error al eliminar", err);
        Swal.fire("Error", "No se pudo eliminar el proyecto.", "error");
      }
    }
  };

  const handleViewGallery = (gallery) => {
    setSelectedGallery(gallery);
    setShowGalleryModal(true);
  };

  const handleCloseGalleryModal = () => {
    setShowGalleryModal(false);
    setSelectedGallery([]);
  };

  return (
    <div className="container mt-5">
      <Table striped bordered hover responsive className="table-projects mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Detalles</th>
            <th>Categoria</th>
            <th>Imagen Portada</th>
            <th>Imagenes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton width={120} />
                  </td>
                  <td>
                    <Skeleton count={2} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={120} height={80} />
                  </td>
                </tr>
              ))
            : projects.map((project) => (
                <tr key={project._id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.details}</td>
                  <td>{project.category}</td>
                  <td>
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="img-thumbnail"
                      style={{ maxWidth: "120px", height: "auto" }}
                    />
                  </td>
                  <td>
                    <div
                      style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
                    >
                      {project.gallery.slice(0, 3).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Galería ${index}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                        />
                      ))}
                      {project.gallery.length > 3 && (
                        <span style={{ fontSize: "0.8rem" }}>
                          +{project.gallery.length - 3} más
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={() => handleEdit(project)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger me-1"
                      onClick={() => handleDelete(project._id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleViewGallery(project.gallery)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      {showGalleryModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Galería de Imágenes</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseGalleryModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {selectedGallery.map((img, idx) => (
                    <div key={idx} className="col-md-4 mb-3">
                      <img
                        src={img}
                        alt={`Imagen ${idx}`}
                        className="img-fluid rounded"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseGalleryModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTable;
