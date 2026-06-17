import { useState, useEffect } from 'react';
import { Table, Badge, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';
import BASE_URL from '../../config';

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));

    const token = userData?.token;

    useEffect(() => {
        if (!token) return;

        const loadDoctors = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/doctors/all-doctors`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDoctors(res.data);
            } catch {
                message.error('Failed to fetch doctors list');
            }
        };

        void loadDoctors();
    }, [token]);

    const handleApprove = async (id) => {
        try {
            const res = await axios.put(`${BASE_URL}/api/doctors/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                message.success('Doctor approved successfully');
                setDoctors(prevDoctors =>
                    prevDoctors.map(doctor =>
                        doctor._id === id
                            ? { ...doctor, status: 'approved' }
                            : doctor
                    )
                );
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Approval failed');
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'approved': return 'success';
            case 'rejected': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <div className="p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-primary mb-1">Manage Applications</h2>
                    <p className="text-muted mb-0">Review and approve medical professional registrations.</p>
                </div>
            </div>
            
            {doctors.length > 0 ? (
                <div className="table-responsive rounded-4 shadow-sm border overflow-hidden">
                    <Table hover className="mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="py-3 px-4">Doctor Name</th>
                                <th>Specialization</th>
                                <th>Experience</th>
                                <th>Fees</th>
                                <th>Status</th>
                                <th className="text-end px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map(doctor => (
                                <tr key={doctor._id}>
                                    <td className="py-3 px-4">
                                        <div className="fw-bold">{doctor.name}</div>
                                        <small className="text-muted">ID: {doctor._id.substring(0, 8)}...</small>
                                    </td>
                                    <td><Badge bg="light" text="dark" className="border">{doctor.specialization}</Badge></td>
                                    <td>{doctor.experience} Years</td>
                                    <td>${doctor.fees}</td>
                                    <td>
                                        <Badge bg={getStatusVariant(doctor.status)} className="px-3 py-2 rounded-pill">
                                            {doctor.status.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td className="text-end px-4">
                                        {doctor.status === 'pending' && (
                                            <Button 
                                                variant="success" 
                                                size="sm" 
                                                className="rounded-3 px-3 fw-bold shadow-sm"
                                                onClick={() => handleApprove(doctor._id)}
                                            >
                                                Approve
                                            </Button>
                                        )}
                                        {doctor.status === 'approved' && (
                                            <span className="text-success small fw-bold">Active Professional</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <Alert variant="light" className="text-center p-5 border-0 rounded-4 shadow-sm">
                    <div className="display-4 mb-3">👨‍⚕️</div>
                    <h4 className="fw-bold">No Applications Yet</h4>
                    <p className="mb-0">All pending registrations will appear here for your review.</p>
                </Alert>
            )}
        </div>
    );
};

export default ManageDoctors;
