import { Table } from "antd";

export default function OrderList() {


  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Tên khách hàng",
      dataIndex: ["customer", "name"],
      key: "customerName",
    },
    {
      title: "Email",
      dataIndex: ["customer", "email"],
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["customer", "phone"],
      key: "phone",
    },
    {
      title: "Zalo",
      dataIndex: ["customer", "zalo"],
      key: "zalo",
    },
    {
      title: "Khởi hành",
      dataIndex: ["customer", "departing"],
      key: "departing",
    },
    {
      title: "Điểm đến",
      dataIndex: ["customer", "arriving"],
      key: "arriving",
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
  ];

  const orders = JSON.parse(localStorage.getItem("orders")) || [];


  return (
    <>
      <h2 className="text-2xl font-bold mt-10 mb-4">Danh Sách Đơn Hàng</h2>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="orderId"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
