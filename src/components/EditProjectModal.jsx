import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const EditProjectModal = ({ show, onClose, project, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        image: project.image,
      });
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);

    const formDataImage = new FormData();
    formDataImage.append("file", file);
    formDataImage.append("upload_preset", "images_preset");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dlsvrk8lw/image/upload", {
        method: "POST",
        body: formDataImage,
      });

      if (!res.ok) throw new Error("Error uploading image");

      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      Swal.fire("Error", "No se pudo subir la imagen", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.category) {
      Swal.fire("Campos incompletos", "Por favor completa todos los campos", "warning");
      return;
    }

    onSave(project._id, formData);
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
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Ingrese la categoría"
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Imagen principal</Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
            {isUploading && <Spinner animation="border" size="sm" className="ms-2" />}
            {formData.image && (
              <div className="mt-2">
                <img src={formData.image} alt="Vista previa" style={{ width: "100%" }} />
              </div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
