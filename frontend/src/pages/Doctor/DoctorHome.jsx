import { useState, useEffect } from 'react';
import { Badge, Table, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
    CalendarOutlined, 
    LogoutOutlined, 
} from '@ant-design/icons';
import axios from 'axios';
import { message } from 'antd';
import BASE_URL from '../../config';

const DoctorHome = () => {
    const [appointments, setAppointments] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [activeTab, setActiveTab] = useState('appointments');
    const [showConsultantModal, setShowConsultantModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [consultationNotes, setConsultationNotes] = useState('');
    const [prescription, setPrescription] = useState('');
    const navigate = useNavigate();

    const token = userData?.token;

    useEffect(() => {
        if (!token) return;

        const loadAppointments = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/appointments/getMyAppointmentsByDoctor`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointments(res.data);
            } catch {
                message.error('Failed to load appointments');
            }
        };

        void loadAppointments();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        message.success('Logged out successfully');
        navigate('/');
    };

    const handleAddConsultation = async (values) => {
        try {
            const res = await axios.put(`${BASE_URL}/api/appointments/addConsultation/${selectedAppointment._id}`, values, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                message.success('Consultation completed successfully');
                setShowConsultantModal(false);
                setAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment._id === res.data.appointment._id
                            ? res.data.appointment
                            : appointment
                    )
                );
            }
        } catch {
            message.error('Failed to add consultation');
        }
    };

    return (
        <div className="doctor-dashboard d-flex min-vh-100 bg-light">
            {/* Sidebar */}
            <div className="sidebar bg-success text-white p-4" style={{ width: '280px' }}>
                <h2 className="fw-bold mb-5 fs-4">MediCare / DR</h2>
                <nav className="d-flex flex-column gap-3">
                    <div 
                        className={`p-3 rounded-3 cursor-pointer d-flex align-items-center gap-3 transition-all ${activeTab === 'appointments' ? 'bg-white text-success fw-bold' : 'text-white-50'}`}
                        onClick={() => setActiveTab('appointments')}
                        style={{ cursor: 'pointer' }}
                    >
                        <CalendarOutlined /> Appointments
                    </div>
                    <div 
                        className="p-3 rounded-3 cursor-pointer d-flex align-items-center gap-3 text-white-50 mt-auto"
                        onClick={handleLogout}
                        style={{ cursor: 'pointer' }}
                    >
                        <LogoutOutlined /> Logout
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1">
                <header className="bg-white p-3 shadow-sm d-flex justify-content-between align-items-center px-5">
                    <h3 className="h5 mb-0 text-muted">Doctor Panel / {activeTab.toUpperCase()}</h3>
                    <div className="d-flex align-items-center gap-2">
                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                            {userData?.name?.charAt(0) || 'D'}
                        </div>
                        <span className="fw-bold text-dark">Dr. {userData?.name}</span>
                    </div>
                </header>

                <main className="p-4 p-md-5">
                    <div className="bg-white rounded-4 shadow-sm p-4 min-vh-75">
                        <h2 className="fw-bold mb-4 text-success">Upcoming Consultations</h2>
                        
                        <Table hover className="align-middle">
                            <thead className="bg-light">
                                <tr>
                                    <th className="py-3 px-4">Patient Name</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                    <th className="text-end px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(app => (
                                    <tr key={app._id}>
                                        <td className="py-3 px-4 fw-bold">{app.userId?.name}</td>
                                        <td>{app.date}</td>
                                        <td>
                                            <Badge bg={app.status === 'completed' ? 'info' : 'warning'} className="px-3 py-2 rounded-pill">
                                                {app.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="text-end px-4">
                                            {app.status === 'pending' && (
                                                <Button 
                                                    variant="success" 
                                                    size="sm" 
                                                    className="rounded-3 px-3 fw-bold"
                                                    onClick={() => {
                                                        setSelectedAppointment(app);
                                                        setConsultationNotes('');
                                                        setPrescription('');
                                                        setShowConsultantModal(true);
                                                    }}
                                                >
                                                    Start Consultation
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {appointments.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5 text-muted">No appointments found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </main>
            </div>

            {/* Consultation Modal */}
            <Modal show={showConsultantModal} onHide={() => setShowConsultantModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Medical Consultation</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        if(!consultationNotes || !prescription) return message.warning('Please fill all fields');
                        handleAddConsultation({ consultationNotes, prescription });
                    }}>
                        <div className="mb-4">
                            <h6>Patient: <strong>{selectedAppointment?.userId?.name}</strong></h6>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Clinical Notes</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Describe patient symptoms and diagnosis..."
                                value={consultationNotes}
                                onChange={(e) => setConsultationNotes(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Prescription</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={2} 
                                placeholder="Medicines, dosage, and next steps..."
                                value={prescription}
                                onChange={(e) => setPrescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button variant="light" onClick={() => setShowConsultantModal(false)}>Cancel</Button>
                            <Button variant="success" type="submit" className="px-4 fw-bold">Complete & Save</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DoctorHome;
