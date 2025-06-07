import { useState } from "react";
import api from "../services/api";
import { Container, Form, Button, Card, Toast, ToastContainer } from "react-bootstrap";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/products", {
        name,
        category,
        price: Number(price),
        image,
      });

      setShowToast(true);
      setName("");
      setCategory("");
      setPrice("");
      setImage("");
    } catch (err) {
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center text-primary fw-bold">➕ Add New Product</h2>

      <Card className="p-4 shadow-sm border-0 rounded-4 bg-light">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              className="rounded-pill"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              className="rounded-pill"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="Pastries">Pastries</option>
              <option value="Cakes">Cakes</option>
              <option value="Breads">Breads</option>
              <option value="Cookies">Cookies</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              className="rounded-pill"
              placeholder="₪"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              className="rounded-pill"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="primary" className="rounded-pill fw-bold py-2">
              Add Product
            </Button>
          </div>
        </Form>
      </Card>

      {/* הודעת טוסט */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto text-white">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">🎉 Product added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default AddProduct;
