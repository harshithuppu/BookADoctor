import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import p3 from '../assets/p3.jpg';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar bg="light" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">BookADoctor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <header className="hero-section py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <img src={p3} alt="Hero" className="img-fluid rounded shadow" />
                        </Col>
                        <Col md={6}>
                            <h1 className="display-4 fw-bold mb-3">Your Health, Our Priority</h1>
                            <p className="lead mb-4">Book appointments with top doctors in seconds. Seamless healthcare at your fingertips.</p>
                            <Button as={Link} to="/login" variant="primary" size="lg">Book your Doctor</Button>
                        </Col>
                    </Row>
                </Container>
            </header>

            <section className="about-us py-5 bg-white">
                <Container>
                    <h2 className="text-center mb-5 fw-bold">About Us</h2>
                    <Row>
                        <Col md={4} className="text-center mb-4">
                            <div className="p-4 border rounded shadow-sm">
                                <h3 className="h5 fw-bold">Expert Doctors</h3>
                                <p className="text-muted">Access a network of highly qualified and experienced healthcare professionals.</p>
                            </div>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <div className="p-4 border rounded shadow-sm">
                                <h3 className="h5 fw-bold">Easy Booking</h3>
                                <p className="text-muted">Skip the queues and book your appointments online anytime, anywhere.</p>
                            </div>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <div className="p-4 border rounded shadow-sm">
                                <h3 className="h5 fw-bold">24/7 Support</h3>
                                <p className="text-muted">Our dedicated support team is always here to assist you with your needs.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <footer className="py-4 bg-light text-center">
                <Container>
                    <p className="mb-0 text-muted">&copy; 2024 BookADoctor. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
};

export default Home;
