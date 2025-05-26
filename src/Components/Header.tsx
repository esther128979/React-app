import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">החנות שלי</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/">בית</Nav.Link>
            <Nav.Link as={Link} to="/products">מוצרים</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="position-relative">
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
            <Nav.Link as={Link} to="/profile">פרופיל</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
