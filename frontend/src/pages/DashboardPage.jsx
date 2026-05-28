import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Spin, Button } from 'antd';
import {
  FileTextOutlined,
  CalendarOutlined,
  TrophyOutlined,
  CloseCircleOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const statCards = [
  { key: 'total', label: 'Total Applications', icon: <FileTextOutlined />, color: '#4f46e5' },
  { key: 'Applied', label: 'Applied', icon: <RocketOutlined />, color: '#3b82f6' },
  { key: 'Interview', label: 'Interviews', icon: <CalendarOutlined />, color: '#f59e0b' },
  { key: 'Offer', label: 'Offers', icon: <TrophyOutlined />, color: '#10b981' },
  { key: 'Rejected', label: 'Rejected', icon: <CloseCircleOutlined />, color: '#ef4444' },
];

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    jobService
      .getStats()
      .then(({ data }) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin size="large" style={{ display: 'block', marginTop: 80 }} />;

  const successRate =
    stats?.total > 0 ? Math.round((stats.Offer / stats.total) * 100) : 0;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Welcome back, {user?.name}
        </Title>
        <Text type="secondary">Here's your job search overview</Text>
      </div>

      <Row gutter={[16, 16]}>
        {statCards.map(({ key, label, icon, color }) => (
          <Col xs={24} sm={12} lg={key === 'total' ? 24 : 6} key={key}>
            <Card
              hoverable
              style={{
                borderTop: `3px solid ${color}`,
                borderRadius: 8,
              }}
            >
              <Statistic
                title={label}
                value={stats?.[key] ?? 0}
                prefix={React.cloneElement(icon, { style: { color } })}
                valueStyle={{ color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12}>
          <Card title="Success Rate">
            <Statistic
              value={successRate}
              suffix="%"
              valueStyle={{ color: successRate > 0 ? '#10b981' : '#6b7280' }}
            />
            <Text type="secondary">Offers received out of total applications</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card title="Quick Actions">
            <Button
              type="primary"
              block
              size="large"
              onClick={() => navigate('/jobs')}
              style={{ marginBottom: 12 }}
            >
              View All Applications
            </Button>
            <Button block size="large" onClick={() => navigate('/jobs?add=true')}>
              + Add New Application
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
