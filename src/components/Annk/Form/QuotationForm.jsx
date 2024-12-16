import { useParams } from "react-router-dom";
import TourPage from "../../../pages/TourPage";
import OrderForm from "./OrderForm";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

export default function QuotationForm() {
  const { orderId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex justify-between mb-20 pt-4 max-w-7xl px-4 mx-auto">
        <h1 className="text-2xl font-bold">Tạo Báo Giá</h1>
        <Button type="" onClick={showModal}>
          <EditOutlined />
        </Button>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width='50%' footer={null} >
        <div className="relative -mx-6 -my-5">
          <OrderForm info={JSON.parse(localStorage.getItem('orders')).find((order) => order.orderId === orderId)} />

          <p className="absolute top-12 left-5">{`( ${orderId} )`}</p>
        </div>
      </Modal>
      <TourPage />
    </div>
  );
}
