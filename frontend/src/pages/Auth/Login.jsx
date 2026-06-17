import { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import BASE_URL from '../../config';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/user/login`, credentials);
            if (res.status === 200) {
                const userData = {
                    token: res.data.token,
                    _id: res.data.userId,
                    name: res.data.name,
                    role: res.data.role,
                    isdoctor: res.data.isdoctor,
                    notifications: [
                        { message: "Welcome to BookADoctor! Search for doctors and book your first appointment." },
                        { message: "Tip: Complete your profile details to help doctors understand your history." },
                        { message: "Reminder: Check the 'My Patient History' tab for status of your bookings." }
                    ],
                    seennotifications: []
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                message.success('Login Successful');
                
                if (userData.role === 'admin') {
                    navigate('/adminhome');
                } else if (userData.role === 'doctor') {
                    navigate('/doctorhome');
                } else {
                    navigate('/userhome');
                }
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Login Failed');
        }
    };

    return (
        <div className="login-page bg-light min-vh-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="shadow-lg border-0 rounded-4">
                            <Card.Body className="p-5">
                                <h2 className="text-center fw-bold mb-4 text-primary">Login</h2>
                                <Form onSubmit={handleSubmit}>
                                    <MDBInput 
                                        wrapperClass='mb-4' 
                                        label='Email address' 
                                        type='email' 
                                        name='email'
                                        value={credentials.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <MDBInput 
                                        wrapperClass='mb-4' 
                                        label='Password' 
                                        type='password' 
                                        name='password'
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button variant="primary" type="submit" className="w-100 py-2 fw-bold mb-3 shadow-sm">
                                        Sign In
                                    </Button>
                                    <p className="text-center mb-0">
                                        Don't have an account? <Link to="/register" className="text-primary text-decoration-none fw-bold">Register</Link>
                                    </p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
