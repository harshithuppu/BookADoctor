import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { DatePicker, TimePicker, message } from 'antd';
import axios from 'axios';
import BASE_URL from '../../config';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({ date: '', time: '' });
    const userData = JSON.parse(localStorage.getItem('userData'));

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
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleBook = async () => {
        if (!bookingDetails.date || !bookingDetails.time) {
            return message.warning('Please select date and time');
        }
        try {
            const res = await axios.post(`${BASE_URL}/api/appointments`, {
                doctorId: selectedDoctor._id,
                date: `${bookingDetails.date} ${bookingDetails.time}`
            }, {
                headers: { Authorization: `Bearer ${userData.token}` }
            });
            if (res.status === 201) {
                message.success('Appointment booked successfully!');
                handleClose();
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Booking failed');
        }
    };

    return (
        <div className="p-4 bg-white">
            <h2 className="fw-bold mb-4 text-primary">Find a Doctor</h2>
            <Row>
                {doctors.map(doctor => (
                    <Col key={doctor._id} md={6} lg={4} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden transition-all hover-shadow">
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="bg-light p-3 rounded-circle text-primary fw-bold" style={{ width: '50px', height: '50px', fontSize: '20px' }}>
                                        Dr
                                    </div>
                                    <div>
                                        <Card.Title className="mb-0 fw-bold">{doctor.name}</Card.Title>
                                        <Card.Text className="text-muted small mb-0">{doctor.specialization}</Card.Text>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="small mb-1 text-muted">Experience: <span className="text-dark fw-bold">{doctor.experience} Years</span></p>
                                    <p className="small mb-1 text-muted">Fees: <span className="text-dark fw-bold">${doctor.fees}</span></p>
                                    <p className="small mb-0 text-muted">Timings: <span className="text-dark fw-bold">{doctor.timings?.join(' - ') || 'N/A'}</span></p>
                                </div>
                                <Button variant="outline-primary" className="w-100 py-2 rounded-3 fw-bold" onClick={() => handleShow(doctor)}>
                                    Book Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Booking Modal */}
            <Modal show={show} onHide={handleClose} centered className="rounded-4">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">Book Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {selectedDoctor && (
                        <div className="mb-4 p-3 bg-light rounded-3">
                            <p className="mb-0 text-muted">Doctor: <span className="text-dark fw-bold">{selectedDoctor.name}</span></p>
                            <p className="mb-0 text-muted">Fee: <span className="text-dark fw-bold">${selectedDoctor.fees}</span></p>
                        </div>
                    )}
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold">Select Date</Form.Label>
                            <DatePicker 
                                className="w-100 py-2" 
                                disabledDate={(current) => {
                                    return current && current.valueOf() < Date.now() - 24*60*60*1000;
                                }}
                                onChange={(date, dateString) => setBookingDetails({...bookingDetails, date: dateString})} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted small fw-bold">Select Time</Form.Label>
                            <TimePicker 
                                className="w-100 py-2" 
                                format="HH:mm"
                                onChange={(time, timeString) => setBookingDetails({...bookingDetails, time: timeString})} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0">
                    <Button variant="light" onClick={handleClose} className="px-4 py-2">Cancel</Button>
                    <Button variant="primary" onClick={handleBook} className="px-4 py-2 fw-bold shadow-sm">Confirm Booking</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DoctorList;
