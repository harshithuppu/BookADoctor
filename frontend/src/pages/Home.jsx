import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeroAnimation from '../components/HeroAnimation';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #D7CCC8', boxShadow: '0 2px 12px rgba(109,76,65,0.12)' }}>
                <Container>
                    <Navbar.Brand as={Link} to="/" style={{ color: '#6D4C41', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>BookADoctor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/" style={{ color: '#3E2723', fontWeight: 500 }}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/login" style={{ color: '#3E2723', fontWeight: 500 }}>Login</Nav.Link>
                            <Nav.Link as={Link} to="/register" style={{ color: '#3E2723', fontWeight: 500 }}>Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <header className="hero-section py-5" style={{ background: 'linear-gradient(135deg, #FDF9F7 0%, #EFEBE9 100%)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <HeroAnimation />
                        </Col>
                        <Col md={6}>
                            <h1 className="display-4 fw-bold mb-3" style={{ color: '#3E2723' }}>Your Health, Our Priority</h1>
                            <p className="lead mb-4" style={{ color: '#8D6E63' }}>Book appointments with top doctors in seconds. Seamless healthcare at your fingertips.</p>
                            <Button as={Link} to="/login" size="lg" style={{ backgroundColor: '#6D4C41', borderColor: '#6D4C41', color: '#fff', padding: '12px 32px', borderRadius: '12px', fontWeight: 600, boxShadow: '0 4px 14px rgba(109,76,65,0.3)', transition: 'all 0.3s ease' }}>Book your Doctor</Button>
                        </Col>
                    </Row>
                </Container>
            </header>

            <section className="about-us py-5" style={{ backgroundColor: '#FFFFFF' }}>
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

            <footer className="py-4 text-center" style={{ backgroundColor: '#EFEBE9', borderTop: '1px solid #D7CCC8' }}>
                <Container>
                    <p className="mb-0" style={{ color: '#8D6E63' }}>&copy; 2024 BookADoctor. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
};

export default Home;
