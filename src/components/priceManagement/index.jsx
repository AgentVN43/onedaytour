import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  DatePicker,
  Select,
  Input,
  message,
} from "antd";
import moment from "moment";
import Cart from "./cart";
const { RangePicker } = DatePicker;

const baseServices = [
  {
    "Dịch vụ": "Hướng dẫn viên xe 30 trở lên",
    "Đơn giá": 600000,
  },
  {
    "Dịch vụ": "Hướng dẫn viên xe dưới 30",
    "Đơn giá": 550000,
  },
  {
    "Dịch vụ": "Hướng dẫn viên đưa đón",
    "Đơn giá": 500000,
  },
  {
    "Dịch vụ": "Khăn",
    "Đơn giá": 500,
  },
  {
    "Dịch vụ": "Nón",
    "Đơn giá": 15000,
  },
];

export default function PriceManagement() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [priceVersions, setPriceVersions] = useState([]);
  const [currentPrices, setCurrentPrices] = useState(baseServices);

  const updateCurrentPrices = () => {
    const now = moment();
    const activePriceVersion = priceVersions.find(
      (version) =>
        moment(version.startDate).isSameOrBefore(now) &&
        (!version.endDate || moment(version.endDate).isAfter(now))
    );

    if (activePriceVersion) {
      const updatedPrices = [...baseServices];
      activePriceVersion.services.forEach((service) => {
        const index = updatedPrices.findIndex(
          (s) => s["Dịch vụ"] === service["Dịch vụ"]
        );
        if (index !== -1) {
          updatedPrices[index]["Đơn giá"] = service["Đơn giá"];
        }
      });
      setCurrentPrices(updatedPrices);
    } else {
      setCurrentPrices(baseServices);
    }
  };

  useEffect(() => {
    updateCurrentPrices();
  }, [priceVersions]);

  const columns = [
    {
      title: "Dịch vụ",
      dataIndex: "Dịch vụ",
      key: "Dịch vụ",
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "Đơn giá",
      key: "Đơn giá",
      render: (price) => price.toLocaleString(),
    },
  ];

  const priceVersionColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => (date ? moment(date).format("DD/MM/YYYY") : "Không có"),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        const now = moment();
        const isActive =
          moment(record.startDate).isSameOrBefore(now) &&
          (!record.endDate || moment(record.endDate).isAfter(now));
        return (
          <span style={{ color: isActive ? "green" : "red" }}>
            {isActive ? "Đang áp dụng" : "Không áp dụng"}
          </span>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewPriceVersion(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const handleViewPriceVersion = (record) => {
    Modal.info({
      title: "Chi tiết bản giá",
      content: (
        <Table
          columns={columns}
          dataSource={record.services}
          pagination={false}
        />
      ),
      width: 800,
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    const { id, name, dateRange, services } = values;

    const newPriceVersion = {
      id,
      name,
      startDate: dateRange[0].toDate(),
      endDate: dateRange[1]?.toDate() || null,
      services: baseServices.map((service) => ({
        "Dịch vụ": service["Dịch vụ"],
        "Đơn giá": services[service["Dịch vụ"]] || service["Đơn giá"],
      })),
    };

    setPriceVersions([...priceVersions, newPriceVersion]);
    message.success("Thêm bản giá mới thành công");
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <div style={{ padding: 24 }}>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2>Bảng giá hiện tại</h2>
          <Button type="primary" onClick={showModal}>
            Thêm bản giá mới
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={currentPrices}
          pagination={false}
          style={{ marginBottom: 32 }}
        />

        <h2>Lịch sử bản giá</h2>
        <Table columns={priceVersionColumns} dataSource={priceVersions} />

        <Modal
          title="Thêm bản giá mới"
          open={isModalVisible}
          onCancel={handleCancel}
          onOk={form.submit}
          width={800}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="id"
              label="ID"
              rules={[{ required: true, message: "Vui lòng nhập ID" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="name"
              label="Tên"
              rules={[{ required: true, message: "Vui lòng nhập tên" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="dateRange"
              label="Thời gian áp dụng"
              rules={[
                { required: true, message: "Vui lòng chọn thời gian áp dụng" },
              ]}
            >
              <DatePicker.RangePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Form.Item>

            <h3>Cập nhật giá dịch vụ</h3>
            <Form.Item name="services">
              {baseServices.map((service) => (
                <Form.Item
                  key={service["Dịch vụ"]}
                  label={service["Dịch vụ"]}
                  name={["services", service["Dịch vụ"]]}
                >
                  <Input
                    type="number"
                    placeholder={`Giá mặc định: ${service[
                      "Đơn giá"
                    ].toLocaleString()} VNĐ`}
                  />
                </Form.Item>
              ))}
            </Form.Item>
          </Form>
        </Modal>

        <Cart currentPrices={currentPrices} priceVersions={priceVersions} />
      </div>
    </>
  );
}
