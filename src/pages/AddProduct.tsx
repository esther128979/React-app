import { useState } from "react";
import api from "../services/api";
import { Container, Form, Button, Alert } from "react-bootstrap";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/products", {
        name,
        category,
        price: Number(price),
        image,
      });

      setSuccess(true);
      setName("");
      setCategory("");
      setPrice("");
      setImage("");
    } catch (err) {
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Add New Product</h2>

      {success && <Alert variant="success">Product added successfully!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
