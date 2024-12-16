import { Button, DatePicker, Form, Input, message, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { provincesService } from "../../../services/provincesService";
import { vehicleTypeService } from "../../../services/vehicleTypeService";
import { generateTourId } from "../../../utils/generateTourId";
import VehicleOption from "../../vehicleOption";
import dayjs from "dayjs";

const { Option } = Select;

const OrderForm = ({ info }) => {
  console.log("🚀 ~ OrderForm ~ info:", info)
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [orders, setOrders] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  console.log("🚀 ~ OrderForm ~ selectedVehicle:", selectedVehicle)

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
      selectedVehicle,
      getProvinceCode,
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
        departureDate: values.date ? values.date[0].format("YYYY-MM-DD") : "",
        returnDate: values.date ? values.date[1].format("YYYY-MM-DD") : "",
        passengers: values.passengers
      },
      quotes: null,
      orderStatus: "Pending Quote Selection",
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("order", JSON.stringify(newOrder));
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    message.success("Đơn hàng đã được thêm!");
    form.resetFields();
  };

  return (
    <div className="max-w-full mx-auto p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">
        {info ? <span>Thông Tin Đơn Hàng</span> : <span>Nhập Thông Tin Đơn Hàng</span>}
      </h2>

      {!info &&
        <div className="flex justify-center my-10 gap-20">
          {
            vehicleType.map((item) => (
              <div key={item._id}
                onClick={() => {
                  localStorage.setItem(
                    "selectedOption",
                    JSON.stringify({
                      code: item.code ? item.code : null,
                      id: item._id ? item._id : null,
                    })
                  );

                  setSelectedVehicle(item.code)
                }}
                className={`${selectedVehicle === item.code ? 'bg-slate-800 border border-black' : 'bg-slate-100'} rounded-2xl`}
              >
                <VehicleOption item={item} />
              </div>
            ))
          }
        </div>
      }
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddOrder}
        autoComplete="off"
        initialValues={{
          customerName: info?.customer.name,
          email: info?.customer.email,
          phone: info?.customer.phone,
          zalo: info?.customer.zalo,
          departing: info?.customer.departing,
          arriving: info?.customer.arriving,
          date: [
            info?.customer.departureDate
              ? dayjs(info.customer.departureDate, "YYYY-MM-DD")
              : null,
            info?.customer.returnDate
              ? dayjs(info.customer.returnDate, "YYYY-MM-DD")
              : null,
          ],
          passengers: {
            adults: info?.customer.passengers?.adults,
            childrenUnder12: info?.customer.passengers?.childrenUnder12,
            childrenUnder2: info?.customer.passengers?.childrenUnder2,
          },
          specialRequirements: info?.customer.specialRequirements,
        }}
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
        <Form.Item
          label="Ngày đi - Ngày về"
          name="date"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
        >
          <RangePicker
            placeholder={['Nhập ngày bắt đầu', 'Nhập ngày kết thúc']}
            className="w-full"
          />
        </Form.Item>
        <div>
          <p className='text-start'>Sô lượng hành khách</p>
          <div className='grid grid-cols-3 gap-5'>
            <Form.Item
              label="Người lớn (12 tuổi trở lên)"
              name={["passengers", "adults"]}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số lượng hợp lệ!',
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Vui lòng nhập số lượng!'));
                    }
                    if (isNaN(value) || value <= 0) {
                      return Promise.reject(new Error('Số lượng phải là số dương!'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder='Nhập số lượng' type="number" step="1" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Trẻ em (dưới 12 tuổi)"
              name={["passengers", "childrenUnder12"]}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số lượng hợp lệ!',
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Vui lòng nhập số lượng!'));
                    }
                    if (isNaN(value) || value <= 0) {
                      return Promise.reject(new Error('Số lượng phải là số dương!'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder='Nhập số lượng' type="number" step="1" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Trẻ nhỏ (dưới 5 tuổi)"
              name={["passengers", "childrenUnder2"]}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số lượng hợp lệ!',
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Vui lòng nhập số lượng!'));
                    }
                    if (isNaN(value) || value <= 0) {
                      return Promise.reject(new Error('Số lượng phải là số dương!'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder='Nhập số lượng' type="number" step="1" className="w-full" />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          label="Lưu ý"
          name="specialRequirements"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {info ? <span>Xác nhận thông tin</span> : <span>Lưu thông tin</span>}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderForm;
