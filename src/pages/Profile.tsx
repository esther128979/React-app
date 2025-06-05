import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Container, Card, Button } from "react-bootstrap";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  if (!user)
    return (
      <p
        className="text-center mt-4"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#5a3e2b",
          backgroundColor: "#f5e0c3",
          padding: "12px",
          borderRadius: "8px",
          fontFamily: "Cormorant Garamond, serif",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        Please log in to view your profile.
      </p>
    );

  return (
    <Container className="py-5">
      <h2
        className="text-center mb-4"
        style={{
          fontSize: "2.5rem",
          fontFamily: "Cormorant Garamond, serif",
          color: "#5a3e2b",
          textShadow: "0px 0px 8px #dab894",
        }}
      >
        🍮 My Elegant Profile
      </h2>

      <Card
        className="mx-auto shadow-lg"
        style={{
          maxWidth: "500px",
          backgroundColor: "#f5e0c3",
          color: "#5a3e2b",
          border: "3px solid #c2a080",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Card.Body>
          <h5 style={{ color: "#8b5a2b", fontWeight: "bold", fontSize: "18px" }}>Email:</h5>
          <p style={{ fontSize: "16px", fontFamily: "Cormorant Garamond, serif" }}>{user.email}</p>

          <h5 style={{ color: "#8b5a2b", fontWeight: "bold", fontSize: "18px" }}>Role:</h5>
          <p style={{ fontSize: "16px", fontFamily: "Cormorant Garamond, serif" }}>
            {user.isAdmin ? "👑 Admin" : "🍰 Regular User"}
          </p>

          {/* <div className="text-center">
            <Button
              variant="light"
              className="mt-3"
              style={{
                backgroundColor: "#c2a080",
                color: "#fff8e7",
                borderRadius: "8px",
                fontWeight: "bold",
                padding: "12px 20px",
                border: "none",
                fontSize: "18px",
                fontFamily: "Cormorant Garamond, serif",
                transition: "0.3s ease-in-out",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#a7835c")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#c2a080")
              }
            >
              ✏️ Edit Profile
            </Button>
          </div> */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;




// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../redux/store";
// import { removeFromCart, clearCart } from "../redux/cartSlice";


// const Cart = () => {
//   const cart = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();

//   const handleRemove = (id: number) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleClearCart = () => {
//     if (window.confirm("Are you sure you want to empty your cart?")) {
//       dispatch(clearCart());
//     }
//   };

//   const total = cart.reduce((sum, item) => sum + item.price, 0);

//   return (
//     <Container className="py-4">
//       <h2 className="mb-4 text-center"> Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-center"> The cart is empty</p>
//       ) : (
//         <>
//           <Row>
//             {cart.map((item) => (
//               <Col key={item.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
//                 <Card>
//                   <Card.Img variant="top" src={item.image} />
//                   <Card.Body>
//                     <Card.Title>{item.name}</Card.Title>
//                     <Card.Text>₪{item.price}</Card.Text>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleRemove(item.id)}
//                     >
//                      Remove from cart
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           <div className="mt-4 text-end">
//             <h5>סה"כ פריטים: {cart.length}</h5>
//             <h5>סה"כ לתשלום: ₪{total}</h5>
//             <Button variant="outline-danger" onClick={handleClearCart}>
//               נקה את הסל
//             </Button>
//           </div>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Cart;
