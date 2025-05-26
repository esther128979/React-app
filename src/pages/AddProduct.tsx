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
      alert("שגיאה בהוספת מוצר");
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">הוספת מוצר חדש</h2>

      {success && <Alert variant="success">המוצר נוסף בהצלחה!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>שם המוצר</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>קטגוריה</Form.Label>
          <Form.Control value={category} onChange={(e) => setCategory(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>מחיר</Form.Label>
          <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>כתובת תמונה</Form.Label>
          <Form.Control value={image} onChange={(e) => setImage(e.target.value)} required />
        </Form.Group>

        <Button type="submit" variant="primary">הוסף מוצר</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
