import { useState, useEffect } from 'react';
import { Table, Badge, Alert } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';
import BASE_URL from '../../config';

const UserAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));

    const token = userData?.token;

    useEffect(() => {
        if (!token) return;

        const fetchMyAppointments = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/appointments/getAppointmentsByUser`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointments(res.data);
            } catch {
                message.error('Failed to fetch your appointments');
            }
        };

        void fetchMyAppointments();
    }, [token]);

    const getStatusVariant = (status) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'approved': return 'success';
            case 'cancelled': return 'danger';
            case 'completed': return 'info';
            default: return 'secondary';
        }
    };

    return (
        <div className="p-4 p-md-5">
            <h2 className="fw-bold mb-4 text-primary">My Patient History</h2>
            <p className="text-muted mb-4">You can track the status of your bookings and medical consultations here.</p>
            
            {appointments.length > 0 ? (
                <div className="table-responsive rounded-4 shadow-sm border overflow-hidden">
                    <Table hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="py-3 px-4">Doctor</th>
                                <th>Specialization</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(app => (
                                <tr key={app._id}>
                                    <td className="py-3 px-4 fw-bold">Dr. {app.doctorId?.name || 'N/A'}</td>
                                    <td><Badge bg="light" text="dark" className="border">{app.doctorId?.specialization}</Badge></td>
                                    <td>{app.date}</td>
                                    <td>
                                        <Badge bg={getStatusVariant(app.status)} className="px-3 py-2 rounded-pill">
                                            {app.status.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td>
                                        <small className="text-muted">{app.consultationNotes || 'No notes yet'}</small>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <Alert variant="light" className="text-center p-5 border-0 rounded-4 shadow-sm">
                    <div className="display-4 mb-3">📅</div>
                    <h4 className="fw-bold">No Appointments Yet</h4>
                    <p className="mb-0">Find a doctor and book your first consultation today!</p>
                </Alert>
            )}
        </div>
    );
};

export default UserAppointments;
