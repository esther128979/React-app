import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../services/api";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface EditProductModalProps {
  show: boolean;
  handleClose: () => void;
  product: Product | null;
  onSave: () => void;
}

const EditProductModal = ({ show, handleClose, product, onSave }: EditProductModalProps) => {
  const [formData, setFormData] = useState<Product | null>(null);

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData || !product) return;

    // שולחים את כל המידע – אם שדה ריק, לוקחים מהמקור
    const fullData = {
      id:  String(product.id),
      name: formData.name.trim() !== "" ? formData.name : product.name,
      category: formData.category.trim() !== "" ? formData.category : product.category,
      price: String(formData.price )|| product.price,
      image: formData.image.trim() !== "" ? formData.image : product.image,
    };

    try {
      await api.put(`/products/${product.id}`, fullData);
      alert("Product updated successfully!");
      onSave();
      handleClose();
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Error updating product. Please try again.");
    }
  };

  if (!formData) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
