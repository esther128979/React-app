import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../redux/cartSlice";



const Cart = () => {

 
  const cart = useSelector((state: RootState) => state.cart.items);
  console.log("📦 תוכן הסל ב־Redux:", cart);

  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
    console.log("🎯 סל מה-redux:", cart);

  return (
    <Container className="py-4">
      <h2 className="mb-4">עגלת הקניות</h2>

      {cart.length === 0 ? (
        <p>העגלה ריקה</p>
      ) : (
        <>
          <Row>
            {cart.map((item) => (
              <Col key={item.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.price} ₪</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      הסר
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="mt-4 text-end">
            <h5>סה"כ פריטים: {cart.length}</h5>
            <h5>סה"כ לתשלום: ₪{total}</h5>
            <Button variant="outline-danger" onClick={handleClearCart}>
              נקה את הסל
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
