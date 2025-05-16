import { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";
import EditProjectModal from "./EditProjectModal";
import GalleryModal from "./GalleryModal";
import CreateProjectModal from "./CreateProjectModal";
import CoverImageModal from "./CoverImageModal";

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectToViewGallery, setProjectToViewGallery] = useState(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showCoverImage, setShowCoverImage] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectToCoverImage, setProjectToCoverImage] = useState(null);

  const handleOpenCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleSaveCreate = async (formData) => {
    try {
      await axiosInstance.post("/crear/proyecto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await getProjects();
      Swal.fire("Creado", "El proyecto fue creado con éxito.", "success");
      handleCloseCreateModal();
    } catch (err) {
      console.error("Error al crear proyecto:", err);
      Swal.fire("Error", "No se pudo crear el proyecto.", "error");
    }
  };

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/proyectos");
      setProjects(response.data.projects);
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
        await axiosInstance.delete(`eliminar/proyecto/${id}`);
        await getProjects();
        Swal.fire("¡Eliminado!", "El proyecto ha sido eliminado.", "success");
      } catch (err) {
        console.error("Error al eliminar", err);
        Swal.fire("Error", "No se pudo eliminar el proyecto.", "error");
      }
    }
  };

const handleSaveEdit = async (updatedProject) => {
  
  setProjects((prev) =>
    prev.map((p) => (p._id === updatedProject._id ? updatedProject : p))
  );
  handleCloseEditModal();
};



  const handleGalleryUpdated = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj._id === updatedProject._id ? updatedProject : proj
      )
    );

    setProjectToViewGallery(updatedProject);
    getProjects();
  };

  const handleCoverImageSaved = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updatedProject._id ? updatedProject : p))
    );
    getProjects();
  };

  const handleViewGallery = (project) => {
    setProjectToViewGallery(project);
    setShowGalleryModal(true);
  };

  const handleViewCoverImage = (project) => {
    setProjectToCoverImage(project);
    setShowCoverImage(true);
  };

  const handleCloseGalleryModal = () => {
    setShowGalleryModal(false);
    setProjectToViewGallery(null);
  };

  const handleCloseCoverImage = () => {
    setShowCoverImage(false);
    setProjectToCoverImage(null);
  };

  const handleEdit = (project) => {
    setProjectToEdit({ ...project });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setProjectToEdit(null);
  };

  const handleDeleteImage = async (projectId, imageUrl) => {
    try {
      await axiosInstance.put(`/proyectos/${projectId}/remove-image`, {
        imageUrl,
      });

      // Actualizar solo la galería del proyecto actual en el modal
      setProjectToViewGallery((prev) =>
        prev && prev._id === projectId
          ? {
              ...prev,
              gallery: prev.gallery.filter((img) => img !== imageUrl),
            }
          : prev
      );

      // También actualizar el estado general de proyectos
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj._id === projectId
            ? {
                ...proj,
                gallery: proj.gallery.filter((img) => img !== imageUrl),
              }
            : proj
        )
      );
    } catch (error) {
      console.error("Error al eliminar imagen de la galería:", error);
      Swal.fire("Error", "No se pudo eliminar la imagen.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Lista de Proyectos</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={handleOpenCreateModal}>
          Crear proyecto
        </button>
      </div>
      <Table striped bordered hover responsive className="table-projects mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Detalles</th>
            <th>Categoria</th>
            <th>Imagen Portada</th>
            <th>Imágenes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
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
                  <td>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <Skeleton width={50} height={50} count={3} />
                    </div>
                  </td>
                  <td>
                    <Skeleton
                      width={60}
                      height={30}
                      style={{ marginRight: "5px" }}
                    />
                    <Skeleton
                      width={60}
                      height={30}
                      style={{ marginRight: "5px" }}
                    />
                    <Skeleton width={60} height={30} />
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
                    {project.coverImage ? (
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleViewCoverImage(project)}
                      >
                        Ver Portada
                      </button>
                    ) : (
                      <span>Sin imagen</span>
                    )}
                  </td>
                  <td>
                    <div
                      style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
                    >
                      {
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleViewGallery(project)}
                        >
                          Ver +{project.gallery.length}
                        </button>
                      }
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
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>

      <EditProjectModal
        show={showEditModal}
        onClose={handleCloseEditModal}
        project={projectToEdit}
        onSave={handleSaveEdit}
      />

      <GalleryModal
        show={showGalleryModal}
        onClose={handleCloseGalleryModal}
        project={projectToViewGallery}
        onDeleteImage={handleDeleteImage}
        onGalleryUpdated={handleGalleryUpdated}
      />

      <CoverImageModal
        show={showCoverImage}
        onClose={handleCloseCoverImage}
        project={projectToCoverImage}
        onSave={handleCoverImageSaved}
      />

      <CreateProjectModal
        show={showCreateModal}
        onClose={handleCloseCreateModal}
        onSave={handleSaveCreate}
      />
    </div>
  );
};

export default ProjectsTable;
