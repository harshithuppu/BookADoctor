import { CarryOutOutlined, UserOutlined, PlusSquareOutlined, LogoutOutlined } from '@ant-design/icons';

const Sidebar = ({ activeMenuItem, setActiveMenuItem, handleLogout, isDoctor }) => {
    const menuItems = [
        { id: 'home', title: 'Home', icon: <CarryOutOutlined /> },
        { id: 'appointments', title: 'Appointments', icon: <UserOutlined /> },
        { id: 'applyDoctor', title: 'Apply Doctor', icon: <PlusSquareOutlined />, hideIfDoctor: isDoctor },
        { id: 'logout', title: 'Logout', icon: <LogoutOutlined />, onClick: handleLogout }
    ];

    return (
        <div className="sidebar text-white p-4" style={{ width: '280px', height: '100vh', position: 'fixed', left: 0, top: 0, background: 'linear-gradient(180deg, #4E342E 0%, #6D4C41 100%)', boxShadow: '4px 0 20px rgba(109,76,65,0.22)' }}>
            <h2 className="fw-bold mb-5 fs-4" style={{ color: '#D7A96E', letterSpacing: '-0.3px' }}>BookADoctor</h2>
            <nav className="d-flex flex-column gap-3">
                {menuItems.map(item => {
                    if (item.hideIfDoctor) return null;
                    const isActive = activeMenuItem === item.id;
                    return (
                        <div
                            key={item.id}
                            className="p-3 rounded-3 cursor-pointer d-flex align-items-center gap-3 transition-all"
                            onClick={item.onClick || (() => setActiveMenuItem(item.id))}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                                color: isActive ? '#6D4C41' : 'rgba(255,255,255,0.7)',
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
    );
};

export default Sidebar;
