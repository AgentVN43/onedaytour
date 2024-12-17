import { Button, message, Table } from "antd";
import { useNavigate } from "react-router-dom";

export default function OrderList() {
  const navigate = useNavigate(); // React Router navigation hook

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
      dataIndex: ["departing"],
      key: "departing",
    },
    {
      title: "Điểm đến",
      dataIndex: ["arriving"],
      key: "arriving",
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Báo giá",
      key: "quotation",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleQuotation(record.orderId)}>
          Tạo báo giá
        </Button>
      ),
    },
  ];
  const handleQuotation = (orderId) => {
    // Logic for handling quotation creation
    message.info(`Tạo báo giá cho đơn hàng: ${orderId}`);
    navigate(`/quote/${orderId}`);

    // You can open a modal or navigate to another page with the orderId here.
  };
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
