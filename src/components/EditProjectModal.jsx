import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { axiosInstance } from "../config/axiosInstance"; // Asegúrate de que esta ruta sea correcta

const EditProjectModal = ({ show, onClose, project, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    details: "",
    coverImage: null,
    gallery: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewCoverImage, setPreviewCoverImage] = useState(null);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        category: project.category || "",
        details: project.details || "",
        coverImage: null,
        gallery: [],
      });
      setPreviewCoverImage(project.image); // Mostrar imagen actual
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, coverImage: file }));
      setPreviewCoverImage(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    setFormData((prev) => ({ ...prev, gallery: Array.from(e.target.files) }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.category) {
      Swal.fire(
        "Campos incompletos",
        "Por favor completa todos los campos obligatorios",
        "warning"
      );
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("details", formData.details);

    if (formData.coverImage) {
      data.append("coverImage", formData.coverImage);
    }

    formData.gallery.forEach((file) => {
      data.append("gallery", file);
    });

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.put(
        `/editar/proyecto/${project._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      Swal.fire(
        "Actualizado",
        response.data.mensaje || "Proyecto actualizado",
        "success"
      );
      onSave(); // cerrar modal o refrescar lista
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.mensaje || "No se pudo actualizar el proyecto",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Proyecto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ingrese el título"
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Ingrese la descripción"
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="Residencial">Residencial</option>
              <option value="Comercial">Comercial</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formDetails">
            <Form.Label>Detalles</Form.Label>
            <Form.Control
              type="text"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              placeholder="Detalles adicionales (opcional)"
            />
          </Form.Group>

          <Form.Group controlId="formCoverImage">
            <Form.Label>Imagen de portada</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
            />
            {previewCoverImage && (
              <div className="mt-2">
                <img
                  src={previewCoverImage}
                  alt="Vista previa"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="formGallery">
            <Form.Label>Galería de imágenes</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleGalleryChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Guardar Cambios"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
