import { useState, useEffect } from 'react';
import { Tabs, Button, Card, Empty } from 'antd';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';

const Notification = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || { notifications: [], seennotifications: [] });

    // Mock refreshing user data (or actual fetching if needed)
    useEffect(() => {
        // In a real app, you'd fetch the latest user object here
    }, []);

    const markAllRead = () => {
        const updatedUser = {
            ...userData,
            seennotifications: [...(userData.seennotifications || []), ...(userData.notifications || [])],
            notifications: []
        };
        setUserData(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        message.success('All marked as read');
    };

    const deleteAllRead = () => {
        const updatedUser = {
            ...userData,
            seennotifications: []
        };
        setUserData(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        message.success('Read notifications cleared');
    };

    const items = [
        {
            key: '1',
            label: `Unread (${userData.notifications?.length || 0})`,
            children: (
                <div className="p-4">
                    <div className="d-flex justify-content-end mb-4">
                        <Button type="primary" icon={<CheckCircleOutlined />} onClick={markAllRead} ghost>Mark all as read</Button>
                    </div>
                    {userData.notifications?.length > 0 ? (
                        userData.notifications.map((n, i) => (
                            <Card key={i} className="mb-2 shadow-sm border-0 border-start border-primary border-4 rounded-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>{n.message}</span>
                                    <small className="text-muted">Recent</small>
                                </div>
                            </Card>
                        ))
                    ) : <Empty description="No new notifications" />}
                </div>
            )
        },
        {
            key: '2',
            label: `Read (${userData.seennotifications?.length || 0})`,
            children: (
                <div className="p-4">
                    <div className="d-flex justify-content-end mb-4">
                        <Button danger icon={<DeleteOutlined />} onClick={deleteAllRead} ghost>Delete all read</Button>
                    </div>
                    {userData.seennotifications?.length > 0 ? (
                        userData.seennotifications.map((n, i) => (
                            <Card key={i} className="mb-2 shadow-sm border-0 bg-light rounded-3">
                                <span className="text-muted">{n.message}</span>
                            </Card>
                        ))
                    ) : <Empty description="No read notifications" />}
                </div>
            )
        }
    ];

    return (
        <div className="p-4 p-md-5 bg-white">
            <h2 className="fw-bold mb-4 text-primary">Notifications</h2>
            <Tabs defaultActiveKey="1" items={items} className="custom-tabs" />
        </div>
    );
};

export default Notification;
