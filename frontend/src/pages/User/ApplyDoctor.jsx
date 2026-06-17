import { useState } from 'react';
import { Form, Input, InputNumber, TimePicker, Button, Divider, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, ExperimentOutlined, WalletOutlined } from '@ant-design/icons';
import axios from 'axios';
import { message } from 'antd';
import BASE_URL from '../../config';

const ApplyDoctor = () => {
    const [loading, setLoading] = useState(false);
    const userData = JSON.parse(localStorage.getItem('userData'));

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const payload = {
                ...values,
                timings: [
                    values.timings[0].format('HH:mm'),
                    values.timings[1].format('HH:mm')
                ]
            };
            const res = await axios.post(`${BASE_URL}/api/doctors`, payload, {
                headers: { Authorization: `Bearer ${userData.token}` }
            });
            if (res.status === 201) {
                message.success('Doctor application submitted successfully!');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Application Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 p-md-5 bg-white">
            <h2 className="fw-bold mb-4 text-primary">Apply as a Doctor</h2>
            <p className="text-muted mb-5">Please fill in your professional details to join our medical network and start helping patients.</p>
            
            <Form layout="vertical" onFinish={onFinish}>
                <Row gutter={20}>
                    <Col md={12}><Divider orientation="left">Personal Details</Divider></Col>
                    <Col md={6}>
                        <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                            <Input prefix={<UserOutlined />} placeholder="Dr. John Doe" />
                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item name="email" label="Professional Email" rules={[{ required: true, type: 'email' }]}>
                            <Input prefix={<MailOutlined />} placeholder="john@hospital.com" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20} className="mt-4">
                    <Col md={12}><Divider orientation="left">Professional Details</Divider></Col>
                    <Col md={4}>
                        <Form.Item name="specialization" label="Specialization" rules={[{ required: true }]}>
                            <Input prefix={<ExperimentOutlined />} placeholder="e.g. Cardiology" />
                        </Form.Item>
                    </Col>
                    <Col md={4}>
                        <Form.Item name="experience" label="Experience (Years)" rules={[{ required: true }]}>
                            <InputNumber min={0} className="w-100" />
                        </Form.Item>
                    </Col>
                    <Col md={4}>
                        <Form.Item name="fees" label="Consultation Fees" rules={[{ required: true }]}>
                            <InputNumber min={0} prefix={<WalletOutlined />} className="w-100" />
                        </Form.Item>
                    </Col>
                    <Col md={6}>
                        <Form.Item name="timings" label="Working Hours" rules={[{ required: true }]}>
                            <TimePicker.RangePicker format="HH:mm" className="w-100" />
                        </Form.Item>
                    </Col>
                </Row>

                <Button type="primary" htmlType="submit" size="lg" loading={loading} className="mt-5 px-5 py-2 h-auto fw-bold shadow-sm">
                    Submit Application
                </Button>
            </Form>
        </div>
    );
};

export default ApplyDoctor;
