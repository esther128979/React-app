import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";

const Header = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  // התאמת ה-padding-top של הדף כדי שהתוכן לא יכסה את ה-Header
  useEffect(() => {
    document.body.style.paddingTop = "100px"; // עדכון ל-100px לגובה גבוה יותר
  }, []);

  return (
    <Navbar
      style={{
        backgroundColor: "#4e342e",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        height: "100px", // גובה מוגדל
        display: "flex",
        alignItems: "center"
      }}
      variant="dark"
      expand="lg"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-warning" style={{ fontSize: "1.8rem" }}>
          🍪 Cookie Monster
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse>
          <Nav className="ms-auto d-flex align-items-center gap-4">
            <Nav.Link as={Link} to="/" className="text-white fs-5">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="text-white fs-5">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="position-relative text-white">
              <i className="bi bi-cart3" style={{ fontSize: "1.8rem" }}></i>
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.8rem" }}
                >
                  {cartCount}
                </span>
              )}
            </Nav.Link>

            {currentUser && (
              <Nav.Link as={Link} to="/profile" className="d-flex align-items-center text-white">
                <i className="bi bi-person-circle me-2" style={{ fontSize: "1.8rem" }}></i>
                <span className="fs-6">{currentUser.email}</span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
