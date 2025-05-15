import React, { useState } from "react";
import { Modal, Button, Card, Row, Col, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const CoverImageModal = ({ show, onClose, project, onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      Swal.fire("Error", "Debes seleccionar una nueva imagen para la portada.", "error");
      return;
    }

    setUploading(true);

    try {
      // Aquí haces el upload al backend
      // Suponiendo que tienes un endpoint para subir la imagen y actualizar la portada:
      const formData = new FormData();
      formData.append("coverImage", selectedFile);

      // Ejemplo de fetch POST al backend
      const res = await fetch(`/api/projects/${project._id}/cover-image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error al subir la imagen");
      }

      const updatedProject = await res.json();

      Swal.fire("Éxito", "Portada actualizada correctamente.", "success");
      setSelectedFile(null);
      onSave(updatedProject);
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar la portada.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Portada de {project?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          {project?.coverImage ? (
            <Col md={12} sm={12} xs={12} className="mb-3">
              <Card>
                <Card.Img variant="top" src={project?.coverImage?.url} />
              </Card>
            </Col>
          ) : (
            <p className="text-center">No hay imagen.</p>
          )}
        </Row>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Seleccionar nueva imagen de portada</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={uploading}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={uploading}>
          {uploading ? (
            <>
              <Spinner animation="border" size="sm" /> Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CoverImageModal;
