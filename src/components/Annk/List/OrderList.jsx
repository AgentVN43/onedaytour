import { Button, Form, message, Modal, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { orderService } from "../../../services/orderService";
import { useEffect, useState } from "react";
import InfoTour from "../Form/InfoTour";
import { CarOutlined } from "@ant-design/icons";

export default function OrderList() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate(); // React Router navigation hook


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // Form instance
  const [selectedOrderId, setSelectedOrderId] = useState(null);


  const getOneOrder = async (orderId) => {
    const res = await orderService.getById(orderId)
    if (res && res.data) {
      localStorage.setItem('orderInfo', JSON.stringify(res.data))
    }
  }

  const getAllOrders = async () => {
    try {
      const res = await orderService.getAll();
      if (res && res.data) {
        setOrders(res.data);
      }
    } catch (error) {
      console.error("Error creating vehicle:", error);
      alert("Failed to create vehicle.");
    }
  }
  // Modal Handlers
  const showModal = (orderId) => {
    setIsModalOpen(true);
    setSelectedOrderId(orderId)
  };

  const handleOk = (orderId) => {
    form.validateFields()
      .then((values) => {
        console.log("Form Values:", values); // Handle form submission
        localStorage.setItem('tourInfo', JSON.stringify(values))
        handleQuotation(orderId)
        getOneOrder(orderId)
        setIsModalOpen(false);
        form.resetFields(); // Reset form after submission
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
        <>
          <Button type="primary" onClick={() => showModal(record.orderId)}>
            Tạo báo giá
          </Button>
          <Modal
            open={isModalOpen}
            onOk={() => handleOk(selectedOrderId)}
            onCancel={handleCancel}
            okText="Submit"
            cancelText="Cancel"
            width={'50%'}
          >
            <div className="relative -mx-6 -my-5">
              <InfoTour form={form} />
            </div>
          </Modal>
        </>


      ),
    },
  ];
  const handleQuotation = (orderId) => {
    // Logic for handling quotation creation
    message.info(`Tạo báo giá cho đơn hàng: ${orderId}`);
    navigate(`/quote/${orderId}`);
  };

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Danh Sách Đơn Hàng</h2>
        <Button onClick={() => navigate('/add-order')}>
          <CarOutlined /> Tạo đơn hàng
        </Button>
      </div>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="orderId"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
