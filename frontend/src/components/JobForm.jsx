import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Rejected', 'Withdrawn'];

const JobForm = ({ onFinish, loading, initialValues, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        appliedDate: initialValues.appliedDate ? dayjs(initialValues.appliedDate) : dayjs(),
        followUpDate: initialValues.followUpDate ? dayjs(initialValues.followUpDate) : null,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ appliedDate: dayjs(), status: 'Applied' });
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    onFinish({
      ...values,
      appliedDate: values.appliedDate?.toISOString(),
      followUpDate: values.followUpDate?.toISOString() || null,
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Company is required' }]}
          >
            <Input placeholder="e.g. Google" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Position is required' }]}
          >
            <Input placeholder="e.g. Software Engineer" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="status" label="Status">
            <Select>
              {STATUS_OPTIONS.map((s) => (
                <Option key={s} value={s}>{s}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="location" label="Location">
            <Input placeholder="e.g. Remote, New York" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="appliedDate" label="Date Applied">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="followUpDate" label="Follow-up Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="salary" label="Salary Range">
            <Input placeholder="e.g. $80k - $100k" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="jobUrl" label="Job URL">
            <Input placeholder="https://..." />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="notes" label="Notes">
        <TextArea rows={3} placeholder="Any notes about this application..." />
      </Form.Item>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? 'Update' : 'Add Application'}
        </Button>
      </div>
    </Form>
  );
};

export default JobForm;
