import { useState, useEffect } from 'react';
import { Table, Badge, Alert } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';
import BASE_URL from '../../config';

const AdminAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));

    const token = userData?.token;

    useEffect(() => {
        if (!token) return;

        const fetchAllAppointments = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/appointments/getAppointments`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointments(res.data);
            } catch {
                message.error('Failed to fetch appointments');
            }
        };

        void fetchAllAppointments();
    }, [token]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return <Badge bg="warning" text="dark">Pending</Badge>;
            case 'approved': return <Badge bg="success">Approved</Badge>;
            case 'cancelled': return <Badge bg="danger">Cancelled</Badge>;
            default: return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="p-4 p-md-5 bg-white">
            <h2 className="fw-bold mb-4 text-primary font-weight-bold">Master Appointment List</h2>
            <p className="text-muted mb-4">Administrative view of all patient bookings across the platform.</p>
            
            {appointments.length > 0 ? (
                <div className="table-responsive rounded-4 shadow-sm border overflow-hidden">
                    <Table hover className="mb-0 align-middle border-0">
                        <thead className="bg-primary text-white border-0">
                            <tr className="border-0">
                                <th className="py-3 px-4">Appointment ID</th>
                                <th>Patient Name</th>
                                <th>Doctor Name</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="border-0">
                            {appointments.map(app => (
                                <tr key={app._id} className="border-bottom border-light">
                                    <td className="py-3 px-4">
                                        <small className="text-muted fw-bold">#{app._id.slice(-6).toUpperCase()}</small>
                                    </td>
                                    <td>
                                        <div className="fw-bold">{app.userId?.name || 'Unknown User'}</div>
                                    </td>
                                    <td>
                                        <div className="text-primary fw-bold">Dr. {app.doctorId?.name || 'N/A'}</div>
                                    </td>
                                    <td>{app.date}</td>
                                    <td>{getStatusBadge(app.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <Alert variant="info" className="p-5 text-center bg-light border-0 rounded-4">
                    <div className="display-6 mb-3">📭</div>
                    <h4 className="fw-bold">No appointments found</h4>
                    <p className="mb-0">There are currently no bookings in the system.</p>
                </Alert>
            )}
        </div>
    );
};

export default AdminAppointment;
