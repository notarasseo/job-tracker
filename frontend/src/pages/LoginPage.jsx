import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await authService.login(values);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      message.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff9a3c 0%, #ff6000 60%, #e63e00 100%)',
        padding: 24,
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: 'fixed', top: -80, left: -80,
        width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: -100, right: -60,
        width: 400, height: 400, borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        pointerEvents: 'none',
      }} />

      <div
        style={{
          width: 420,
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 20,
          padding: '48px 40px 36px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
        }}
      >
        {/* Logo area */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 60, height: 60,
            background: 'linear-gradient(135deg, #ff9a3c, #e63e00)',
            borderRadius: 16,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            boxShadow: '0 8px 20px rgba(230,62,0,0.35)',
          }}>
            <span style={{ fontSize: 28 }}>💼</span>
          </div>
          <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontWeight: 700 }}>
            JobTracker
          </Title>
          <Text style={{ color: '#888', fontSize: 14 }}>
            Sign in to your account
          </Text>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#ff6000' }} />}
              placeholder="Email address"
              style={{ borderRadius: 10, height: 48 }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#ff6000' }} />}
              placeholder="Password"
              style={{ borderRadius: 10, height: 48 }}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 8 }}>
            <Button
              htmlType="submit"
              loading={loading}
              block
              style={{
                height: 50,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #ff9a3c, #e63e00)',
                border: 'none',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                boxShadow: '0 6px 20px rgba(230,62,0,0.4)',
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <Text style={{ color: '#888' }}>Don't have an account? </Text>
          <Link to="/register" style={{ color: '#ff6000', fontWeight: 600 }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
