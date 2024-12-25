import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";

export default function TransportationManagement() {
  const [transportationData, setTransportationData] = useState([
    {
      id: 1,
      type: "Tourist Car",
      variant: "29-seat car",
    },
    {
      id: 2,
      type: "Tourist Car",
      variant: "45-seat car",
    },
    {
      id: 3,
      type: "Airplane",
      variant: "Ticket-based",
    },
    {
      id: 4,
      type: "Train",
      variant: "Ticket-based",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTransportation, setCurrentTransportation] = useState(null);

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Variant",
      dataIndex: "variant",
      key: "variant",
    },
    {
      title: "Price per Km",
      dataIndex: "pricePerKm",
      key: "pricePerKm",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    setCurrentTransportation(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this transportation?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setTransportationData(
          transportationData.filter((item) => item.id !== record.id)
        );
      },
    });
  };

  const onFinish = (values) => {
    if (currentTransportation) {
      // Edit existing
      setTransportationData(
        transportationData.map((item) =>
          item.id === currentTransportation.id ? { ...item, ...values } : item
        )
      );
    } else {
      // Add new
      setTransportationData([
        ...transportationData,
        {
          id: transportationData.length + 1,
          ...values,
        },
      ]);
    }
    setIsModalVisible(false);
    setCurrentTransportation(null);
  };

  return (
    <Card title="Transportation Management">
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Transportation
      </Button>
      <Table columns={columns} dataSource={transportationData} rowKey="id" />
      <Modal
        title={
          currentTransportation ? "Edit Transportation" : "Add Transportation"
        }
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setCurrentTransportation(null);
        }}
        footer={null}
      >
        <Form onFinish={onFinish} initialValues={currentTransportation || {}}>
          <Form.Item
            name="type"
            label="Transportation Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Tourist Car">Tourist Car</Option>
              <Option value="Airplane">Airplane</Option>
              <Option value="Train">Train</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="variant"
            label="Variant"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="29-seat car">29-seat Car</Option>
              <Option value="45-seat car">45-seat Car</Option>
              <Option value="Ticket-based">Ticket-based</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="pricePerKm"
            label="Price per Km"
            rules={[{ required: true, type: "number" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentTransportation ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
