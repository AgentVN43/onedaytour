import { Button, DatePicker, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { orderService } from "../../../services/orderService";
import { provincesService } from "../../../services/provincesService";
import { vehicleTypeService } from "../../../services/vehicleTypeService";
import { generateTourId } from "../../../utils/generateTourId";
import VehicleOption from "../../vehicleOption";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const OrderForm = ({ info }) => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [orders, setOrders] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const nav = useNavigate()
  const GetAllProvince = async () => {
    try {
      const res = await provincesService.getAll();
      if (res && res.data) {
        setProvinces(res.data);
      }
    } catch (error) {
      console.error("Error creating vehicle:", error);
      alert("Failed to create vehicle.");
    }
  };

  const GetAllVehicleType = async (e) => {
    try {
      const res = await vehicleTypeService.getAll();
      if (res && res.data) {
        setVehicleType(res.data);
      }
    } catch (error) {
      console.error("Error creating vehicle:", error);
      alert("Failed to create vehicle.");
    }
  };

  useEffect(() => {
    GetAllProvince();
    GetAllVehicleType();
  }, []);

  const getProvinceCode = (name) => {
    const province = provinces.find((p) => p.name === name);
    return province ? province.code : "";
  };

  const handleAddOrder = async (values) => {
    const generatedId = await generateTourId(
      values.departing,
      values.arriving,
      selectedVehicle.code,
      getProvinceCode
    );
    const newOrder = {
      orderId: generatedId,
      customer: {
        name: values.customerName,
        phone: values.phone,
        email: values.email,
        zalo: values.zalo,
      },
      departing: values.departing,
      arriving: values.arriving,
      description: values.description,
      vehicleId: selectedVehicle._id,
    };
    await orderService.create(newOrder);
    message.success("Đơn hàng đã được thêm!");
    nav("/quotes")
    form.resetFields();
  };

  return (
    <div className="max-w-full mx-auto p-5 pb-1 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">
        <span>Thông Tin Đơn Hàng</span>
      </h2>
      <div className="flex justify-center my-2 gap-8">
        {vehicleType.map((item) => (
          <div
            key={item._id}
            onClick={() => {
              setSelectedVehicle(item);
            }}
            className={`${
              selectedVehicle?.code === item.code
                ? "bg-slate-800 border border-black"
                : "bg-slate-100"
            } rounded-2xl`}
          >
            <VehicleOption item={item} />
          </div>
        ))}
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddOrder}
        autoComplete="off"
      >
        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label="Tên khách hàng"
            name="customerName"
            rules={[
              { required: true, message: "Vui lòng nhập tên khách hàng!" },
            ]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Zalo"
            name="zalo"
            rules={[{ required: true, message: "Vui lòng nhập số Zalo!" }]}
          >
            <Input placeholder="Nhập số Zalo" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label="Điểm khởi hành"
            name="departing"
            rules={[
              { required: true, message: "Vui lòng chọn điểm khởi hành!" },
            ]}
          >
            <Select placeholder="Chọn điểm khởi hành">
              {provinces.map((province) => (
                <Option key={province.code} value={province.name}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Điểm đến"
            name="arriving"
            rules={[{ required: true, message: "Vui lòng chọn điểm đến!" }]}
          >
            <Select placeholder="Chọn điểm đến">
              {provinces.map((province) => (
                <Option key={province.code} value={province.name}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item label="Lưu ý" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Tạo đơn hàng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderForm;
