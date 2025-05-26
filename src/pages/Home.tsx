import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const fetchProducts = async (reset = false) => {
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

    const res = await api.get("/products", { params });

    let data: Product[] = res.data;

    // סינון לפי שם (בעברית) בצד לקוח
    if (search) {
      const searchLower = search.toLowerCase();
      data = data.filter((p) =>
        p.name.toLowerCase().includes(searchLower)
      );
    }

    // שמירה לטובת אינסוף גלילה
    if (reset || page === 1) {
      setAllProducts(data);
      setProducts(data.slice(0, 20));
      setPage(1);
    } else {
      const next = data.slice(0, (page + 1) * 20);
      setProducts(next);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (page === 1) {
      fetchProducts(true);
    } else {
      const next = allProducts.slice(0, page * 20);
      setProducts(next);
    }
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchProducts(true);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setPriceRange([0, 1000]);
    setPage(1);
    setTimeout(() => fetchProducts(true), 0);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">המוצרים שלנו</h2>

      <Form className="mb-4">
        <Row className="g-3 align-items-center">
          <Col md={3}>
            <Form.Control
              placeholder="חיפוש לפי שם"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">כל הקטגוריות</option>
              <option value="משרד">משרד</option>
              <option value="ספרים">ספרים</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <label className="form-label">טווח מחיר:</label>
            <Slider
              range
              min={0}
              max={1000}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
            />
            <div className="text-center mt-1">
              ₪{priceRange[0]} - ₪{priceRange[1]}
            </div>
          </Col>
          <Col md={1}>
            <Button variant="primary" onClick={handleSearch}>
              חפש
            </Button>
          </Col>
          <Col md={1}>
            <Button variant="secondary" onClick={handleReset}>
              איפוס
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {products.map((p) => (
          <Col key={p.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={p.image} />
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>{p.category}</Card.Text>
                <Card.Text>{p.price} ₪</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
          <p>טוען עוד...</p>
        </div>
      )}
    </Container>
  );
};

export default Home;
