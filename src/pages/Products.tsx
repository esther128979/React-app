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
import EditProductModal from "../Components/EditProductModal";

interface Product {
  id: string;
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const fetchProducts = async () => {
    if (!hasMore) return;

    setLoading(true);
    const params: any = {
      _limit: 20,
      _page: page,
    };

    if (search) params.q = search;
    if (category) params.category = category;
    if (priceRange) {
      params.price_gte = priceRange[0];
      params.price_lte = priceRange[1];
    }

    try {
      const res = await api.get("/products", { params });
      const data: Product[] = res.data;

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => (page === 1 ? data : [...prev, ...data]));
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get("/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // קריאה מחודשת כשמשנים פילטרים – איפוס מוצרים והעמוד
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [search, category, priceRange]);

  // קריאת מוצרים בכל שינוי עמוד
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, category, priceRange]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loading) return;

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setPriceRange([0, 100]);
  };

  const handleAddToCart = (product: Product) => {
    if (cart.find((p) => p.id === product.id)) return;
    dispatch(addToCart(product));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleEditProduct = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const handleDeleteProduct = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${productId}`);
      setPage(1); // איפוס עמודים
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const getAverageRating = (productId: string) => {
    const productReviews = reviews.filter((r) => r.productId === productId);
    if (productReviews.length === 0) return null;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4"> Explore Our Products 🍰</h2>

      {user?.isAdmin && (
        <div className="text-center mb-4">
          <Button variant="primary" onClick={() => navigate("/add-product")}>
            Add New Product
          </Button>
        </div>
      )}

      <Form className="mb-4">
        <Row className="g-3 align-items-center">
          <Col md={3}>
            <Form.Control
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Pastries">Pastries</option>
              <option value="Cakes">Cakes</option>
              <option value="Breads">Breads</option>
              <option value="Cookies">Cookies</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <label className="form-label">Price range</label>
            <Slider
              range
              min={0}
              max={100}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
            />
            <div className="text-center mt-1">₪{priceRange[0]} - ₪{priceRange[1]}</div>
          </Col>
          <Col md={2}>
            <Button variant="secondary" onClick={handleReset}>Reset Filters</Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {products.map((p, index) => (
          <Col key={`${p.id}-${index}`} xs={12} md={6} lg={4} xl={3} className="mb-4">
            <Card className="shadow-sm h-100" onClick={() => navigate(`/products/${p.id}`)} style={{ cursor: "pointer" }}>
              <div style={{ height: "200px", overflow: "hidden" }}>
                <Card.Img variant="top" src={p.image} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
              </div>
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title>{p.name}</Card.Title>
                <Card.Text className="mb-2 text-muted">{p.category}</Card.Text>
                <Card.Text className="fw-bold">₪{p.price}</Card.Text>
                <Card.Text className="text-warning">
                  {getAverageRating(p.id) ? `⭐ ${getAverageRating(p.id)}/5` : "No ratings yet"}
                </Card.Text>
                <Button variant="success" onClick={(e) => { e.stopPropagation(); handleAddToCart(p); }} className="mt-auto">Add to Cart</Button>

                {user?.isAdmin && (
                  <div className="mt-2">
                    <Button variant="warning" size="sm" className="me-2" onClick={(e) => handleEditProduct(e, p)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={(e) => handleDeleteProduct(e, p.id)}>Delete</Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
          <p>Loading more products...</p>
        </div>
      )}

      <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide bg="success" className="position-fixed bottom-0 end-0 m-4 text-white">
        <Toast.Body>🎉 The product has been added to the cart</Toast.Body>
      </Toast>

      <EditProductModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        product={productToEdit}
        onSave={() => setPage(1)}
      />
    </Container>
  );
};

export default Products;
