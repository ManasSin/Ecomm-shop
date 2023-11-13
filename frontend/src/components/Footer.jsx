import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const cuurentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Proshop &copy; {cuurentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
