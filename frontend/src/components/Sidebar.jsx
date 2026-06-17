import { CarryOutOutlined, UserOutlined, PlusSquareOutlined, LogoutOutlined } from '@ant-design/icons';

const Sidebar = ({ activeMenuItem, setActiveMenuItem, handleLogout, isDoctor }) => {
    const menuItems = [
        { id: 'home', title: 'Home', icon: <CarryOutOutlined /> },
        { id: 'appointments', title: 'Appointments', icon: <UserOutlined /> },
        { id: 'applyDoctor', title: 'Apply Doctor', icon: <PlusSquareOutlined />, hideIfDoctor: isDoctor },
        { id: 'logout', title: 'Logout', icon: <LogoutOutlined />, onClick: handleLogout }
    ];

    return (
        <div className="sidebar bg-primary text-white p-4" style={{ width: '280px', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
            <h2 className="fw-bold mb-5 fs-4">BookADoctor</h2>
            <nav className="d-flex flex-column gap-3">
                {menuItems.map(item => {
                    if (item.hideIfDoctor) return null;
                    return (
                        <div 
                            key={item.id}
                            className={`p-3 rounded-3 cursor-pointer d-flex align-items-center gap-3 transition-all ${activeMenuItem === item.id ? 'bg-white text-primary fw-bold' : 'text-white-50 hover-overlay'}`}
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
    );
};

export default Sidebar;
