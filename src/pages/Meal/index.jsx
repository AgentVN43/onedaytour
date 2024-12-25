import { Button, Card, Table } from "antd";
import { useState } from "react";

export default function MealManagement() {
  const [mealData, setMealData] = useState([
    {
      id: 1,
      type: "3 Meals",
      included: ["Breakfast", "Lunch", "Dinner"],
    },
    {
      id: 2,
      type: "2 Meals (Breakfast & Lunch)",
      included: ["Breakfast", "Lunch"],
    },
    {
      id: 3,
      type: "2 Meals (Lunch & Dinner)",
      included: ["Lunch", "Dinner"],
    },
  ]);

  const columns = [
    {
      title: "Meal Package Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Included Meals",
      dataIndex: "included",
      key: "included",
      render: (included) => included.join(", "),
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
    <Card title="Meal Package Management">
      <Table columns={columns} dataSource={mealData} rowKey="id" />
    </Card>
  );
}
