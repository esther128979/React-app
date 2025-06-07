import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Header from "./Components/Header";
import ProtectedRoute from "./Components/ProtectedRoute";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header קבוע למעלה */}
      <Header />

      {/* תוכן הדף יתפוס את כל הגובה האפשרי כדי לדחוף את ה-Footer למטה */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer דבוק למטה */}
      <Footer />
      <ToastContainer />
    </div>
    
  );
}

export default App;
