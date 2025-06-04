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

    const exists = cart.find((p) => p.id === Number(product.id));
    if (exists) {
      setToastMessage("🛒 This product is already in your cart!");
      setShowToast(true);
      return;
    }

    dispatch(addToCart({ ...product, id: Number(product.id) }));
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

      <Card className="shadow p-3">
        <Card.Img
          variant="top"
          src={product.image}
          style={{ maxHeight: "400px", objectFit: "cover", borderRadius: "5px" }}
        />
        <Card.Body>
          <Card.Title className="fw-bold fs-4">{product.name}</Card.Title>
          <Card.Text className="text-muted">{product.category}</Card.Text>
          <Card.Text className="fw-bold fs-5 text-success">
            ₪{product.price}
          </Card.Text>

          <Button
            variant="success"
            className="w-100 my-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          {/* Rating */}
          <div className="mt-4 border-top pt-3">
            <h5 className="mb-2">⭐ Rate this product</h5>
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
                    fontSize: "1.8rem",
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
      </Card>
    </Container>
  );
};

export default ProductDetails;
