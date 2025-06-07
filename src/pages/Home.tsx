import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css"; // אם יש CSS נוסף

const Home = () => {
  return (
    <Container
      className="py-5 text-center"
      style={{
        background: "#fff8f1",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <h1 className="display-4 fw-bold" style={{ color: "#8B5E3C" }}>
            🍪 Welcome to Cookie Monster Bakery
          </h1>
          <p className="lead" style={{ color: "#6d4c41", fontSize: "1.15rem" }}>
            Discover the magic of freshly baked goods. Handcrafted with premium ingredients and a
            sprinkle of love, our bakery brings you the comforting taste of home.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVPBMre7xJd7N4gdEegChN78G21B9rqAbcpQ&s"
            alt="Bakery Showcase"
            className="img-fluid rounded-4 shadow home-image"
            style={{
              border: "5px solid #f1e4d3",
              maxHeight: "450px",
              objectFit: "cover",
            }}
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={10} md={6} lg={4}>
          <Link to="/products" className="text-decoration-none d-grid">
            <Button
              variant="light"
              className="browse-button"
              style={{
                fontWeight: "500",
                borderRadius: "30px",
                border: "2px solid #8B5E3C",
                color: "#8B5E3C",
                background: "transparent",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#8B5E3C";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#8B5E3C";
              }}
            >
              🛒 Browse Our Products
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
