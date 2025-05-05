import React from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const GalleryModal = ({ show, onClose, project, onDeleteImage }) => {
  const handleDeleteImage = (imageUrl) => {
    Swal.fire({
      title: "¿Eliminar imagen?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteImage(project._id, imageUrl);
      }
    });
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Galería de {project?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {project?.gallery?.length > 0 ? (
            project.gallery.map((img, index) => (
              <Col md={4} sm={6} xs={12} key={index} className="mb-3">
                <Card>
                  <Card.Img variant="top" src={img} />
                  <Card.Body className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteImage(img)}
                    >
                      Eliminar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No hay imágenes en la galería.</p>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GalleryModal;
