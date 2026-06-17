import { useState, useEffect } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    DashboardOutlined, 
    TeamOutlined, 
    CalendarOutlined, 
    LogoutOutlined,
} from '@ant-design/icons';
import AdminAppointment from './AdminAppointment';
import ManageDoctors from './ManageDoctors';
import { message } from 'antd';
import BASE_URL from '../../config';

// Mock views for Admin Dashboard
const AdminStats = ({ stats }) => (
    <div className="p-4 p-md-5">
        <h2 className="fw-bold mb-4 text-primary">Platform Overview</h2>
        <Row>
            <Col md={3} className="mb-4">
                <Card className="border-0 shadow-sm rounded-4 bg-primary text-white">
                    <Card.Body className="p-4">
                        <small className="opacity-75">Total Patients</small>
                        <h3 className="fw-bold mb-0">{stats?.totalPatients || 0}</h3>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3} className="mb-4">
                <Card className="border-0 shadow-sm rounded-4 bg-success text-white">
                    <Card.Body className="p-4">
                        <small className="opacity-75">Active Doctors</small>
                        <h3 className="fw-bold mb-0">{stats?.activeDoctors || 0}</h3>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3} className="mb-4">
                <Card className="border-0 shadow-sm rounded-4 bg-warning text-dark">
                    <Card.Body className="p-4">
                        <small className="opacity-75">Pending Reviews</small>
                        <h3 className="fw-bold mb-0">{stats?.pendingReviews || 0}</h3>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3} className="mb-4">
                <Card className="border-0 shadow-sm rounded-4 bg-info text-white">
                    <Card.Body className="p-4">
                        <small className="opacity-75">Appt. Today</small>
                        <h3 className="fw-bold mb-0">{stats?.appointmentsToday || 0}</h3>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
);

const AdminHome = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));

    const token = userData?.token;

    useEffect(() => {
        if (!token) return;

        const loadStats = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/admin/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data);
            } catch {
                console.error('Failed to fetch stats');
            }
        };

        void loadStats();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        message.success('Admin logged out');
        navigate('/');
    };

    const sidebarItems = [
        { id: 'dashboard', title: 'Dashboard', icon: <DashboardOutlined /> },
        { id: 'doctors', title: 'Manage Doctors', icon: <TeamOutlined /> },
        { id: 'appointments', title: 'Appointments', icon: <CalendarOutlined /> },
        { id: 'logout', title: 'Logout', icon: <LogoutOutlined />, onClick: handleLogout }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'appointments': return <AdminAppointment />;
            case 'doctors': return <ManageDoctors />;
            case 'dashboard':
            default: return <AdminStats stats={stats} />;
        }
    };

    return (
        <div className="admin-dashboard d-flex min-vh-100 bg-light">
            <div className="sidebar bg-dark text-white p-4" style={{ width: '280px' }}>
                <h2 className="fw-bold mb-5 fs-4 text-primary">AdminPanel</h2>
                <nav className="d-flex flex-column gap-2">
                    {sidebarItems.map(item => (
                        <div 
                            key={item.id}
                            className={`p-3 rounded-3 cursor-pointer d-flex align-items-center gap-3 transition-all ${activeTab === item.id ? 'bg-primary text-white fw-bold' : 'text-white-50 hover-bg-dark-light'}`}
                            onClick={item.onClick || (() => setActiveTab(item.id))}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.icon}
                            {item.title}
                        </div>
                    ))}
                </nav>
            </div>

            <div className="flex-grow-1 overflow-auto">
                <header className="bg-white p-3 shadow-sm d-flex justify-content-between align-items-center px-5 sticky-top">
                    <h3 className="h5 mb-0 fw-bold">{activeTab.toUpperCase()}</h3>
                    <div className="d-flex align-items-center gap-3">
                        <Badge bg="danger" className="p-2 px-3 rounded-pill">Admin Mode</Badge>
                        <div className="fw-bold text-dark">{userData?.name || 'Administrator'}</div>
                    </div>
                </header>

                <main className="">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminHome;
