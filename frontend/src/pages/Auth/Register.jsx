import { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import BASE_URL from '../../config';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/user/register`, user);
            if (res.status === 201) {
                message.success('Registration Successful! Please login.');
                navigate('/login');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Registration Failed');
        }
    };

    return (
        <div className="register-page min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #EFEBE9 0%, #FDF9F7 100%)' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="border-0 rounded-4" style={{ boxShadow: '0 16px 50px rgba(109,76,65,0.18)', border: '1px solid #D7CCC8' }}>
                            <Card.Body className="p-5">
                                <h2 className="text-center fw-bold mb-4" style={{ color: '#6D4C41' }}>Register</h2>
                                <Form onSubmit={handleSubmit}>
                                    <MDBInput 
                                        wrapperClass='mb-4' 
                                        label='Full Name' 
                                        type='text' 
                                        name='name'
                                        value={user.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <MDBInput 
                                        wrapperClass='mb-4' 
                                        label='Email address' 
                                        type='email' 
                                        name='email'
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <MDBInput 
                                        wrapperClass='mb-4' 
                                        label='Password' 
                                        type='password' 
                                        name='password'
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Group className="mb-4">
                                        <Form.Label className="text-muted">Register as:</Form.Label>
                                        <Form.Select name="role" value={user.role} onChange={handleChange} className="py-2">
                                            <option value="patient">Patient</option>
                                            <option value="doctor">Doctor</option>
                                            <option value="admin">Administrator</option>
                                        </Form.Select>
                                    </Form.Group>
                                    
                                    <Button type="submit" className="w-100 py-2 fw-bold mb-3" style={{ backgroundColor: '#6D4C41', borderColor: '#6D4C41', color: '#fff', borderRadius: '10px', boxShadow: '0 4px 14px rgba(109,76,65,0.25)' }}>
                                        Create Account
                                    </Button>
                                    <p className="text-center mb-0">
                                        Already have an account? <Link to="/login" style={{ color: '#6D4C41' }} className="text-decoration-none fw-bold">Login</Link>
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

export default Register;
