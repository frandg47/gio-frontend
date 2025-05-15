import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateProjectModal = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("Residencial");
  const [coverImage, setCoverImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !coverImage) {
      alert("El título y la imagen de portada son obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("details", details);
    formData.append("category", category);
    formData.append("coverImage", coverImage);

    gallery.forEach((file) => {
      formData.append("gallery", file);
    });

    onSave(formData);
  };

  const handleClose = () => {
    // limpiar formulario al cerrar
    setTitle("");
    setDescription("");
    setDetails("");
    setCategory("Residencial");
    setCoverImage(null);
    setGallery([]);
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Crear Proyecto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Detalles</Form.Label>
            <Form.Control
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Residencial">Residencial</option>
              <option value="Comercial">Comercial</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen de portada</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Galería de imágenes (opcional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setGallery(Array.from(e.target.files))}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="success">
              Crear
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProjectModal;
