import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Card,
  Row,
  Col,
  Form,
  Spinner,
  CloseButton,
} from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const GalleryModal = ({ show, onClose, project, onGalleryUpdated }) => {
  const [uploading, setUploading] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (project?.gallery) {
      setExistingImages(project.gallery);
    }
  }, [project]);

  const handleDeleteImage = (imageToDelete) => {
    Swal.fire({
      title: "¿Eliminar imagen?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setExistingImages((prev) =>
          prev.filter((img) => img.url !== imageToDelete.url)
        );
      }
    });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();

    Array.from(selectedFiles).forEach((file) =>
      formData.append("gallery", file)
    );

    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      setUploading(true);

      const { data } = await axios.put(
        `http://localhost:8080/editar/proyecto/${project._id}/actualizar-galeria`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire("Éxito", "Galería actualizada correctamente", "success");

      if (onGalleryUpdated) {
        onGalleryUpdated(data); // asumimos que `data` contiene el proyecto actualizado
      }

      onClose();
    } catch (error) {
      console.error("Error al actualizar galería:", error);
      Swal.fire("Error", "No se pudo actualizar la galería", "error");
    } finally {
      setUploading(false);
      setSelectedFiles([]);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Galería de {project?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {existingImages.length > 0 ? (
            existingImages.map((img, index) => (
              <Col md={4} sm={6} xs={12} key={index} className="mb-3">
                <Card className="position-relative">
                  <CloseButton
                    onClick={() => handleDeleteImage(img)}
                    className="position-absolute top-0 end-0 m-1 bg-white rounded-circle"
                    style={{ zIndex: 10 }}
                  />
                  <Card.Img variant="top" src={img.url} />
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No hay imágenes en la galería.</p>
          )}
        </Row>

        <hr />
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Agregar nuevas imágenes</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={uploading}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveChanges}
          disabled={uploading}
        >
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

export default GalleryModal;
