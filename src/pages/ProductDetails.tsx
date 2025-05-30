import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  Card,
  Spinner,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { RootState } from "../redux/store";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Product not found", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const exists = cart.find((p) => p.id === Number(product.id));
    if (exists) {
      alert("המוצר כבר נמצא בסל!");
      return;
    }

    dispatch(addToCart({ ...product, id: Number(product.id) }));
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 5000); // 5 שניות
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>טוען פרטי מוצר...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center my-5">
        <h4>המוצר לא נמצא</h4>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg="success"
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto"> Cart </strong>
          </Toast.Header>
          <Toast.Body className="text-white">🎉The product has been added to Cart</Toast.Body>
        </Toast>
      </ToastContainer>

      <Card>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>קטגוריה: {product.category}</Card.Text>
          <Card.Text>מחיר: ₪{product.price}</Card.Text>
          <Button variant="success" onClick={handleAddToCart}>
            הוסף לסל
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
