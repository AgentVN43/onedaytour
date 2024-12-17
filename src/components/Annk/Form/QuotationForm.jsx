import { useParams } from "react-router-dom";
import TourPage from "../../../pages/TourPage";
import OrderForm from "./OrderForm";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

export default function QuotationForm() {
  return (
    <div>
      <div className="mb-20 pt-4 max-w-7xl px-4 mx-auto">
        <h1 className="text-2xl font-bold mb-20">Tạo Báo Giá</h1>
        <TourPage />
      </div>
    </div>
  );
}
