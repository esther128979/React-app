import { Container, Row, Col, Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { useState, useMemo } from "react";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
    }
  };

  const handleFinishOrder = () => {
    dispatch(clearCart());
    setShowToast(true);
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center fw-bold">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-muted fs-5">Your cart is currently empty 🍪</p>
      ) : (
        <>
          <Card className="mb-4 shadow border-0 rounded-4 bg-light text-center">
            <Card.Body>
              <h4 className="mb-1 text-primary">Total to Pay:</h4>
              <h2 className="fw-bold text-success">₪{total}</h2>
              <p className="text-muted mb-3">You have {cart.length} items in your cart</p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="outline-danger" onClick={handleClearCart} className="rounded-pill px-4">
                  🗑️ Clear
                </Button>
                <Button variant="success" onClick={handleFinishOrder} className="rounded-pill px-4">
                  ✅ Checkout
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Row className="g-4">
            {cart.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden d-flex flex-column">
                  <div
                    style={{
                      height: "200px",
                      background: `url(${item.image}) center/cover no-repeat`,
                    }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between p-3">
                    <div>
                      <Card.Title className="fs-6 fw-bold text-truncate">{item.name}</Card.Title>
                      <Card.Text className="fw-bold text-success">₪{item.price}</Card.Text>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                      className="rounded-pill mt-2"
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Toast הודעה */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto text-white">Order Status</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            🎉 Your order has been successfully placed!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Cart;
