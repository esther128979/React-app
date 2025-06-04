import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { useMemo } from "react";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
    }
  };

  // חישוב סכום כולל בעזרת useMemo - מחשב מחדש רק כשיש שינוי בעגלה
  const total = useMemo(() => {
    console.log("Calculating total price...");
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">🧺 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is currently empty 🍪</p>
      ) : (
        <>
          {/* סכום כולל בראש הדף */}
          <Card className="mb-4 shadow-sm border-success">
            <Card.Body className="text-center">
              <h4 className="text-success mb-1">Total to Pay:</h4>
              <h2 className="fw-bold text-success">₪{total}</h2>
              <p className="text-muted">You have {cart.length} items in your cart</p>
              <Button variant="outline-danger" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </Card.Body>
          </Card>

          {/* רשימת המוצרים */}
          <Row>
            {cart.map((item) => (
              <Col key={item.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
                <Card className="shadow-sm h-100 d-flex flex-column">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderBottom: "1px solid #eee",
                    }}
                  />
                  <Card.Body className="text-center d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text className="fw-bold">₪{item.price}</Card.Text>
                    </div>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleRemove(item.id)}
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
    </Container>
  );
};

export default Cart;
