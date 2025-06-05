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
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { string } from "yup";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface Review {
  id: string;
  productId: string;
  rating: number;
  userId: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [userReview, setUserReview] = useState<Review | null>(null);

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

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

    const fetchUserReview = async () => {
      if (!currentUser || !id) return;
      try {
        const res = await api.get("/reviews", {
          params: {
            productId: id,
            userId: currentUser.id,
          },
        });

        if (res.data.length > 0) {
          setUserReview(res.data[0]);
          setRating(res.data[0].rating);
        }
      } catch (err) {
        console.error("Failed to fetch user review", err);
      }
    };

    fetchProduct();
    fetchUserReview();
  }, [id, currentUser]);

  const handleAddToCart = () => {
    if (!product) return;

    const exists = cart.find((p) => p.id === String(product.id));
    if (exists) {
      setToastMessage("🛒 This product is already in your cart!");
      setShowToast(true);
      return;
    }

    dispatch(addToCart({ ...product, id: String(product.id) }));
    setToastMessage("🎉 Product added to cart!");
    setShowToast(true);
  };

  const handleRatingClick = async (selectedRating: number) => {
    if (!currentUser || !id) return;

    try {
      if (userReview) {
        await api.put(`/reviews/${userReview.id}`, {
          ...userReview,
          rating: selectedRating,
        });
        setUserReview({ ...userReview, rating: selectedRating });
        setRating(selectedRating);
        setToastMessage("✅ Your rating has been updated!");
      } else {
        const res = await api.post("/reviews", {
          productId: id,
          userId: currentUser.id,
          rating: selectedRating,
        });
        setUserReview(res.data);
        setRating(selectedRating);
        setToastMessage("✅ Your rating has been added!");
      }
      setShowToast(true);
    } catch (err) {
      console.error("Failed to submit rating", err);
      setToastMessage("❌ Error saving your rating!");
      setShowToast(true);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading product details...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center my-5">
        <h4>Product not found</h4>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Toast message */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg="success"
          delay={5000}
          autohide
          style={{ fontSize: "1rem", minWidth: "220px" }}
        >
          <Toast.Body className="text-white fw-bold text-center">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* עיצוב מודרני ומעט גדול יותר */}
      <Card
        className="shadow-lg mx-auto p-4"
        style={{
          maxWidth: "850px",
          borderRadius: "15px",
          background: "#f9f9f9",
          border: "1px solid #ddd",
        }}
      >
        <Row className="g-4">
          <Col
            md={5}
            className="d-flex align-items-center justify-content-center"
          >
            <Card.Img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                maxHeight: "320px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Col>
          <Col md={7}>
            <Card.Body className="d-flex flex-column h-100">
              <Card.Title className="fw-bold fs-3 text-dark">
                {product.name}
              </Card.Title>
              <Card.Text className="text-secondary mb-2">
                Category: {product.category}
              </Card.Text>
              <Card.Text className="fw-bold fs-5 text-success">
                ₪{product.price}
              </Card.Text>

              <Button
                variant="warning"
                className="mt-2 mb-3 fw-bold"
                style={{
                  color: "#4e342e",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                }}
                onClick={handleAddToCart}
              >
                <i className="bi bi-cart-plus me-2"></i> Add to Cart
              </Button>

              {/* Rating */}
              <div className="mt-auto border-top pt-3">
                <h6 className="mb-1 text-dark">⭐ Rate this product</h6>
                <div>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <span
                      key={index}
                      onClick={() => handleRatingClick(index)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#ffc107")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          index <= rating ? "#ffc107" : "#e4e5e9")
                      }
                      style={{
                        cursor: "pointer",
                        fontSize: "1.7rem",
                        color: index <= rating ? "#ffc107" : "#e4e5e9",
                        transition: "color 0.2s",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProductDetails;
