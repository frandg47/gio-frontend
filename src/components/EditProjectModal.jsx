import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { axiosInstance } from "../config/axiosInstance";

const EditProjectModal = ({ show, onClose, project, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        category: project.category || "",
        details: project.details || "",
      });
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.put(
        `/editar/proyecto/${project._id}`,
        formData
      );

      Swal.fire(
        "Actualizado",
        response.data.mensaje || "Proyecto actualizado",
        "success"
      );
      onSave({ ...project, ...formData });
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.mensaje || "No se pudo actualizar",
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

          <Form.Group controlId="formDescription" className="mt-2">
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

          <Form.Group controlId="formCategory" className="mt-2">
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

          <Form.Group controlId="formDetails" className="mt-2">
            <Form.Label>Detalles</Form.Label>
            <Form.Control
              type="text"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              placeholder="Detalles adicionales (opcional)"
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
