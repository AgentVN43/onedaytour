import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  InputNumber,
  Card,
  Row,
  Col,
  Modal,
  Form,
  DatePicker,
  Select,
  message,
} from "antd";
import moment from "moment";

const { Option } = Select;

const Cart = ({ currentPrices, priceVersions }) => {
  const [cart, setCart] = useState([]);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [checkoutForm] = Form.useForm();
  const [selectedPriceVersion, setSelectedPriceVersion] = useState(null);

  console.log(priceVersions)

  // Tính tổng tiền
  const total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  // Columns cho bảng dịch vụ có sẵn
  const serviceColumns = [
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
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleAddToCart(record)}>
          Thêm vào giỏ
        </Button>
      ),
    },
  ];

  // Columns cho giỏ hàng
  const cartColumns = [
    {
      title: "Dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString(),
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleUpdateQuantity(record.serviceName, value)}
        />
      ),
    },
    {
      title: "Thành tiền (VNĐ)",
      key: "total",
      render: (_, record) => (record.price * record.quantity).toLocaleString(),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleRemoveFromCart(record.serviceName)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  // Thêm vào giỏ hàng
  const handleAddToCart = (service) => {
    const existingItem = cart.find(
      (item) => item.serviceName === service["Dịch vụ"]
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.serviceName === service["Dịch vụ"]
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          serviceName: service["Dịch vụ"],
          price: service["Đơn giá"],
          quantity: 1,
        },
      ]);
    }
    message.success("Đã thêm vào giỏ hàng");
  };

  // Cập nhật số lượng
  const handleUpdateQuantity = (serviceName, quantity) => {
    if (quantity <= 0) return;
    setCart(
      cart.map((item) =>
        item.serviceName === serviceName ? { ...item, quantity } : item
      )
    );
  };

  // Xóa khỏi giỏ hàng
  const handleRemoveFromCart = (serviceName) => {
    setCart(cart.filter((item) => item.serviceName !== serviceName));
    message.success("Đã xóa khỏi giỏ hàng");
  };

  // Xử lý thanh toán
  const handleCheckout = (values) => {
    const { useDate, priceVersion } = values;

    // Tìm bản giá được chọn
    const selectedPriceVersion = priceVersions.find(
      (version) => version.id === priceVersion
    );

    if (selectedPriceVersion) {
      // Cập nhật giá trong giỏ hàng theo bản giá được chọn
      const updatedCart = cart.map((item) => {
        const servicePrice = selectedPriceVersion.services.find(
          (s) => s["Dịch vụ"] === item.serviceName
        );
        if (!servicePrice) {
          // Nếu không tìm thấy giá dịch vụ, giữ nguyên giá cũ
          console.warn(`Không tìm thấy giá cho dịch vụ: ${item.serviceName}`);
          return item;
        }
        return {
          ...item,
          price: servicePrice["Đơn giá"],
        };
      });
      setCart(updatedCart);
      setSelectedPriceVersion(selectedPriceVersion);
      message.info("Giá đã được cập nhật theo bản giá được chọn");
    } else {
      message.error("Vui lòng chọn bản giá áp dụng");
      return;
    }

    // Xử lý đặt hàng
    console.log("Đơn hàng:", {
      cart: cart,
      useDate: useDate,
      priceVersion: selectedPriceVersion,
      total: total,
    });

    message.success("Đặt hàng thành công!");
    setIsCheckoutModalVisible(false);
    setCart([]);
    setSelectedPriceVersion(null);
    checkoutForm.resetFields();
  };

  const handlePriceVersionChange = (priceVersionId) => {
    const selectedPriceVersion = priceVersions.find(
      (version) => version.id === priceVersionId
    );
  
    if (selectedPriceVersion) {
      const updatedCart = cart.map((item) => {
        const servicePrice = selectedPriceVersion.services.find(
          (s) => s["Dịch vụ"] === item.serviceName
        );
        if (servicePrice) {
          return {
            ...item,
            price: servicePrice["Đơn giá"],
          };
        }
        return item;
      });
      setCart(updatedCart);
    }
  };


  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Danh sách dịch vụ">
            <Table
              columns={serviceColumns}
              dataSource={currentPrices}
              pagination={false}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card
            title="Giỏ hàng"
            extra={
              cart.length > 0 && (
                <Button
                  type="primary"
                  onClick={() => setIsCheckoutModalVisible(true)}
                >
                  Thanh toán
                </Button>
              )
            }
          >
            <Table
              columns={cartColumns}
              dataSource={cart}
              pagination={false}
              summary={() => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={3} index={0}>
                      <strong>Tổng cộng:</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <strong>{total.toLocaleString()} VNĐ</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} />
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Thanh toán"
        open={isCheckoutModalVisible}
        onCancel={() => setIsCheckoutModalVisible(false)}
        footer={null}
      >
        <Form form={checkoutForm} layout="vertical" onFinish={handleCheckout}>
          <Form.Item
            name="useDate"
            label="Ngày sử dụng dịch vụ"
            rules={[
              { required: true, message: "Vui lòng chọn ngày sử dụng dịch vụ" },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            name="priceVersion"
            label="Bản giá áp dụng"
            rules={[
              { required: true, message: "Vui lòng chọn bản giá áp dụng" },
            ]}
          >
            <Select onChange={handlePriceVersionChange}>
              <Option key="default" value="">
                Chọn bản giá
              </Option>
              {priceVersions.map((version) => (
                <Option key={version.id} value={version.id}>
                  {version.name} (
                  {moment(version.startDate).format("DD/MM/YYYY")} -{" "}
                  {version.endDate
                    ? moment(version.endDate).format("DD/MM/YYYY")
                    : "Chưa có"}
                  )
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div style={{ marginBottom: 16 }}>
            <strong>Tổng tiền: {total.toLocaleString()} VNĐ</strong>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Xác nhận đặt hàng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Cart;
