import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";

export default function AccommodationManagement() {
  const [accommodationData, setAccommodationData] = useState([
    {
      id: 1,
      type: "3-star Hotel",
      roomType: "Single Bedroom (SGL)",
      maxOccupancy: 1,
    },
    {
      id: 2,
      type: "3-star Hotel",
      roomType: "Twin Bedroom (TWN)",
      maxOccupancy: 2,
    },
    {
      id: 3,
      type: "3-star Hotel",
      roomType: "Double Bedroom (DBL)",
      maxOccupancy: 2,
    },
    {
      id: 4,
      type: "3-star Hotel",
      roomType: "Triple Bedroom (TRPL)",
      maxOccupancy: 3,
    },
    {
      id: 5,
      type: "Resort",
      roomType: "Single Bedroom (SGL)",
      maxOccupancy: 1,
    },
    // Add more resort room types similarly
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAccommodation, setCurrentAccommodation] = useState(null);

  const columns = [
    {
      title: "Accommodation Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "roomType",
    },
    {
      title: "Max Occupancy",
      dataIndex: "maxOccupancy",
      key: "maxOccupancy",
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
    setCurrentAccommodation(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this accommodation?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setAccommodationData(
          accommodationData.filter((item) => item.id !== record.id)
        );
      },
    });
  };

  const onFinish = (values) => {
    if (currentAccommodation) {
      // Edit existing
      setAccommodationData(
        accommodationData.map((item) =>
          item.id === currentAccommodation.id ? { ...item, ...values } : item
        )
      );
    } else {
      // Add new
      setAccommodationData([
        ...accommodationData,
        {
          id: accommodationData.length + 1,
          ...values,
        },
      ]);
    }
    setIsModalVisible(false);
    setCurrentAccommodation(null);
  };

  return (
    <Card title="Accommodation Management">
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Accommodation
      </Button>
      <Table columns={columns} dataSource={accommodationData} rowKey="id" />
      <Modal
        title={
          currentAccommodation ? "Edit Accommodation" : "Add Accommodation"
        }
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setCurrentAccommodation(null);
        }}
        footer={null}
      >
        <Form onFinish={onFinish} initialValues={currentAccommodation || {}}>
          <Form.Item
            name="type"
            label="Accommodation Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="3-star Hotel">3-star Hotel</Option>
              <Option value="Resort">Resort</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="roomType"
            label="Room Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Single Bedroom (SGL)">Single Bedroom (SGL)</Option>
              <Option value="Twin Bedroom (TWN)">Twin Bedroom (TWN)</Option>
              <Option value="Double Bedroom (DBL)">Double Bedroom (DBL)</Option>
              <Option value="Triple Bedroom (TRPL)">
                Triple Bedroom (TRPL)
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="maxOccupancy"
            label="Max Occupancy"
            rules={[{ required: true, type: "number" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentAccommodation ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
