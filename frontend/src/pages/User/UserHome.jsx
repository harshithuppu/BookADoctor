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
        <div className="user-dashboard d-flex min-vh-100" style={{ backgroundColor: '#FDF9F7' }}>
            {/* Sidebar */}
            <div className="sidebar text-white p-4" style={{ width: '280px', background: 'linear-gradient(180deg, #4E342E 0%, #6D4C41 100%)', boxShadow: '4px 0 20px rgba(109,76,65,0.22)' }}>
                <h2 className="fw-bold mb-5 fs-4" style={{ color: '#D7A96E', letterSpacing: '-0.3px' }}>BookADoctor</h2>
                <nav className="d-flex flex-column gap-3">
                    {menuItems.map(item => {
                        if (item.hideIfDoctor && userData?.isdoctor) return null;
                        const isActive = activeMenuItem === item.id;
                        return (
                            <div
                                key={item.id}
                                className="p-3 rounded-3 cursor-pointer d-flex align-items-center gap-3 transition-all"
                                onClick={item.onClick || (() => setActiveMenuItem(item.id))}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                                    color: isActive ? '#6D4C41' : 'rgba(255,255,255,0.72)',
                                    fontWeight: isActive ? '700' : '400',
                                    transition: 'all 0.25s ease',
                                }}
                                onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
                                onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
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
                <header className="p-3 shadow-sm d-flex justify-content-between align-items-center px-5" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #D7CCC8' }}>
                    <h3 className="h5 mb-0" style={{ color: '#8D6E63' }}>Dashboard / {activeMenuItem.toUpperCase()}</h3>
                    <div className="d-flex align-items-center gap-4">
                        <div
                            className="position-relative cursor-pointer"
                            onClick={() => setActiveMenuItem('notifications')}
                            style={{ cursor: 'pointer' }}
                        >
                            <BellOutlined style={{ fontSize: '20px', color: '#6D4C41' }} />
                            {(userData?.notifications?.length || 0) > 0 && (
                                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '10px' }}>
                                    {userData.notifications.length}
                                </Badge>
                            )}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <div className="text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '35px', height: '35px', backgroundColor: '#6D4C41' }}>
                                {userData?.name ? userData.name.charAt(0) : 'U'}
                            </div>
                            <span className="fw-bold" style={{ color: '#3E2723' }}>{userData?.name || 'User'}</span>
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
