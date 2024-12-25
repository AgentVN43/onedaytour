import { Button, Card, Table } from "antd";
import { useState } from "react";

export default function GuideServiceManagement() {
  const [guideData, setGuideData] = useState([
    {
      id: 1,
      language: "Vietnamese",
      type: "Local Tour Guide",
    },
    {
      id: 2,
      language: "English",
      type: "Foreign Language Tour Guide",
    },
    {
      id: 3,
      language: "Chinese",
      type: "Foreign Language Tour Guide",
    },
  ]);

  const columns = [
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Guide Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card title="Guide Services Management">
      <Table columns={columns} dataSource={guideData} rowKey="id" />
    </Card>
  );
}
