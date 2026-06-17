import { useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BellOutlined, HomeOutlined, CarryOutOutlined, PlusSquareOutlined, LogoutOutlined } from '@ant-design/icons';
import { message } from 'antd';
import axios from 'axios';
import BASE_URL from '../../config';

import UserAppointments from './UserAppointments';
import ApplyDoctor from './ApplyDoctor';
import NotificationsView from '../Notification';
import DoctorList from './DoctorList';

const UserHome = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
    const [activeMenuItem, setActiveMenuItem] = useState('home');
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorage = () => {
            setUserData(JSON.parse(localStorage.getItem('userData')));
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    useEffect(() => {
        if (!userData?.token) return;
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/user/profile`, {
                    headers: { Authorization: `Bearer ${userData.token}` }
                });
                if (res.data.role !== userData.role) {
                    const updatedUser = {
                        ...userData,
                        role: res.data.role,
                        isdoctor: res.data.role === 'doctor'
                    };
                    localStorage.setItem('userData', JSON.stringify(updatedUser));
                    message.info('Your account role has been updated. Redirecting...');
                    if (res.data.role === 'doctor') {
                        navigate('/doctorhome');
                    } else if (res.data.role === 'admin') {
                        navigate('/adminhome');
                    }
                }
            } catch (err) {
                console.error("Profile check failed", err);
            }
        };
        fetchProfile();
    }, [userData?.token, userData?.role, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        message.success('Logged out successfully');
        navigate('/');
    };

    const menuItems = [
        { id: 'home', title: 'Home', icon: <HomeOutlined /> },
        { id: 'appointments', title: 'Appointments', icon: <CarryOutOutlined /> },
        { id: 'applyDoctor', title: 'Apply Doctor', icon: <PlusSquareOutlined />, hideIfDoctor: true },
        { id: 'logout', title: 'Logout', icon: <LogoutOutlined />, onClick: handleLogout }
    ];

    const renderContent = () => {
        switch (activeMenuItem) {
            case 'appointments': return <UserAppointments />;
            case 'applyDoctor': return <ApplyDoctor />;
            case 'notifications': return <NotificationsView />;
            case 'home':
            default: return <DoctorList />;
        }
    };

    return (
        <div className="user-dashboard d-flex min-vh-100 bg-light">
            {/* Sidebar */}
            <div className="sidebar bg-primary text-white p-4" style={{ width: '280px' }}>
                <h2 className="fw-bold mb-5 fs-4">BookADoctor</h2>
                <nav className="d-flex flex-column gap-3">
                    {menuItems.map(item => {
                        if (item.hideIfDoctor && userData?.isdoctor) return null;
                        return (
                            <div 
                                key={item.id}
                                className={`p-3 rounded-3 cursor-pointer d-flex align-items-center gap-3 transition-all ${activeMenuItem === item.id ? 'bg-white text-primary fw-bold' : 'hover-overlay text-white-50'}`}
                                onClick={item.onClick || (() => setActiveMenuItem(item.id))}
                                style={{ cursor: 'pointer' }}
                            >
                                {item.icon}
                                {item.title}
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* Main Section */}
            <div className="flex-grow-1">
                {/* Header */}
                <header className="bg-white p-3 shadow-sm d-flex justify-content-between align-items-center px-5">
                    <h3 className="h5 mb-0 text-muted">Dashboard / {activeMenuItem.toUpperCase()}</h3>
                    <div className="d-flex align-items-center gap-4">
                        <div 
                            className="position-relative cursor-pointer" 
                            onClick={() => setActiveMenuItem('notifications')}
                            style={{ cursor: 'pointer' }}
                        >
                            <BellOutlined style={{ fontSize: '20px' }} />
                            {(userData?.notifications?.length || 0) > 0 && (
                                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '10px' }}>
                                    {userData.notifications.length}
                                </Badge>
                            )}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                                {userData?.name ? userData.name.charAt(0) : 'U'}
                            </div>
                            <span className="fw-bold text-dark">{userData?.name || 'User'}</span>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="p-4 p-md-5">
                    <div className="bg-white rounded-4 shadow-sm min-vh-75 animate__animated animate__fadeIn">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserHome;
