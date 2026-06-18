import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { message } from 'antd';
import axios from 'axios';
import BASE_URL from '../../config';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [loading, setLoading] = useState(false);

    const userData = JSON.parse(localStorage.getItem('userData'));

    // Today's date in YYYY-MM-DD for min attribute
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/doctors`);
                setDoctors(res.data);
            } catch {
                message.error('Failed to load doctors');
            }
        };
        fetchDoctors();
    }, []);

    const handleShow = (doctor) => {
        setSelectedDoctor(doctor);
        setBookingDate('');
        setBookingTime('');
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedDoctor(null);
        setBookingDate('');
        setBookingTime('');
    };

    const handleBook = async () => {
        if (!bookingDate || !bookingTime) {
            return message.warning('Please select both date and time');
        }
        if (!userData?.token) {
            return message.error('You are not logged in. Please login again.');
        }
        setLoading(true);
        try {
            const res = await axios.post(
                `${BASE_URL}/api/appointments`,
                {
                    doctorId: selectedDoctor._id,
                    date: `${bookingDate} ${bookingTime}`
                },
                {
                    headers: { Authorization: `Bearer ${userData.token}` }
                }
            );
            if (res.status === 201) {
                message.success('Appointment booked successfully!');
                handleClose();
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Booking failed. Please try again.';
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4" style={{ backgroundColor: '#FFFFFF' }}>
            <h2 className="fw-bold mb-1" style={{ color: '#6D4C41' }}>Find a Doctor</h2>
            <p className="mb-4" style={{ color: '#8D6E63' }}>Book an appointment with our approved specialists</p>

            {doctors.length === 0 && (
                <div className="text-center py-5">
                    <div style={{ fontSize: '3rem' }}>🏥</div>
                    <p style={{ color: '#8D6E63' }}>No approved doctors available right now.</p>
                </div>
            )}

            <Row>
                {doctors.map(doctor => (
                    <Col key={doctor._id} md={6} lg={4} className="mb-4">
                        <Card
                            className="h-100 border-0 rounded-4 overflow-hidden"
                            style={{
                                boxShadow: '0 4px 20px rgba(109,76,65,0.1)',
                                border: '1px solid #EFEBE9',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                        style={{ width: '52px', height: '52px', fontSize: '15px', backgroundColor: '#6D4C41', flexShrink: 0 }}
                                    >
                                        Dr
                                    </div>
                                    <div>
                                        <Card.Title className="mb-0 fw-bold" style={{ color: '#3E2723', fontSize: '1rem' }}>{doctor.name}</Card.Title>
                                        <small style={{ color: '#A1887F' }}>{doctor.specialization}</small>
                                    </div>
                                </div>

                                <div className="mb-4" style={{ borderTop: '1px solid #EFEBE9', paddingTop: '12px' }}>
                                    <div className="d-flex justify-content-between mb-1">
                                        <small style={{ color: '#8D6E63' }}>Experience</small>
                                        <small className="fw-bold" style={{ color: '#3E2723' }}>{doctor.experience} yrs</small>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <small style={{ color: '#8D6E63' }}>Consultation Fee</small>
                                        <small className="fw-bold" style={{ color: '#6D4C41' }}>₹{doctor.fees}</small>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <small style={{ color: '#8D6E63' }}>Timings</small>
                                        <small className="fw-bold" style={{ color: '#3E2723' }}>{doctor.timings?.join(' – ') || 'N/A'}</small>
                                    </div>
                                </div>

                                <button
                                    className="w-100 py-2 rounded-3 fw-bold"
                                    onClick={() => handleShow(doctor)}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: '2px solid #6D4C41',
                                        color: '#6D4C41',
                                        cursor: 'pointer',
                                        transition: 'all 0.25s ease',
                                        borderRadius: '10px'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#6D4C41'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6D4C41'; }}
                                >
                                    Book Appointment
                                </button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* ── Booking Modal ──────────────────────────────── */}
            <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#EFEBE9', borderBottom: '1px solid #D7CCC8' }}>
                    <Modal.Title className="fw-bold" style={{ color: '#3E2723' }}>📅 Book Appointment</Modal.Title>
                </Modal.Header>

                <Modal.Body className="p-4" style={{ backgroundColor: '#FFFFFF' }}>
                    {selectedDoctor && (
                        <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: '#FDF9F7', border: '1px solid #EFEBE9' }}>
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                    style={{ width: '44px', height: '44px', backgroundColor: '#6D4C41', flexShrink: 0 }}
                                >
                                    Dr
                                </div>
                                <div>
                                    <div className="fw-bold" style={{ color: '#3E2723' }}>{selectedDoctor.name}</div>
                                    <small style={{ color: '#8D6E63' }}>{selectedDoctor.specialization}</small>
                                </div>
                                <div className="ms-auto text-end">
                                    <div className="fw-bold" style={{ color: '#6D4C41' }}>₹{selectedDoctor.fees}</div>
                                    <small style={{ color: '#8D6E63' }}>Consultation</small>
                                </div>
                            </div>
                        </div>
                    )}

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold" style={{ color: '#4E342E' }}>
                                📆 Appointment Date
                            </Form.Label>
                            <Form.Control
                                type="date"
                                value={bookingDate}
                                min={today}
                                onChange={e => setBookingDate(e.target.value)}
                                style={{
                                    borderColor: bookingDate ? '#6D4C41' : '#D7CCC8',
                                    borderRadius: '10px',
                                    padding: '10px 14px',
                                    outline: 'none',
                                    boxShadow: bookingDate ? '0 0 0 3px rgba(109,76,65,0.15)' : 'none'
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label className="fw-semibold" style={{ color: '#4E342E' }}>
                                🕐 Appointment Time
                            </Form.Label>
                            <Form.Control
                                type="time"
                                value={bookingTime}
                                onChange={e => setBookingTime(e.target.value)}
                                style={{
                                    borderColor: bookingTime ? '#6D4C41' : '#D7CCC8',
                                    borderRadius: '10px',
                                    padding: '10px 14px',
                                    outline: 'none',
                                    boxShadow: bookingTime ? '0 0 0 3px rgba(109,76,65,0.15)' : 'none'
                                }}
                            />
                        </Form.Group>
                    </Form>

                    {bookingDate && bookingTime && (
                        <div className="mt-3 p-2 rounded-3 text-center" style={{ backgroundColor: '#EFEBE9' }}>
                            <small style={{ color: '#6D4C41' }}>
                                ✅ Appointment on <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong>
                            </small>
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer style={{ backgroundColor: '#FDF9F7', borderTop: '1px solid #EFEBE9' }}>
                    <Button
                        variant="light"
                        onClick={handleClose}
                        disabled={loading}
                        className="px-4 py-2"
                        style={{ borderColor: '#D7CCC8', color: '#6D4C41' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleBook}
                        disabled={loading || !bookingDate || !bookingTime}
                        className="px-4 py-2 fw-bold"
                        style={{
                            backgroundColor: loading || !bookingDate || !bookingTime ? '#A1887F' : '#6D4C41',
                            borderColor: '#6D4C41',
                            color: '#fff',
                            borderRadius: '10px',
                            cursor: loading || !bookingDate || !bookingTime ? 'not-allowed' : 'pointer',
                            transition: 'all 0.25s ease'
                        }}
                    >
                        {loading ? '⏳ Booking...' : '✅ Confirm Booking'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DoctorList;
