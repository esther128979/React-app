import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <Navbar style={{ backgroundColor: "#4e342e" }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-warning">
          🍪 Cookie Monster
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse>
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link as={Link} to="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="text-white">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="position-relative text-white">
              <i className="bi bi-cart3" style={{ fontSize: "1.5rem" }}></i>
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {cartCount}
                </span>
              )}
            </Nav.Link>

            {currentUser && (
              <Nav.Link as={Link} to="/profile" className="d-flex align-items-center text-white">
                <i className="bi bi-person-circle me-1" style={{ fontSize: "1.5rem" }}></i>
                <span>{currentUser.email}</span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
