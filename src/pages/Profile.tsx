import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

interface User {
  id: number | string;
  email: string;
  isAdmin: boolean;
}

const Profile = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Container className="py-4">
      <h2>פרופיל משתמש</h2>
      <p><strong>אימייל:</strong> {user.email}</p>
      <p><strong>הרשאות:</strong> {user.isAdmin ? "מנהל" : "משתמש רגיל"}</p>
      <Button variant="danger" onClick={handleLogout}>התנתק</Button>
    </Container>
  );
};

export default Profile;
