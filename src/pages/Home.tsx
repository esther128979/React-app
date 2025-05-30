
// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/cartSlice";
// import { RootState } from "../redux/store";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Spinner,
//   Toast,
// } from "react-bootstrap";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
// }

// const Home = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [showToast, setShowToast] = useState(false);




//   const dispatch = useDispatch();
//   const cart = useSelector((state: RootState) => state.cart.items);

//   const fetchProducts = async () => {
//     setLoading(true);
//     const params: any = {
//       _limit: 1000,
//       _page: 1,
//     };

//     if (category) params.category = category;
//     if (priceRange) {
//       params.price_gte = priceRange[0];
//       params.price_lte = priceRange[1];
//     }

//     const res = await api.get("/products", { params });
//     let data: Product[] = res.data;

//     if (search) {
//       const searchLower = search.toLowerCase();
//       data = data.filter((p) => p.name.toLowerCase().includes(searchLower));
//     }

//     setAllProducts(data);
//     setProducts(data.slice(0, page * 20));
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [search, category, priceRange, page]);

//   const handleReset = () => {
//     setSearch("");
//     setCategory("");
//     setPriceRange([0, 1000]);
//     setPage(1);
//   };

//   const handleScroll = () => {
//     if (
//       window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
//       !loading
//     ) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleAddToCart = (product: Product) => {
//     const exists = cart.find((p) => p.id === product.id);
//     if (exists) return;
//     dispatch(addToCart(product));
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 5000);
//   };

//   return (
//     <Container className="py-4">
//       <div
//         style={{
//           backgroundImage: `url('https://images.unsplash.com/photo-1606046604972-77cc76aee944')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "200px",
//           borderRadius: "10px",
//           marginBottom: "30px",
//         }}
//       />

//       <h2 className="text-center mb-4">Our Bakery Products</h2>

      

//       <Form className="mb-4">
//         <Row className="g-3 align-items-center">
//           <Col md={3}>
//             <Form.Control
//               placeholder="Search by name"
//               value={search}
//               onChange={(e) => {
//                 setPage(1);
//                 setSearch(e.target.value);
//               }}
//             />
//           </Col>
//           <Col md={2}>
//             <Form.Select
//               value={category}
//               onChange={(e) => {
//                 setPage(1);
//                 setCategory(e.target.value);
//               }}
//             >
//               <option value="">All Categories</option>
//               <option value="מאפים">Pastries</option>
//               <option value="עוגות">Cakes</option>
//               <option value="לחמים">Breads</option>
//               <option value="עוגיות">Cookies</option>
//             </Form.Select>
//           </Col>
//           <Col md={4}>
//             <label className="form-label">Price range:</label>
//             <Slider
//               range
//               min={0}
//               max={1000}
//               value={priceRange}
//               onChange={(value) => {
//                 setPage(1);
//                 setPriceRange(value as [number, number]);
//               }}
//             />
//             <div className="text-center mt-1">
//               ₪{priceRange[0]} - ₪{priceRange[1]}
//             </div>
//           </Col>
//           <Col md={2}>
//             <Button variant="secondary" onClick={handleReset}>
//               Reset Filters
//             </Button>
//           </Col>
//         </Row>
//       </Form>

//       <Row>
//         {products.map((p) => (
//           <Col key={p.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
//             <Card style={{ height: "400px", display: "flex", flexDirection: "column" }}>
//               <Card.Img
//                 variant="top"
//                 src={p.image}
//                 style={{
//                   height: "250px",
//                   objectFit: "cover",
//                   width: "100%",
//                 }}
//               />
//               <Card.Body style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                 <div>
//                   <Card.Title>{p.name}</Card.Title>
//                   <Card.Text>{p.category}</Card.Text>
//                   <Card.Text>₪{p.price}</Card.Text>
//                 </div>
//                 <Button
//                   variant="success"
//                   onClick={() => handleAddToCart(p)}
//                   style={{ alignSelf: "flex-start" }}
//                 >
//                   Add To Cart
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {loading && (
//         <div className="text-center mt-3">
//           <Spinner animation="border" />
//           <p>Loading more...</p>
//         </div>
//       )}

//       <Toast
//         show={showToast}
//         onClose={() => setShowToast(false)}
//         delay={5000}
//         autohide
//         bg="success"
//         className="position-fixed bottom-0 end-0 m-4 text-white"
//       >
//         <Toast.Body>Product added to cart 🎉</Toast.Body>
//       </Toast>
//     </Container>
//   );
// };

// export default Home;
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center mb-4">
        <Col lg={10}>
          <h1 className="fw-bold mb-3">Welcome to Cookie Monster Bakery 🍪</h1>
          <p className="lead">
            Discover the magic of fresh, handmade baked goods! <br />
            From crispy cookies to rich chocolate cakes, everything is made with premium ingredients,
            a lot of love and… just the right amount of butter 🧈
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={12}>
          <img
            src="https://images.unsplash.com/photo-1606046604972-77cc76aee944"
            alt="Bakery Showcase"
            className="img-fluid rounded shadow mb-5"
            style={{
              width: "100%",
              maxHeight: "430px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Link to="/products" className="btn btn-success btn-lg w-100">
            🛒 Browse Our Products
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
