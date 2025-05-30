// components/Footer.tsx
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center small">
        © {new Date().getFullYear()} Cookie Monster Bakery. All rights reserved.
        <br />
        Developed with 💙 by Esther Kampner-
        Esther128979@gmail.com-
        0527128979
      </Container>
    </footer>
  );
};

export default Footer;
