import { useEffect, useState } from "react";
import api from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}
interface Review {
  productId: string;
  rating: number;
  userId: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.items);

  const fetchProducts = async () => {
    setLoading(true);

    const params: any = {
      _limit: 1000,
      _page: 1,
    };

    if (category) params.category = category;
    if (priceRange) {
      params.price_gte = priceRange[0];
      params.price_lte = priceRange[1];
    }

    try {
      const res = await api.get("/products", { params });
      let data: Product[] = res.data;

      if (search) {
        const searchLower = search.toLowerCase();
        data = data.filter((p) =>
          p.name.toLowerCase().includes(searchLower)
        );
      }

      setAllProducts(data);
      setProducts(data.slice(0, page * 20));
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, priceRange, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setPriceRange([0, 1000]);
    setPage(1);
  };

  const handleAddToCart = (product: Product) => {
    const exists = cart.find((p) => p.id === product.id);
    if (exists) return;

    dispatch(addToCart(product));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchReviews();
  }, []);

  const getAverageRating = (productId: string) => {
    const productReviews = reviews.filter((r) => r.productId === productId);
    if (productReviews.length === 0) return null;

    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">🍰 Explore Our Products</h2>

      <div className="text-center mb-4">
        <img
          src="https://images.unsplash.com/photo-1606046604972-77cc76aee944"
          alt="Delicious pastries"
          style={{
            width: "100%",
            height: "225px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>

      <Form className="mb-4">
        <Row className="g-3 align-items-center">
          <Col md={3}>
            <Form.Control
              placeholder="Search by name"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </Col>

          <Col md={3}>
            <Form.Select
              value={category}
              onChange={(e) => {
                setPage(1);
                setCategory(e.target.value);
              }}
            >
              <option value="">All Categories</option>
              <option value="Pastries">Pastries</option>
              <option value="Cakes">Cakes</option>
              <option value="Breads">Breads</option>
              <option value="Cookies">Cookies</option>
            </Form.Select>
          </Col>

          <Col md={4}>
            <label className="form-label">Price range:</label>
            <Slider
              range
              min={0}
              max={100}
              value={priceRange}
              onChange={(value) => {
                setPage(1);
                setPriceRange(value as [number, number]);
              }}
            />
            <div className="text-center mt-1">
              ₪{priceRange[0]} - ₪{priceRange[1]}
            </div>
          </Col>

          <Col md={2}>
            <Button variant="secondary" onClick={handleReset}>
              Reset Filters
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {products.map((p) => (
          <Col key={p.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
            <Card
              className="shadow-sm h-100"
              onClick={() => navigate(`/products/${p.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ height: "200px", overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={p.image}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title>{p.name}</Card.Title>
                <Card.Text className="mb-2 text-muted">{p.category}</Card.Text>
                <Card.Text className="fw-bold">₪{p.price}</Card.Text>

                <Card.Text className="text-warning">
                  {getAverageRating(p.id.toString())
                    ? `⭐ ${getAverageRating(p.id.toString())}/5`
                    : "No ratings yet"}
                </Card.Text>

                <Button
                  variant="success"
                  onClick={(e) => {
                    e.stopPropagation(); // מונע מעבר לדף פרטים
                    handleAddToCart(p);
                  }}
                  className="mt-auto"
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
          <p>Loading more...</p>
        </div>
      )}

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={5000}
        autohide
        bg="success"
        className="position-fixed bottom-0 end-0 m-4 text-white"
      >
        <Toast.Body>🎉 The product has been added to the cart</Toast.Body>
      </Toast>
    </Container>
  );
};

export default Products;
