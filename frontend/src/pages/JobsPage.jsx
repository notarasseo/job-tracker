import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  Space,
  Modal,
  Popconfirm,
  message,
  Typography,
  Row,
  Col,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { jobService } from '../services/api';
import JobForm from '../components/JobForm';

const { Title } = Typography;
const { Option } = Select;

const STATUS_COLORS = {
  Applied: 'blue',
  Interview: 'gold',
  Offer: 'green',
  Rejected: 'red',
  Withdrawn: 'default',
};

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const { data } = await jobService.getAll(params);
      setJobs(data);
    } catch {
      message.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleAdd = async (values) => {
    setFormLoading(true);
    try {
      await jobService.create(values);
      message.success('Application added!');
      setModalOpen(false);
      fetchJobs();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to add');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = async (values) => {
    setFormLoading(true);
    try {
      await jobService.update(editingJob._id, values);
      message.success('Application updated!');
      setModalOpen(false);
      setEditingJob(null);
      fetchJobs();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await jobService.delete(id);
      message.success('Application deleted');
      fetchJobs();
    } catch {
      message.error('Failed to delete');
    }
  };

  const openEdit = (job) => {
    setEditingJob(job);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingJob(null);
    setModalOpen(true);
  };

  const columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (text, record) => (
        <Space>
          <strong>{text}</strong>
          {record.jobUrl && (
            <Tooltip title="Open job link">
              <a href={record.jobUrl} target="_blank" rel="noreferrer">
                <LinkOutlined />
              </a>
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={STATUS_COLORS[status]}>{status}</Tag>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (v) => v || '—',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (v) => v || '—',
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: (v) => (v ? dayjs(v).format('MMM D, YYYY') : '—'),
      sorter: (a, b) => new Date(a.appliedDate) - new Date(b.appliedDate),
    },
    {
      title: 'Follow-up',
      dataIndex: 'followUpDate',
      key: 'followUpDate',
      render: (v) => {
        if (!v) return '—';
        const date = dayjs(v);
        const isPast = date.isBefore(dayjs());
        return <span style={{ color: isPast ? '#ef4444' : 'inherit' }}>{date.format('MMM D, YYYY')}</span>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEdit(record)}
          />
          <Popconfirm
            title="Delete this application?"
            onConfirm={() => handleDelete(record._id)}
            okText="Delete"
            okType="danger"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>Applications</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
          Add Application
        </Button>
      </div>

      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={14}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={10}>
          <Select
            style={{ width: '100%' }}
            placeholder="Filter by status"
            value={statusFilter || undefined}
            onChange={(v) => setStatusFilter(v || '')}
            allowClear
          >
            {['Applied', 'Interview', 'Offer', 'Rejected', 'Withdrawn'].map((s) => (
              <Option key={s} value={s}>{s}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Table
        dataSource={jobs}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={{ x: 900 }}
      />

      <Modal
        title={editingJob ? 'Edit Application' : 'Add Application'}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setEditingJob(null); }}
        footer={null}
        width={700}
        destroyOnClose
      >
        <JobForm
          onFinish={editingJob ? handleEdit : handleAdd}
          loading={formLoading}
          initialValues={editingJob}
          onCancel={() => { setModalOpen(false); setEditingJob(null); }}
        />
      </Modal>
    </div>
  );
};

export default JobsPage;
