import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Table, message, Radio } from "antd";
import { provincesService } from "../../../services/provincesService";
import { vehicleTypeService } from "../../../services/vehicleTypeService";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const OrderForm = () => {
  const [form] = Form.useForm();
  const [orders, setOrders] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

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

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
    console.log("Selected Vehicle:", e.target.value);
  };

  const generateTourId = (departure, destination, vehicleType) => {
    const depCode = getProvinceCode(departure);
    const destCode = getProvinceCode(destination);

    const timestamp = Date.now().toString().slice(-5);
    const randomNum = Math.floor(100 + Math.random() * 900);
    const uniqueOrder = `${timestamp}${randomNum}`;

    vehicleType = localStorage.getItem("selectedOption");

    const parsedItem = JSON.parse(vehicleType);
    const code = parsedItem.code; // Access the "code" field

    return `${depCode}${destCode}-${uniqueOrder}-${randomNum}${code}`;
  };

  const handleAddOrder = (values) => {
    const generatedId = generateTourId(
      values.departing,
      values.arriving,
      selectedVehicle.code
    );
    const newOrder = {
      orderId: generatedId,
      customer: {
        name: values.customerName,
        phone: values.phone,
        email: values.email,
        zalo: values.zalo,
        departing: values.departing,
        arriving: values.arriving,
      },
      quotes: null,
      orderStatus: "Pending Quote Selection",
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    message.success("Đơn hàng đã được thêm!");
    form.resetFields();
  };

 
  return (
    <div className="max-w-full mx-auto p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Nhập Thông Tin Đơn Hàng</h2>

      <div className="flex justify-center mt-20">
        <Radio.Group
          onChange={handleVehicleChange}
          value={selectedVehicle}
          className="space-y-4"
        >
          {vehicleType.map((item) => (
            <Radio key={item._id} value={item._id} className="block">
              <div
                onClick={() => {
                  localStorage.setItem(
                    "selectedOption",
                    JSON.stringify({
                      code: item.code ? item.code : null,
                      id: item._id ? item._id : null,
                    })
                  );
                }}
                className="card"
              >
                {item.type}
              </div>
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddOrder}
        autoComplete="off"
      >
        <Form.Item label="Mã đơn hàng" name="orderId">
          <Input placeholder="Nhập mã đơn hàng" />
        </Form.Item>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Thêm Đơn Hàng
          </Button>
        </Form.Item>
      </Form>

    
    </div>
  );
};

export default OrderForm;
