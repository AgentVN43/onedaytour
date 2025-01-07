import { Button, Form, message, Modal, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoTour from "../Form/InfoTour";
import { CarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchOrderById } from "../../../Redux/Action/actOrder";

export default function OrderList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // Form instance
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data from Redux store
  const orders = useSelector((state) => state.order.orders);
  // Fetch all orders on component mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const showModal = (orderId) => {
    setIsModalOpen(true);
    setSelectedOrderId(orderId);
    dispatch(fetchOrderById(orderId));
  };

  const handleOk = (orderId) => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values); // Handle form submission
        localStorage.setItem("tourInfo", JSON.stringify(values));
        message.info(`Tạo báo giá cho đơn hàng: ${orderId}`);
        navigate(`/quote/${orderId}`);
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset fields when modal is closed
  };

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
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click
            showModal(record.orderId);
          }}
        >
          Tạo báo giá
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Danh Sách Đơn Hàng</h2>
        <Button onClick={() => navigate("/add-order")}>
          <CarOutlined /> Tạo đơn hàng
        </Button>
      </div>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="orderId"
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => navigate(`/quote/detail/${record.orderId}`),
        })}
      />
      <Modal
        open={isModalOpen}
        onOk={() => handleOk(selectedOrderId)}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        width={"50%"}
      >
        <div className="relative -mx-6 -my-5">
          <InfoTour form={form} />
        </div>
      </Modal>
    </>
  );
}
